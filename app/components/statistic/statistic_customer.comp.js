angular.module('statistic-customer.comp', ['common.srv']).
component('statisticCustomer', {
    templateUrl: '/app/components/statistic/statistic_customer.tpl.html',
    controller: ['$routeParams', '$scope', '$rootScope', '$location', 'commonService', 'userApi', 'loaikhachhangApi', 'nguonkhachApi', 'loaikhachhangApi', 'thanhphoApi', 'quanhuyenApi', 'nhucaugiaApi', 'productApi', 'khachhangApi', 'baocaoApi',
        function($routeParams, $scope, $rootScope, $location, commonService, userApi, loaikhachhangApi, nguonkhachApi, loaikhachhangApi, thanhphoApi, quanhuyenApi, nhucaugiaApi, productApi, khachhangApi, baocaoApi) {
            var self = this;
            self.statisticCustomerModels = [];
            self.currentPage = 1;
            self.pageSize = '50';
            self.filter = {
                CityId: undefined,
                DistrictId: undefined,
                NhucaugiaId: undefined,
                LoaiKhachhangId: undefined,
                NguonKhachId: undefined,
                SanphamQuantamId: undefined,
                Start: undefined,
                End: new Date(),
                Paging: {
                    PageSize: self.pageSize,
                    CurrentPage: self.currentPage
                }
            };
            this.filterByDate = function(arg1) {
                if (arg1 != undefined) {
                    self.filter.Start = arg1.start;
                    self.filter.End = arg1.end;
                    self.onLoad();
                }
            }
            this.onLoad = function() {
                baocaoApi.reportCustomer(self.filter).then(function(response) {
                    var response = response.data;
                    if (response.result) {
                        self.statisticCustomerModels = response.data;
                    } else {
                        commonService.showWarningMessage(response.message);
                    }
                }, function(error) {
                    commonService.handlError(error.data);
                });
            }

            this.onLoad();
            this.searchThanhpho = function(searchText) {
                var filter = {
                    "Search": searchText,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage
                    }
                };
                return thanhphoApi.list(filter).then(function(response) {
                    return response.data.data.list
                });

            }
            this.onSelectThanhpho = function(item) {
                console.log(item);
                if (typeof item == 'object')
                    self.filter.CityId = item.Id;
                else {
                    self.filter.CityId = undefined;
                }
                self.onLoad()
            }
            this.searchSanphamquantam = function(searchText) {
                var filter = {
                    "Search": searchText,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };
                return productApi.listSanpham(filter).then(function(response) {
                    console.log(response);
                    return response.data.data.list
                });

            }
            this.onSelectSanphamquantam = function(item) {
                console.log(item);
                if (typeof item == 'object') {
                    self.filter.SanphamQuantamId = item.SanphamId;
                } else {
                    self.filter.SanphamQuantamId = undefined;
                }
                self.onLoad();
            }
            this.searchQuanhuyen = function(searchText) {
                var filter = {
                    "Search": searchText,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage
                    }
                };
                return quanhuyenApi.list(filter).then(function(response) {
                    return response.data.data.list
                });

            }
            this.onSelectQuanhuyen = function(item) {
                console.log(item);
                if (typeof item == 'object')
                    self.filter.DistrictId = item.Id;
                else {
                    self.filter.DistrictId = undefined;
                }
                self.onLoad()
            }
            this.searchNhucaugia = function(searchText) {
                var filter = {
                    "Search": searchText,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage
                    }
                };
                return nhucaugiaApi.list(filter).then(function(response) {
                    return response.data.data.list
                });

            }
            this.onSelectNhucaugia = function(item) {
                console.log(item);
                if (typeof item == 'object')
                    self.filter.NhucaugiaId = item.NhucauId;
                else {
                    self.filter.NhucaugiaId = undefined;
                }
                self.onLoad()
            }
            this.searchLoaikhach = function(searchText) {
                var filter = {
                    "Search": searchText,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage
                    }
                };
                return loaikhachhangApi.list(filter).then(function(response) {
                    return response.data.data.list
                });

            }
            this.onSelectLoaikhach = function(item) {
                console.log(item);
                if (typeof item == 'object')
                    self.filter.LoaiKhachhangId = item.LoaiKhachhangId;
                else {
                    self.filter.LoaiKhachhangId = undefined;
                }
                self.onLoad()
            }
            this.searchNguonkhach = function(searchText) {
                var filter = {
                    "Search": searchText,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage
                    }
                };
                return nguonkhachApi.list(filter).then(function(response) {
                    return response.data.data.list
                });

            }
            this.onSelectNguonkhach = function(item) {
                console.log(item);
                if (typeof item == 'object')
                    self.filter.NguonKhachId = item.NguonKhachId;
                else {
                    self.filter.NguonKhachId = undefined;
                }
                self.onLoad()
            }
        }
    ]
});
