
angular.module('phongban.comp', ['phongban.api', 'common.srv']).
    component('phongban', {
        templateUrl: '/app/components/phongban/phongban.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'phongbanApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, phongbanApi, commonService) {
                var self = this;
                self.phongbanModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentPhongbanModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.onRemoves = function (phongban) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            var selectedPhongbans = [];
                            angular.forEach(self.phongbanModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedPhongbans.push(itm.PhongbanId);
                                }
                            });

                            if (selectedPhongbans.length == 0) {
                                commonService.showWarningMessage('Chưa chọn phongban cần xóa');
                                return;
                            }

                            //remove
                            phongbanApi.delete(selectedPhongbans).then(function (response) {
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
                    angular.forEach(self.phongbanModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentPhongbanModel = {};
                }

                this.onEdit = function (phongban) {
                    self.currentPhongbanModel = phongban;
                }

                this.onSavePhongbanModel = function () {

                    if (
                      self.currentPhongbanModel.TenPhongban == undefined ||
                        self.currentPhongbanModel.TenPhongban == ''
                    ) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    //save phongban
                    var onSave = undefined;
                    if (self.currentPhongbanModel.Id == undefined || self.currentPhongbanModel.Id == 0)
                        onSave = phongbanApi.add;
                    else
                        onSave = phongbanApi.update;

                    onSave(self.currentPhongbanModel).then(function (response) {
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

                this.onRemove = function (phongban) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            phongbanApi.delete([phongban.PhongbanId]).then(function (response) {
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
                    phongbanApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.phongbanModels = response.data.list;
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