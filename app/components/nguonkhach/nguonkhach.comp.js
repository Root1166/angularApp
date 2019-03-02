
angular.module('nguonkhach.comp', ['nguonkhach.api', 'common.srv']).
    component('nguonkhach', {
        templateUrl: '/app/components/nguonkhach/nguonkhach.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'nguonkhachApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, nguonkhachApi, commonService) {
                var self = this;
                self.nguonkhachModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentNguonKhachModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.onRemoves = function (nguonkhach) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            var selectedNguonKhachs = [];
                            angular.forEach(self.nguonkhachModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedNguonKhachs.push(itm.NguonKhachId);
                                }
                            });

                            if (selectedNguonKhachs.length == 0) {
                                commonService.showWarningMessage('Chưa chọn nguonkhach cần xóa');
                                return;
                            }

                            //remove
                            nguonkhachApi.delete(selectedNguonKhachs).then(function (response) {
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
                    angular.forEach(self.nguonkhachModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentNguonKhachModel = {};
                }

                this.onEdit = function (nguonkhach) {
                    self.currentNguonKhachModel = nguonkhach;
                }

                this.onSaveNguonKhachModel = function () {

                    if (
                        self.currentNguonKhachModel.TenNguon == undefined ||
                        self.currentNguonKhachModel.TenNguon == '' 
                    ) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    //save nguonkhach
                    var onSave = undefined;
                    if (self.currentNguonKhachModel.NguonKhachId == undefined || self.currentNguonKhachModel.NguonKhachId == 0)
                        onSave = nguonkhachApi.add;
                    else
                        onSave = nguonkhachApi.update;

                    onSave(self.currentNguonKhachModel).then(function (response) {
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

                this.onRemove = function (nguonkhach) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            nguonkhachApi.delete([nguonkhach.NguonKhachId]).then(function (response) {
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
                    nguonkhachApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.nguonkhachModels = response.data.list;
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