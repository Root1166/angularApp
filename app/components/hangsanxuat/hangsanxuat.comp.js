
angular.module('hangsanxuat.comp', ['hangsanxuat.api', 'common.srv']).
    component('hangsanxuat', {
        templateUrl: '/app/components/hangsanxuat/hangsanxuat.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'hangsanxuatApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, hangsanxuatApi, commonService) {
                var self = this;
                self.hangsanxuatModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentHangsanxuatModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.onRemoves = function (hangsanxuat) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            var selectedHangsanxuats = [];
                            angular.forEach(self.hangsanxuatModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedHangsanxuats.push(itm.Id);
                                }
                            });

                            if (selectedHangsanxuats.length == 0) {
                                commonService.showWarningMessage('Chưa chọn hangsanxuat cần xóa');
                                return;
                            }

                            //remove
                            hangsanxuatApi.delete(selectedHangsanxuats).then(function (response) {
                                var response = response.data;
                                if (response.result) {
                                    self.filter.Paging.CurrentPage = 1;
                                    self.filter.Paging.PageSize = self.pageSize;
                                    self.onList(self.filter);

                                    //show message
                                    commonService.showSuccessMessage('Xóa thành công');
                                }
                                else {
                                    commonService.showWarningMessage(response.message);
                                }
                            }, function (error) {
                                commonService.handlError(error.data);
                            });
                        }//if confirm
                    });//confirm sweet                    
                }

                this.toggleAll = function () {
                    var toggleStatus = self.isAllSelected;
                    angular.forEach(self.hangsanxuatModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentHangsanxuatModel = {};
                }

                this.onEdit = function (hangsanxuat) {
                    self.currentHangsanxuatModel = hangsanxuat;
                }

                this.onSaveHangsanxuatModel = function () {

                    if (
                        self.currentHangsanxuatModel.TenHangsanxuat == undefined ||
                        self.currentHangsanxuatModel.TenHangsanxuat == ''
                    ) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    //save hangsanxuat
                    var onSave = undefined;
                    if (self.currentHangsanxuatModel.Id == undefined || self.currentHangsanxuatModel.Id == 0)
                        onSave = hangsanxuatApi.add;
                    else
                        onSave = hangsanxuatApi.update;

                    onSave(self.currentHangsanxuatModel).then(function (response) {
                        var response = response.data;
                        if (response.result) {
                            self.filter.Paging.CurrentPage = 1;
                            self.filter.Paging.PageSize = self.pageSize;
                            self.onList(self.filter);

                            $scope.dismiss();

                            //show message
                            commonService.showSuccessMessage('Cập nhật thành công!');
                        }
                        else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onRemove = function (hangsanxuat) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            hangsanxuatApi.delete([hangsanxuat.Id]).then(function (response) {
                                var response = response.data;
                                if (response.result) {
                                    self.filter.Paging.CurrentPage = 1;
                                    self.filter.Paging.PageSize = self.pageSize;
                                    self.onList(self.filter);

                                    //show message
                                    commonService.showSuccessMessage('Xóa thành công!');
                                }
                                else {
                                    commonService.showWarningMessage(response.message);
                                }
                            }, function (error) {
                                commonService.handlError(error.data);
                            });
                        }
                    });//sweet confirm                    
                }

                this.onPageChanged = function (pageIndex) {
                    self.filter.Paging.CurrentPage = pageIndex;
                    self.filter.Paging.PageSize = self.pageSize;
                    self.onList(self.filter);
                }

                this.onSearch = function ($event) {
                    if ($event.charCode == 13) {
                        self.filter.Search = self.search;
                        self.filter.Paging.CurrentPage = 1;
                        self.filter.Paging.PageSize = self.pageSize;
                        self.onList(self.filter);
                    }
                }

                this.onList = function (filter) {
                    hangsanxuatApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.hangsanxuatModels = response.data.list;
                            self.totalRowCount = response.data.pager.RowsCount;
                        }
                        else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }//onList

                this.onLoad = function () {
                    //first load data from list
                    self.onList(self.filter);
                }

                this.onLoad();
            }
        ]
    });