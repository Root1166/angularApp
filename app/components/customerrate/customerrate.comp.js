
angular.module('customerrate.comp', ['customerrate.api', 'common.srv']).
    component('customerrate', {
        templateUrl: '/app/components/customerrate/customerrate.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'customerrateApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, customerrateApi, commonService) {
                var self = this;
                self.customerrateModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentCustomerRateModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.onRemoves = function (customerrate) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            var selectedCustomerRates = [];
                            angular.forEach(self.customerrateModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedCustomerRates.push(itm.Id);
                                }
                            });

                            if (selectedCustomerRates.length == 0) {
                                commonService.showWarningMessage('Chưa chọn customerrate cần xóa');
                                return;
                            }

                            //remove
                            customerrateApi.delete(selectedCustomerRates).then(function (response) {
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
                    angular.forEach(self.customerrateModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentCustomerRateModel = {};
                }

                this.onEdit = function (customerrate) {
                    self.currentCustomerRateModel = customerrate;
                }

                this.onSaveCustomerRateModel = function () {

                    if (
                        self.currentCustomerRateModel.Name == undefined ||
                        self.currentCustomerRateModel.Name == '' 
                    ) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    //save customerrate
                    var onSave = undefined;
                    if (self.currentCustomerRateModel.Id == undefined || self.currentCustomerRateModel.Id == 0)
                        onSave = customerrateApi.add;
                    else
                        onSave = customerrateApi.update;

                    onSave(self.currentCustomerRateModel).then(function (response) {
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

                this.onRemove = function (customerrate) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            customerrateApi.delete([customerrate.Id]).then(function (response) {
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
                    customerrateApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.customerrateModels = response.data;
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