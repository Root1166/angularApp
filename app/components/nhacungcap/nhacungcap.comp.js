
angular.module('nhacungcap.comp', ['nhacungcap.api', 'common.srv']).
    component('nhacungcap', {
        templateUrl: '/app/components/nhacungcap/nhacungcap.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'nhacungcapApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, nhacungcapApi, commonService) {
                var self = this;
                self.nhacungcapModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentNhacungcapModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.onRemoves = function (nhacungcap) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            var selectedNhacungcaps = [];
                            angular.forEach(self.nhacungcapModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedNhacungcaps.push(itm.Id);
                                }
                            });

                            if (selectedNhacungcaps.length == 0) {
                                commonService.showWarningMessage('Chưa chọn nhacungcap cần xóa');
                                return;
                            }

                            //remove
                            nhacungcapApi.delete(selectedNhacungcaps).then(function (response) {
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
                    angular.forEach(self.nhacungcapModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentNhacungcapModel = {};
                }

                this.onEdit = function (nhacungcap) {
                    self.currentNhacungcapModel = nhacungcap;
                }

                this.onSaveNhacungcapModel = function () {

                    if (
                        self.currentNhacungcapModel.TenNhacungcap == undefined ||
                        self.currentNhacungcapModel.TenNhacungcap == ''
                    ) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    //save nhacungcap
                    var onSave = undefined;
                    if (self.currentNhacungcapModel.Id == undefined || self.currentNhacungcapModel.Id == 0)
                        onSave = nhacungcapApi.add;
                    else
                        onSave = nhacungcapApi.update;

                    onSave(self.currentNhacungcapModel).then(function (response) {
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

                this.onRemove = function (nhacungcap) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            nhacungcapApi.delete([nhacungcap.Id]).then(function (response) {
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
                    nhacungcapApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.nhacungcapModels = response.data.list;
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