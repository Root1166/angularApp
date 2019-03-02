//import { window } from "./C:/Users/admin/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/d3";

angular.module('contract-add.comp', ['common.srv']).
    component('contractAdd', {
        templateUrl: '/app/components/contract/add.tpl.html?v=' + APP_VERSION,
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'hopdongApi', 'commonService', 'khachhangApi', 'nguonkhachApi', 'sanphamApi',
            function ($routeParams, $scope, $rootScope, $location, hopdongApi, commonService, khachhangApi, nguonkhachApi, sanphamApi) {
                var self = this;
                self.status = $routeParams.status;
                self.khachhangId = $routeParams.khachhangId;


                self.trangthaihopdongs = [
                    { Id: TRANG_THAI_HOP_DONG.New, Status: 'new' },
                    { Id: TRANG_THAI_HOP_DONG.Pending, Status: 'waiting' },
                    { Id: TRANG_THAI_HOP_DONG.InProgress, Status: 'inprogress' },
                    { Id: TRANG_THAI_HOP_DONG.Completed, Status: 'completed' },
                ]

                this.getTrangthaiHopdong = function () {
                    var status = self.trangthaihopdongs.find(function (item) {
                        return item.Id == self.model.Hopdong.Trangthai;
                    });
                    if (status) {
                        self.model.tenTrangthai = status.Status;
                    }
                }

                // load Hopdong
                this.loadHopdong = function () {
                    var dt = new Date();
                    if ($routeParams.status) {
                        hopdongApi.get_by_id($routeParams.status).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                self.model = rs.data;
                                self.getKhachHang(self.model.Hopdong);
                                self.getTrangthaiHopdong();
                                self.getNhucaugiaKhachHang();
                                self.model.Sanphams.forEach(function (item) {
                                    self.getSanPham(item);
                                });
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    } else {
                        self.model = {
                            Hopdong: {},
                            Sanphams: [],
                            Dichvus: [],
                            tenTrangthai: 'all'
                        }
                        self.model.Hopdong.SoHD = "HD" + dt.getFullYear() + dt.getMonth() + dt.getDate() + "-" + dt.getHours() + dt.getMinutes() + dt.getSeconds();
                        // them hop dong tu danh sach khach hang
                        if ($routeParams.khachhangId > 0) {
                            self.model.Hopdong.KhachhangId = $routeParams.khachhangId;
                            self.getKhachHang(self.model.Hopdong);
                            // them hop dong tu danh sach bao gia
                            if ($routeParams.baogiaId > 0) {
                                khachhangApi.get_bao_gia_detail($routeParams.baogiaId)
                                    .then(function (response) {
                                        if (response.data.result) {
                                            self.model.Sanphams = response.data.data.Sanphams;
                                            self.model.Dichvus = response.data.data.Dichvus;
                                            self.model.Sanphams.forEach(function (sp) {
                                                sanphamApi.get_by_id(sp.SanphamId).then(function (response) {
                                                    if (response.data.result) {
                                                        sp.TenSanpham = response.data.data.TenSanpham;
                                                        sp.MaSanpham = response.data.data.MaSanpham;
                                                        sp.Mota = response.data.data.Mota;
                                                        sp.AnhSanpham = response.data.data.AnhSanpham;
                                                    }
                                                });
                                            });
                                            self.getTriGiaHopdong();
                                        }
                                    });
                            }
                        }
                    }
                }

                this.getKhachHang = function (hopdong) {
                    khachhangApi.get_by_id(hopdong.KhachhangId).then(function (response) {
                        if (response.data.result) {
                            hopdong.Customer = response.data.data;
                            self.getNguonkhach(hopdong.Customer);
                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.getNguonkhach = function (customer) {
                    nguonkhachApi.get_by_id(customer.NguonkhachId).then(function (response) {
                        if (response.data.result) {
                            customer.NguonKhach = response.data.data.TenNguon;
                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                // search khach hang for add contract
                this.searchKhachHang = function (text) {
                    return khachhangApi.list_send2subsale({
                        Search: text,
                        Status:5,
                        Paging: {
                            PageSize: 20,
                            CurrentPage: 1
                        }
                    });
                }

                this.procesKhachHang = function (response) {
                    var rs = [];
                    if (response.data.result) {
                        response.data.data.list.forEach(e => {
                            rs.push({
                                id: e.KhachhangId,
                                text: e.Hoten + " - " + e.Mobile
                            });
                        });
                    }
                    return {
                        results: rs
                    };
                }

                this.onSelectKhachHang = function (value) {
                    self.model.Hopdong.KhachhangId = value;
                    self.getKhachHang(self.model.Hopdong);
                }
                //

                this.getSanPham = function (sanpham) {
                    sanphamApi.get_by_id(sanpham.SanphamId).then(function (response) {
                        if (response.data.result) {
                            var vm = response.data.data;
                            sanpham.AnhSanpham = vm.AnhSanpham;
                            sanpham.MaSP = vm.MaSanpham;
                            sanpham.TenSanpham = vm.TenSanpham;
                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.getTriGiaHopdong = function () {
                    var giatriSanpham = 0;
                    for (i = 0; i < self.model.Sanphams.length; i++) {
                        giatriSanpham += self.model.Sanphams[i].Gia * self.model.Sanphams[i].Soluong;
                    }
                    var giatriDichvu = 0;
                    for (i = 0; i < self.model.Dichvus.length; i++) {
                        giatriDichvu += self.model.Dichvus[i].Gia * self.model.Dichvus[i].Soluong;
                    }
                    self.model.Hopdong.Trigia = giatriDichvu + giatriSanpham;
                }

                this.BoSanpham = function (index) {
                    self.model.Sanphams.splice(index, 1);
                    self.getTriGiaHopdong();
                }

                this.BoDichvu = function (index) {
                    self.model.Dichvus.splice(index, 1);
                    self.getTriGiaHopdong();
                }

                //
                this.onLoad = function () {
                    self.loadHopdong();
                    document.getElementById("thongtinkh").click();
                }

                this.onLoad();

                // for them san pham
                this.liSanpham = function (searchTxt) {
                    item = {
                        Paging: {
                            PageSize: 50,
                            CurrentPage: 1,
                        },
                        Search: searchTxt
                    };
                    sanphamApi.list(item).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liSanphams = rs.data.list;
                            self.liSanphams.forEach(function (item) {
                                self.getGiaSanpham(item);
                            });
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.getNhucaugiaKhachHang = function () {
                    khachhangApi.listNhucaugia(self.model.Hopdong.KhachhangId).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.listNhucaugia = rs.data;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.getGiaSanpham = function (sanpham) {
                    if (sanpham.Giabans) {
                        var giaban = sanpham.Giabans.find(function (itemGiaban) {
                            var nhucaugia = self.listNhucaugia.find(function (itemNhucaugia) {
                                return itemGiaban.NhucaugiaId === itemNhucaugia.NhucaugiaId;
                            });
                            return nhucaugia != undefined || nhucaugia != null;
                        });
                        if (giaban != undefined || giaban != null) {
                            sanpham.Gia = giaban.Gia;
                        }
                    }
                }

                self.selectTabSanpham = function (item) {
                    var sanphamExist = self.model.Sanphams.find(function (a) {
                        return item.SanphamId === a.SanphamId;
                    });
                    if (sanphamExist) {
                        commonService.showWarningMessage('Sản phâm đã đươc chọn!');
                    } else {
                        self.model.Sanphams.push(item);
                    }
                }

                // for them dich vu
                self.selecTabDichvu = function () {
                    var item = {
                        Dichvu: self.modelDichvu.Dichvu,
                        Gia: self.modelDichvu.Gia,
                        Soluong: self.modelDichvu.Soluong,
                        "Id": 0,
                        "HopdongId": 0,
                        Thanhtien: self.modelDichvu.Gia * self.modelDichvu.Soluong,
                    };
                    self.model.Dichvus.push(item);
                    self.modelDichvu = {
                        Dichvu: '',
                        Gia: '',
                        Soluong: '',
                    };
                    self.countSum();
                }
                // this.getEdit = function (d1) {
                //     window.location.replace('#!/contract/edit/' + d1.HopdongId);
                // }

                self.onSave = function () {
                    hopdongApi.save(self.model).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            commonService.showSuccessMessage('Cập nhật hợp đồng thành công !');
                            console.log(self.model);
                            if (self.model.Hopdong.HopdongId == undefined)
                                self.model = undefined;

                            if (self.isAutoBack == true) {
                                window.location = '/#!/contract/list/all';
                            }
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                self.onSaveAndBack = function () {
                    self.isAutoBack = true;
                    self.onSave();
                }

                self.countSum = function () {
                    self.countAllPrice = 0;
                    if (self.model.Dichvus.length > 0) {
                        for (var i = 0; i < self.model.Dichvus.length; i++) {
                            if (self.model.Dichvus[i].Soluong != null && self.model.Dichvus[i].Gia != null)
                                self.countAllPrice += (self.model.Dichvus[i].Soluong * self.model.Dichvus[i].Gia);
                        }
                    }
                    if (self.model.Sanphams.length > 0) {
                        for (var i = 0; i < self.model.Sanphams.length; i++) {
                            if (self.model.Sanphams[i].Soluong != null && self.model.Sanphams[i].Gia != null)
                                self.countAllPrice += (self.model.Sanphams[i].Soluong * self.model.Sanphams[i].Gia);
                        }
                    }
                }

            }
        ]
    });
