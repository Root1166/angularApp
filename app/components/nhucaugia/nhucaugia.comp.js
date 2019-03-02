
angular.module('nhucaugia.comp', ['nhucaugia.api', 'common.srv']).
    component('nhucaugia', {
        templateUrl: '/app/components/nhucaugia/nhucaugia.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'nhucaugiaApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, nhucaugiaApi, commonService) {
                var self = this;
                self.nhucaugiaModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentNhucaugiaModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.onRemoves = function (nhucaugia) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            var selectedNhucaugias = [];
                            angular.forEach(self.nhucaugiaModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedNhucaugias.push(itm.NhucauId);
                                }
                            });

                            if (selectedNhucaugias.length == 0) {
                                commonService.showWarningMessage('Chưa chọn nhucaugia cần xóa');
                                return;
                            }

                            //remove
                            nhucaugiaApi.delete(selectedNhucaugias).then(function (response) {
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
                    angular.forEach(self.nhucaugiaModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentNhucaugiaModel = {};
                }

                this.onEdit = function (nhucaugia) {
                    self.currentNhucaugiaModel = nhucaugia;
                }

                this.onSaveNhucaugiaModel = function () {

                    if (
                        self.currentNhucaugiaModel.TenNhucau == undefined ||
                        self.currentNhucaugiaModel.TenNhucau == ''
                    ) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    //save nhucaugia
                    var onSave = undefined;
                    if (self.currentNhucaugiaModel.NhucauId == undefined || self.currentNhucaugiaModel.NhucauId == 0)
                        onSave = nhucaugiaApi.add;
                    else
                        onSave = nhucaugiaApi.update;

                    onSave(self.currentNhucaugiaModel).then(function (response) {
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

                this.onRemove = function (nhucaugia) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            nhucaugiaApi.delete([nhucaugia.NhucauId]).then(function (response) {
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
                    nhucaugiaApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.nhucaugiaModels = response.data.list;
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