
angular.module('buyer.comp', ['buyer.api', 'common.srv']).
    component('buyer', {
        templateUrl: '/app/components/buyer/buyer.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'buyerApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, buyerApi, commonService) {
                var self = this;
                self.buyerModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentBuyerModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.onRemoves = function (buyer) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            var selectedBuyers = [];
                            angular.forEach(self.buyerModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedBuyers.push(itm.Id);
                                }
                            });

                            if (selectedBuyers.length == 0) {
                                commonService.showWarningMessage('Chưa chọn buyer cần xóa');
                                return;
                            }

                            //remove
                            buyerApi.delete(selectedBuyers).then(function (response) {
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
                    angular.forEach(self.buyerModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentBuyerModel = {};
                }

                this.onEdit = function (buyer) {
                    self.currentBuyerModel = buyer;
                }

                this.onSaveBuyerModel = function () {

                    if (
                        self.currentBuyerModel.Code == undefined ||
                        self.currentBuyerModel.Code == '' || self.currentBuyerModel.Name == undefined ||
                        self.currentBuyerModel.Name == '' || self.currentBuyerModel.Address == undefined ||
                        self.currentBuyerModel.Address == '' || self.currentBuyerModel.Phone == undefined ||
                        self.currentBuyerModel.Phone == ''
                    ) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    //save buyer
                    var onSave = undefined;
                    if (self.currentBuyerModel.Id == undefined || self.currentBuyerModel.Id == 0)
                        onSave = buyerApi.add;
                    else
                        onSave = buyerApi.update;

                    onSave(self.currentBuyerModel).then(function (response) {
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

                this.onRemove = function (buyer) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            buyerApi.delete([buyer.Id]).then(function (response) {
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
                    buyerApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.buyerModels = response.data.list;
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
                    console.log(self.filter);
                }

                this.onLoad();
            }
        ]
    });