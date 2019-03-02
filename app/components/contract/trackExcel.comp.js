angular.module('contract-trackexcel.comp', ['common.srv']).
    component('contractTrackexcel', {
        templateUrl: '/app/components/contract/trackexcel.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'hopdongApi', 'commonService','nguonkhachApi','loaikhachhangApi','thanhphoApi','quanhuyenApi','nhucaugiaApi','nhomsanphamApi','sanphamApi','userApi','khachhangApi',
            function ($routeParams, $scope, $rootScope, $location, hopdongApi, commonService,nguonkhachApi,loaikhachhangApi,thanhphoApi,quanhuyenApi,nhucaugiaApi,nhomsanphamApi,sanphamApi,userApi,khachhangApi) {
                var self = this;
                self.status = $routeParams.status;
                self.currentPage = 1;
                self.pageSize = 20;
                self.totalRowCount = 0;
                self.Customer = {};
                self.show = false;
                self.filter = {
                    "Search": self.search,
                    "KehoachId":undefined,
                    "HopdongId":self.status,
                    "Start": undefined,
                    "End": new Date(),
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };
                this.onAdd = function(){
                    self.show = !self.show;
                }
                self.loaiCongviecs = [
                    { Id: LOAI_CONG_VIEC.Thoi_gian_di_xe, Status: 'Thời gian đi xe' },
                    { Id: LOAI_CONG_VIEC.Thoi_gian_cho_vat_tu, Status: 'Thời gian chờ vật tư' },
                    { Id: LOAI_CONG_VIEC.Thoi_gian_chuan_bi_vat_tu, Status: 'Thời gian chuẩn bị vật tư' },
                    { Id: LOAI_CONG_VIEC.Thoi_gian_thi_cong, Status: 'Thời gian thi công' },
                    { Id: LOAI_CONG_VIEC.Di_tinh, Status: 'Đi tỉnh' },
                    { Id: LOAI_CONG_VIEC.Khac, Status: 'Khác' },
                ]

                this.getLoaicongviec = function(nhatki) {
                    if(nhatki.LoaiCongviec){
                        var status = self.loaiCongviecs.find(function (item) {
                            return item.Id == nhatki.LoaiCongviec;
                        });
                        if (status) {
                            nhatki.Congviec = status.Status;
                        }
                    }
                }
                this.searchGiaidoan = function(searchText) {
                    var filter = {
                        "Search": searchText,
                        "HopdongId":self.status,
                        "Paging": {
                            "PageSize": self.pageSize,
                            "CurrentPage": self.currentPage
                        }
                    };
                    return hopdongApi.list_kehoachs(filter).then(function(response) {
                        return response.data.data.list
                    });

                }
                this.filterByDate = function (arg1) {
                    if (arg1 != undefined) {
                        self.filter.Start = arg1.start;
                        self.filter.End = arg1.end;
                    }
                    self.onLoad()
                }
                this.onSelectGiaidoan = function(item) {
                    if (typeof item == 'object')
                        self.filter.KehoachId = item.Id;
                    else {
                        self.filter.KehoachId = undefined;
                    }
                    self.onLoad()
                }
                this.getNguoibaocao = function(nhatki) {
                    if(nhatki.NguoibaocaoId){
                        userApi.get_by_id(nhatki.NguoibaocaoId).then(function(response) {
                            if(response.data.result) {
                                nhatki.Nguoibaocao = response.data.data.Hovaten;
                            } else {
                                commonService.showWarningMessage(response.data.message);
                            }
                        }, function(error) {
                            commonService.handlError(error.data);
                        });
                    }

                }
                this.getCityOfCustomer = function(cutomer) {
                    if(cutomer.ThanhphoId){
                        thanhphoApi.get_by_id(cutomer.ThanhphoId).then(function(response) {
                            if(response.data.result) {
                                cutomer.thanhPho = response.data.data.Title;
                            } else {
                                commonService.showWarningMessage(response.data.message);
                            }
                        }, function(error) {
                            commonService.handlError(error.data);
                        });
                    }
                    else console.log("chưa có thành phố");
                }

                this.getNguoitao = function(hopdong) {
                    if(hopdong.Nguoitao){
                        userApi.get_by_id(hopdong.Nguoitao).then(function(response) {
                            if(response.data.result) {
                                hopdong.NguoitaoName = response.data.data.Hovaten;
                            } else {
                                commonService.showWarningMessage(response.data.message);
                            }
                        }, function(error) {
                            commonService.handlError(error.data);
                        });
                    }

                }
                this.getKhachHang = function (hopdong) {
                    if(hopdong.KhachhangId){
                        khachhangApi.get_by_id(hopdong.KhachhangId).then(function (response) {
                            if (response.data.result) {
                                self.Customer = response.data.data;
                                self.getCityOfCustomer(self.Customer);
                            } else {
                                commonService.showWarningMessage(response.data.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    }
                }
                this.onLoadHopdong = function () {
                    if (self.status) {
                        hopdongApi.get_by_id(self.status).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                self.model = rs.data;
                                self.getKhachHang(self.model.Hopdong);
                                self.getNguoitao(self.model.Hopdong);
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    }
                }

                this.onList = function() {
                    hopdongApi.xem_tien_do(self.filter).then(function(response) {
                        var response = response.data;
                        if (response.result) {
                            self.tiendoHDmodel = response.data.Giaidoans;
                             self.tiendoHDmodel.forEach(function(tiendo){
                                 tiendo.NhatkyThicongs.forEach(function(nhatki){
                                    self.getNguoibaocao(nhatki);
                                    self.getLoaicongviec(nhatki);
                                 })
                             })
                        } else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function(error) {
                        commonService.handlError(error.data);
                    });
                }
                this.onLoad = function(){
                    self.onList();
                };
                this.onLoad();
                this.onLoadHopdong();
            }
        ]
    });
