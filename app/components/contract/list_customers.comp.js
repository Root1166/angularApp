
angular.module('list-customers.comp', ['customer.api', 'city.api', 'customerrate.api', 'common.srv']).
    component('listCustomers', {
        templateUrl: '/app/components/contract/list_customers.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'customerApi', 'cityApi', 'customerrateApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location,customerApi,cityApi,customerrateApi, commonService) {
                var self = this;
                self.customerModels = [];
                self.cityModels = [];
                self.customerrateModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentProviderModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };
                this.onRemoves = function (customer) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            var selectedCustomer = [];
                            angular.forEach(self.customerModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedCustomer.push(itm.Id);
                                }
                            });

                            if (selectedCustomer.length == 0) {
                                commonService.showWarningMessage('Chưa chọn khách hàng cần xóa');
                                return;
                            }

                            //remove
                            customerApi.delete(selectedCustomer).then(function (response) {
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

                //this.customerModels = [{
                //    MaKH: "ABC123123",
                //    TenKH: "Công ty cổ phần ABC",
                //    Diachi: "Khu công nghiệp Tiên Sơn",
                //    Khuvuc: "Hà Nội",
                //    Xephang: "KH Vàng",
                //    NVKhaithac: "Nguyễn Văn A",
                //    NVCSKH: "Trần thị B",
                //    Ngaytao: "3/4/2013"
                //}, {
                //    MaKH: "ABC123123",
                //    TenKH: "Công ty cổ phần ABC",
                //    Diachi: "Khu công nghiệp Tiên Sơn",
                //    Khuvuc: "Hà Nội",
                //    Xephang: "KH Vàng",
                //    NVKhaithac: "Nguyễn Văn A",
                //    NVCSKH: "Trần thị B",
                //    Ngaytao: "3/4/2013"
                //    }, {
                //        MaKH: "ABC123123",
                //        TenKH: "Công ty cổ phần ABC",
                //        Diachi: "Khu công nghiệp Tiên Sơn",
                //        Khuvuc: "Hà Nội",
                //        Xephang: "KH Vàng",
                //        NVKhaithac: "Nguyễn Văn A",
                //        NVCSKH: "Trần thị B",
                //        Ngaytao: "3/4/2013"
                //}, {
                //    MaKH: "ABC123123",
                //    TenKH: "Công ty cổ phần ABC",
                //    Diachi: "Khu công nghiệp Tiên Sơn",
                //    Khuvuc: "Hà Nội",
                //    Xephang: "KH Vàng",
                //    NVKhaithac: "Nguyễn Văn A",
                //    NVCSKH: "Trần thị B",
                //    Ngaytao: "3/4/2013"
                //    }, {
                //        MaKH: "ABC123123",
                //        TenKH: "Công ty cổ phần ABC",
                //        Diachi: "Khu công nghiệp Tiên Sơn",
                //        Khuvuc: "Hà Nội",
                //        Xephang: "KH Vàng",
                //        NVKhaithac: "Nguyễn Văn A",
                //        NVCSKH: "Trần thị B",
                //        Ngaytao: "3/4/2013"
                //}, {
                //    MaKH: "ABC123123",
                //    TenKH: "Công ty cổ phần ABC",
                //    Diachi: "Khu công nghiệp Tiên Sơn",
                //    Khuvuc: "Hà Nội",
                //    Xephang: "KH Vàng",
                //    NVKhaithac: "Nguyễn Văn A",
                //    NVCSKH: "Trần thị B",
                //    Ngaytao: "3/4/2013"
                //}];

                this.toggleAll = function () {
                    var toggleStatus = self.isAllSelected;
                    angular.forEach(self.customerModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentProviderModel = {};
                }

                this.onEdit = function (customer) {
                    self.currentProviderModel = customer;
                }

                this.onSaveProviderModel = function () {

                    if (
                        self.currentProviderModel.Code == undefined ||
                        self.currentProviderModel.Code == '' || self.currentProviderModel.Name == undefined ||
                        self.currentProviderModel.Name == '' || self.currentProviderModel.Address == undefined ||
                        self.currentProviderModel.Address == '' || self.currentProviderModel.Phone == undefined ||
                        self.currentProviderModel.Phone == ''
                    ) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    //save buyer
                    var onSave = undefined;
                    if (self.currentProviderModel.Id == undefined || self.currentProviderModel.Id == 0)
                        onSave = customerApi.add;
                    else
                        onSave = customerApi.update;

                    onSave(self.currentProviderModel).then(function (response) {
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

                this.onRemove = function (customer) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            customerApi.delete([customer.Id]).then(function (response) {
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
                    customerApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.customerModels = response.data.list;
                            self.totalRowCount = response.data.pager.RowsCount;
                        }
                        else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                    //city
                    cityApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.cityModels = response.data.list;
                            self.totalRowCount = response.data.pager.RowsCount;
                        }
                        else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                    //customer rate
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