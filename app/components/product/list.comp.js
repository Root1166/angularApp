
angular.module('product-list.comp', ['product.api', 'common.srv']).
component('productList', {
    templateUrl: '/app/components/product/list.tpl.html',
    controller: ['$routeParams', '$scope', 'productApi', '$rootScope', '$location', 'commonService', 'nhomsanphamApi', 'userApi','uploaderApi',
        function($routeParams, $scope, productApi, $rootScope, $location, commonService, nhomsanphamApi, userApi,uploaderApi) {
            var self = this;
            self.currentPage = 1;
            self.pageSize = '50';
            self.totalRowCount = 0;
            self.currentsanphamModel = {};
            self.filter = {
                "Search": undefined,
                "Paging": {
                    "PageSize": self.pageSize,
                    "CurrentPage": self.currentPage,
                }
            };
            this.onFileUploaded = function (response) {
                var res = response;
                if (res.result) {
                    console.log(res,'res');
                    productApi.product_import(res.data).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            commonService.showSuccessMessage(rs.message);
                            self.onList(self.filter);
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    })
                } else {
                    commonService.showWarningMessage(res.message);
                }
            }
            uploaderApi.initDefault(self.onFileUploaded);
            self.uploader = uploaderApi.uploader;

            this.onFileExport = function () {
                var a = document.createElement('a');
                a.href = productApi.product_export();
                a.target = '_blank';
                a.click();
            }
            this.onRemoves = function(product) {
                commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function(isConfirm) {
                    if (isConfirm) {
                        var selectedProducts = [];
                        angular.forEach(self.productModels, function(itm) {
                            if (itm.selected == true) {
                                selectedProducts.push(itm.SanphamId);
                                console.log(selectedProducts,"selectedProducts.");
                            }
                        });

                        if (selectedProducts.length == 0) {
                            commonService.showWarningMessage('Chưa chọn baohanh cần xóa');
                            return;
                        }

                        //remove
                        productApi.delete(selectedProducts).then(function(response) {
                            var response = response.data;
                            if (response.result) {
                                self.filter.Paging.CurrentPage = 1;
                                self.filter.Paging.PageSize = self.pageSize;
                                self.onList(self.filter);
                                commonService.showSuccessMessage('Xóa thành công');
                            } else {
                                commonService.showWarningMessage(response.message);
                            }
                        }, function(error) {
                            commonService.handlError(error.data);
                        });
                    } //if confirm
                }); //confirm sweet
            }
            this.onRemove = function(product) {
                commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function(isConfirm) {
                    if (isConfirm) {
                        productApi.delete([product.SanphamId]).then(function(response) {
                            var response = response.data;
                            if (response.result) {
                                self.filter.Paging.CurrentPage = 1;
                                self.filter.Paging.PageSize = self.pageSize;
                                self.onList(self.filter);
                                commonService.showSuccessMessage('Xóa thành công!');
                            } else {
                                commonService.showWarningMessage(response.message);
                            }
                        }, function(error) {
                            commonService.handlError(error.data);
                        });
                    }
                });
            }

            this.toggleAll = function() {
                var toggleStatus = self.isAllSelected;
                angular.forEach(self.productModels, function(itm) {
                    itm.selected = toggleStatus;
                });
            }
            this.onList = function(filter) {
                productApi.listSanpham(filter).then(function(response) {
                    var response = response.data;
                    var NguoiCapnhatId = null;
                    if (response.result) {
                        self.productModels = response.data.list;
                        self.productModels.forEach(function(product) {
                            nhomsanphamApi.get_by_id(product.NhomsanphamId).then(function(response) {
                                if (response.data.result) {
                                    product.nhomsanpham = response.data.data.TenNhomsanpham;
                                } else {
                                    commonService.showWarningMessage(response.data.message);
                                }
                            });
                            userApi.get_by_id(product.NguoitaoId).then(function(response) {
                                if (response.data.result) {
                                    product.NguoitaoName = response.data.data.Hovaten;
                                } else {
                                    commonService.showWarningMessage(response.data.message);
                                }

                            });
                            if (product.NguoiCapnhatId) {
                                NguoiCapnhatId = product.NguoiCapnhatId;
                            } else {
                                NguoiCapnhatId = product.NguoitaoId;
                            }
                            userApi.get_by_id(NguoiCapnhatId).then(function(response) {
                                if (response.data.result) {
                                    product.NguoicapnhatName = response.data.data.Hovaten;
                                } else {
                                    commonService.showWarningMessage(response.data.message);
                                }
                            });

                        })
                        console.log(self.productModels, "self.productModels");
                        self.totalRowCount = response.data.pager.RowsCount;
                    } else {
                        commonService.showWarningMessage(response.message);
                    }
                }, function(error) {
                    commonService.handlError(error.data);
                });

            } //onList


            this.onload = function() {
                self.onList(self.filter);
            }

            this.onload();
            this.onSearch = function($event) {
                if ($event.keyCode == 13) {
                    self.filter.Search = self.search;
                    self.onload();
                }
            }
            this.searchNguoitao = function(searchText) {
                self.filter.Search = searchText;
                return userApi.list(self.filter).then(function(response) {
                    return response.data.data.list
                });

            }
            this.searchChungloai = function(searchText) {
                self.filter.Search = searchText;
                return nhomsanphamApi.list(self.filter).then(function(response) {
                    return response.data.data.list
                });

            }

        }
    ]
});
