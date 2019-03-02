
angular.module('nhomsanpham.comp', ['nhomsanpham.api', 'common.srv']).
    component('nhomsanpham', {
        templateUrl: '/app/components/nhomsanpham/nhomsanpham.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'nhomsanphamApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, nhomsanphamApi, commonService) {
                var self = this;
                self.nhomsanphamModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentNhomsanphamModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.onRemoves = function (nhomsanpham) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            var selectedNhomsanphams = [];
                            angular.forEach(self.nhomsanphamModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedNhomsanphams.push(itm.Id);
                                }
                            });

                            if (selectedNhomsanphams.length == 0) {
                                commonService.showWarningMessage('Chưa chọn nhomsanpham cần xóa');
                                return;
                            }

                            //remove
                            nhomsanphamApi.delete(selectedNhomsanphams).then(function (response) {
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
                    angular.forEach(self.nhomsanphamModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentNhomsanphamModel = {};
                }

                this.onEdit = function (nhomsanpham) {
                    self.currentNhomsanphamModel = nhomsanpham;
                }

                this.onSaveNhomsanphamModel = function () {

                    if (
                        self.currentNhomsanphamModel.TenNhomsanpham == undefined ||
                        self.currentNhomsanphamModel.TenNhomsanpham == ''
                    ) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    //save nhomsanpham
                    var onSave = undefined;
                    if (self.currentNhomsanphamModel.Id == undefined || self.currentNhomsanphamModel.Id == 0)
                        onSave = nhomsanphamApi.add;
                    else
                        onSave = nhomsanphamApi.update;

                    onSave(self.currentNhomsanphamModel).then(function (response) {
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

                this.onRemove = function (nhomsanpham) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            nhomsanphamApi.delete([nhomsanpham.Id]).then(function (response) {
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
                    nhomsanphamApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.nhomsanphamModels = response.data.list;
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