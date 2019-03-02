angular.module('baohanh.comp', ['baohanh.api', 'common.srv']).
component('baohanh', {
    templateUrl: '/app/components/baohanh/baohanh.tpl.html',
    controller: ['$routeParams', '$scope', '$rootScope', '$location', 'baohanhApi', 'commonService', 'userApi', 'hopdongApi',
        function($routeParams, $scope, $rootScope, $location, baohanhApi, commonService, userApi, hopdongApi) {
            var self = this;
            self.show = false;
            self.currentPage = 1;
            self.pageSize = '50';
            self.totalRowCount = 0;
            self.currentBaohanhModel = {};
            self.Hethan = false;
            self.filter = {
                "Search": ' ',
                "Paging": {
                    "PageSize": self.pageSize,
                    "CurrentPage": self.currentPage,
                }
            };
            this.onAdd = function(){
                self.show = !self.show;
            }
            this.searchKythuatvien = function(searchText) {
                var filter = {
                    "Search": searchText,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };
                return userApi.list(filter).then(function(response) {
                    return response.data.data.list
                });

            }
            this.onSelectKythuatvien = function(item) {
                if (typeof item == 'object')
                    self.currentBaohanhModel.KythuatXulyId = item.TaikhoanId;
                else
                    self.currentBaohanhModel.KythuatXulyId = self.currentBaohanhModel.KythuatXulyId;
            }

            this.onCanel = function() {
                self.currentBaohanhModel = {};
                self.Hethan = false;
            }
            this.onEdit = function(baohanh) {
                self.baohanhs = baohanh;
                self.currentBaohanhModel = baohanh;
                let baohanhDate = Date.parse(self.currentBaohanhModel.ThoigianDukienHoanthanh);
                let date = Date.parse(new Date());
                if (date > baohanhDate) {
                    self.Hethan = true;
                } else {
                    self.Hethan = false;
                }
            }
            this.onSaveBaohanhModel = function() {
                if (
                    self.currentBaohanhModel.GhichuHonghoc == '' || self.currentBaohanhModel.ThoigianDukienHoanthanh == undefined ||
                    self.currentBaohanhModel.Sanpham == '' || self.currentBaohanhModel.ThoigianDukienHoanthanh == ''
                ) {
                    commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                    return;
                }
                var onSave = undefined;
                if (self.currentBaohanhModel.Id == undefined || self.currentBaohanhModel.Id == 0)
                    onSave = baohanhApi.add;
                else
                    onSave = baohanhApi.update;
                onSave(self.currentBaohanhModel).then(function(response) {
                    var response = response.data;
                    if (response.result) {
                        self.filter.Paging.CurrentPage = 1;
                        self.filter.Paging.PageSize = self.pageSize;
                        self.onList(self.filter);
                        self.Hethan = false;
                        commonService.showSuccessMessage('Cập nhật thành công!');
                        self.currentBaohanhModel = {};
                    } else {
                        commonService.showWarningMessage(response.message);
                    }
                }, function(error) {
                    commonService.handlError(error.data);
                });
            }
            this.onRemove = function(baohanh) {

                commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function(isConfirm) {
                    if (isConfirm) {
                        //remove
                        baohanhApi.delete([baohanh.Id]).then(function(response) {
                            var response = response.data;
                            if (response.result) {
                                self.filter.Paging.CurrentPage = 1;
                                self.filter.Paging.PageSize = self.pageSize;
                                self.onList(self.filter);

                                //show message
                                commonService.showSuccessMessage('Xóa thành công!');
                            } else {
                                commonService.showWarningMessage(response.message);
                            }
                        }, function(error) {
                            commonService.handlError(error.data);
                        });
                    }
                }); //sweet confirm
            }
            this.onPageChanged = function(pageIndex) {
                self.filter.Paging.CurrentPage = pageIndex;
                self.filter.Paging.PageSize = self.pageSize;
                self.onList(self.filter);
            }
            this.onSearch = function($event) {
                if ($event.keyCode == 13) {
                    self.filter.Search = self.search;
                    self.onList(self.filter);
                }
            }
            this.onSearchSP = function($event) {
                if ($event.keyCode == 13) {
                    self.filter.Search = self.searchSP;
                    self.onListSP(self.filter);
                }
            }
            this.onList = function(filter) {
                baohanhApi.list(filter).then(function(response) {
                    var response = response.data;
                    var sanphams = [];
                    if (response.result) {
                        self.baohanhModels = response.data.list;
                        self.baohanhModels.forEach(function(bh) {
                            hopdongApi.get_by_id(bh.HopdongId).then(function(d) {
                                bh.SoHD = d.data.data.Hopdong.SoHD;
                                var sanphams = d.data.data.Sanphams;
                                sanphams.forEach((sp) => {
                                    if (sp.SanphamId == bh.SanphamId){
                                        bh.TenSanpham = sp.TenSanpham;
                                        bh.MaSP = sp.MaSP;
                                    }
                                })
                            })
                            userApi.get_by_id(bh.NguoitaoId).then(function(response) {
                                if (response.data.result) {
                                    bh.NguoitaoName = response.data.data.Hovaten;
                                } else {
                                    commonService.showWarningMessage(response.data.message);
                                }
                            });
                            userApi.get_by_id(bh.KythuatXulyId).then(function(response) {
                                if (response.data.result) {
                                    bh.KythuatXulyName = response.data.data.Hovaten;
                                } else {
                                    commonService.showWarningMessage(response.data.message);
                                }
                            });
                        })

                        self.totalRowCount = response.data.pager.RowsCount;
                    } else {
                        commonService.showWarningMessage(response.message);
                    }
                }, function(error) {
                    commonService.handlError(error.data);
                });
            }
            this.onListSP = function(filter) {
                hopdongApi.list(filter).then(function(response) {
                    var productModels = [];
                    self.orders = response.data.data.list;
                    self.orders.forEach(function(order) {
                        baohanhApi.listSanphamHD(order.HopdongId).then(function(p) {
                            order.products = p.data.data;
                            order.products.forEach((product) => {
                                product.SoHD = order.SoHD;
                                productModels.push(product);
                            })
                        })
                    })
                    self.productModels = productModels;
                });
            }
            this.selectTabSanpham = function(sp, index) {
                self.currentBaohanhModel.TenSanpham = sp.TenSanpham;
                self.currentBaohanhModel.SanphamId = sp.SanphamId;
                self.currentBaohanhModel.HopdongId = sp.HopdongId;
                self.currentBaohanhModel.Ngaytao = new Date();
                angular.element(document).ready(function() {
                    setTimeout(function() {
                        $('#searchModelDialog').modal('toggle');
                    }, 400);
                })

            }
            this.onLoad = function() {
                self.onList(self.filter);
                self.onListSP(self.filter);
            }
            this.onLoad();
        }
    ]
});
