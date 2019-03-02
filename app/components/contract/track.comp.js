
angular.module('contract-track.comp', ['common.srv']).
    component('contractTrack', {
        templateUrl: '/app/components/contract/track.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'hopdongApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, hopdongApi, commonService) {
                var self = this;
                self.status = $routeParams.status;
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.filter = {
                    "Search": self.search,
                    "CustomerId": "",
                    "Status": "",
                    "CreatorId": "",
                    "CityId": "",
                    "DistrictId": "",
                    "NhucaugiaId": "",
                    "LoaiKhachhangId": "",
                    "NguonkhachId": "",
                    "NhomsanphamId": "",
                    "Start": "",
                    "End": "",
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };
                self.countRows = 0;
                //0 11/11/2017
                //1 11/11/2017 22:22
                //2 123123123
                //3 type date
                //4 type data year month day
                self.ConDate = function (data, number) {
                    if (data == null || data == "") {
                        return '';
                    }
                    if (data !== null && data != "" && data != undefined) {
                        try {
                            if (data.indexOf("SA") != -1 || data.indexOf("CH") != -1) {
                                if (data.indexOf("SA") != -1) { }
                                if (data.indexOf("CH") != -1) { }
                            }

                            if (data.indexOf('Date') != -1) {
                                data = data.substring(data.indexOf("Date") + 5);
                                data = parseInt(data);
                            }
                        }
                        catch (ex) { }
                        var newdate = new Date(data);
                        if (number == 3) {
                            return newdate;
                        }
                        if (number == 2) {
                            return "/Date(" + newdate.getTime() + ")/";
                        }
                        var month = newdate.getMonth() + 1;
                        var day = newdate.getDate();
                        var year = newdate.getFullYear();
                        var hh = newdate.getHours();
                        var mm = newdate.getMinutes();
                        if (month < 10)
                            month = "0" + month;
                        if (day < 10)
                            day = "0" + day;
                        if (mm < 10)
                            mm = "0" + mm;
                        if (number == 0) {
                            return todayDate = day + "/" + month + "/" + year;
                        }
                        if (number == 1) {
                            return todayDate = day + "/" + month + "/" + year + " " + hh + ":" + mm;
                        }
                        if (number == 4) {
                            return new Date(year, month - 1, day);
                        }
                    } else {
                        return '';
                    }
                }
                self.listLoaiKhachHangs = [];
                self.listNguonKhachs = [];
                self.listQuanHuyens = [];
                self.listThanhPhos = [];
                self.listTaiKhoans = [];
                self.listSanphams = [];
                self.listNhucaugias = [];
                self.searchpanel = {
                    "CustomerIdmodel": null,
                    "Status": null,
                    "CreatorIdmodel": null,
                    "CityIdmodel": null,
                    "DistrictIdmodel": null,
                    "NhucaugiaIdmodel": null,
                    "LoaiKhachhangIdmodel": null,
                    "NguonkhachIdmodel": null,
                    "NhomsanphamIdmodel": null,
                    Statusmodel: null,
                };
                self.modelContractAdd = {
                    "Hopdong": {
                        "HopdongId": 0,
                        "KhachhangId": 0,
                        "BaogiaId": "",
                        "SoHD": "",
                        "Ngaytao": "",
                        "Nguoitao": 0,
                        "Trigia": 0,
                        "Ngaycapnhat": "",
                        "Nguoicapnhat": "",
                        "Trangthai": 0,
                        "Ghichu": "",
                        "Loai": 0
                    },
                    "Sanphams": [
                        {
                            "Id": 0,
                            "HopdongId": 0,
                            "SanphamId": 0,
                            "Soluong": 0,
                            "Gia": 0,
                            "Thanhtien": 0
                        }
                    ],
                    "Dichvus": [
                        {
                            "Id": 0,
                            "HopdongId": 0,
                            "Dichvu": "",
                            "Soluong": 0,
                            "Gia": 0,
                            "Thanhtien": 0
                        }
                    ]
                };
                self.toggleAll = function () {
                    var toggleStatus = self.isAllSelected;
                    angular.forEach(self.listContract, function (itm) { itm.selected = toggleStatus; });
                }
                self.loadData = function (filter) {
                    if (self.searchpanel.KinhdoanhNhanIdmodel != null && self.searchpanel.KinhdoanhNhanIdmodel != "") {
                        self.filter.KinhdoanhNhanId = self.searchpanel.KinhdoanhNhanIdmodel.TaikhoanId;
                    } else {
                        self.filter.KinhdoanhNhanId = "";
                    }
                    if (self.searchpanel.NguoitaoIdmodel != null && self.searchpanel.TaikhoanId != "") {
                        self.filter.CreatorId = self.searchpanel.NguoitaoIdmodel.KhachhangId;
                    } else {
                        self.filter.CreatorId = "";
                    }
                    if (self.searchpanel.CskhIdmodel != null && self.searchpanel.CskhIdmodel != "") {
                        self.filter.CskhId = self.searchpanel.CskhIdmodel.TaikhoanId;
                    } else {
                        self.filter.CskhId = "";
                    }
                    if (self.searchpanel.ThanhphoIdmodel != null && self.searchpanel.ThanhphoIdmodel != "") {
                        self.filter.CityId = self.searchpanel.ThanhphoIdmodel.Id;
                    } else {
                        self.filter.CityId = "";
                    }
                    if (self.searchpanel.QuanhuyenIdmodel != null && self.searchpanel.QuanhuyenIdmodel != "") {
                        self.filter.DistrictId = self.searchpanel.QuanhuyenIdmodel.Id;
                    } else {
                        self.filter.DistrictId = "";
                    }
                    if (self.searchpanel.NhucauIdmodel != null && self.searchpanel.NhucauIdmodel != "") {
                        self.filter.NhucauId = self.searchpanel.NhucauIdmodel.NhucauId;
                    } else {
                        self.filter.NhucauId = "";
                    }
                    if (self.searchpanel.NguoixulyIdmodel != null && self.searchpanel.NguoixulyIdmodel != "") {
                        self.filter.NguoixulyId = self.searchpanel.NguoixulyIdmodel.TaikhoanId;
                    } else {
                        self.filter.NguoixulyId = "";
                    }
                    if (self.searchpanel.LoaikhachIdmodel != null && self.searchpanel.LoaikhachIdmodel != "") {
                        self.filter.LoaikhachId = self.searchpanel.LoaikhachIdmodel.LoaiKhachhangId;
                    } else {
                        self.filter.LoaikhachId = "";
                    }
                    if (self.searchpanel.SanphamQuantamIdmodel != null && self.searchpanel.SanphamQuantamIdmodel != "") {
                        self.filter.SanphamQuantamId = self.searchpanel.SanphamQuantamIdmodel.SanphamId;
                    } else {
                        self.filter.SanphamQuantamId = "";
                    }
                    if (self.searchpanel.NguonkhachIdmodel != null && self.searchpanel.NguonkhachIdmodel != "") {
                        self.filter.NguonkhachId = self.searchpanel.NguonkhachIdmodel.NguonKhachId;
                    } else {
                        self.filter.NguonkhachId = "";
                    } 
                    hopdongApi.list(filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.listContract = rs.data.list;
                            self.totalRowCount = rs.data.pager.RowCount;
                            if (self.listContract.length > 0) {
                                self.countRows = 0;
                                self.listKhachhang();
                            }
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                //begin list 
                self.listKhachhang = function () {
                    hopdongApi.get_by_idKH(self.listContract[self.countRows].KhachhangId).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            try {
                                self.listContract[self.countRows].Khachhangmodel = rs.data;
                                if (rs.data != null && rs.data != undefined && rs.data.ThanhphoId != null && rs.data.ThanhphoId != "" && rs.data.ThanhphoId != 0) {
                                    hopdongApi.get_by_idTP(self.listContract[self.countRows].Khachhangmodel.ThanhphoId).then(function (rs) {
                                        var rs = rs.data;
                                        if (rs.result) {
                                            self.listContract[self.countRows].Khachhangmodel.Thanhphoname = rs.data.Title;
                                            if (self.countRows < self.listContract.length - 1) {
                                                self.countRows++;
                                                self.listKhachhang();
                                            }
                                        }
                                    });
                                } else {
                                    if (self.countRows < self.listContract.length - 1) {
                                        self.countRows++;
                                        self.listKhachhang();
                                    }
                                }
                            }
                            catch (ex) { }
                        }
                        else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                self.listNhucaugia = function () {
                    item = {
                        "Paging": {
                            "PageSize": 100,
                            "CurrentPage": 1,
                        }
                    };
                    hopdongApi.listNhucaugia(item).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.listNhucaugias = rs.data.list;
                        }
                        else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                self.listSanphamquantam = function () {
                    hopdongApi.get_sanpham_quantams(self.listCustomer[self.countRows].KhachhangId).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            try {
                                self.listCustomer[self.countRows].SPQTs = rs.data;
                                //if (self.countRows < self.listCustomer.length - 1) {
                                //    self.countRows++;
                                //    self.listSanphamquantam();
                                //}
                            }
                            catch (ex) { }
                        }
                        else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                self.listLoaiKhachHang = function () {
                    item = {
                        "Paging": {
                            "PageSize": 100,
                            "CurrentPage": 1,
                        }
                    };
                    hopdongApi.listLoaiKhachHang(item).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.listLoaiKhachHangs = rs.data.list;
                            //for (var i = 0; i < self.listLoaiKhachHangs.length; i++) {
                            //    for (var ii = 0; ii < self.listCustomer.length; ii++) {
                            //        if (self.listCustomer[ii].LoaiKHId == self.listLoaiKhachHangs[i].LoaiKhachhangId) {
                            //            self.listCustomer[ii].LoaiKH = self.listLoaiKhachHangs[i].TenLoai;
                            //        }
                            //    }
                            //}
                        }
                        else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                self.listNguonKhach = function () {
                    item = {
                        "Paging": {
                            "PageSize": 100,
                            "CurrentPage": 1,
                        }
                    };
                    hopdongApi.listNguonKhach(item).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.listNguonKhachs = rs.data.list;
                            //for (var i = 0; i < self.listNguonKhachs.length; i++) {
                            //    for (var ii = 0; ii < self.listCustomer.length; ii++) {
                            //        if (self.listCustomer[ii].NguonkhachId == self.listNguonKhachs[i].NguonKhachId) {
                            //            self.listCustomer[ii].Nguonkhach = self.listNguonKhachs[i].TenNguon;
                            //        }
                            //    }
                            //}
                        }
                        else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                self.listQuanHuyen = function () {
                    item = {
                        "Paging": {
                            "PageSize": 100,
                            "CurrentPage": 1,
                        }
                    };
                    hopdongApi.listQuanHuyen(item).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.listQuanHuyens = rs.data.list;
                        }
                        else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                self.listThanhPho = function () {
                    item = {
                        "Paging": {
                            "PageSize": 100,
                            "CurrentPage": 1,
                        }
                    };
                    hopdongApi.listThanhPho(item).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.listThanhPhos = rs.data.list;
                            //for (var i = 0; i < self.listThanhPhos.length; i++) {
                            //    for (var ii = 0; ii < self.listCustomer.length; ii++) {
                            //        if (self.listCustomer[ii].ThanhphoId == self.listThanhPhos[i].Id) {
                            //            self.listCustomer[ii].Thanhphoname = self.listThanhPhos[i].Title;
                            //        }
                            //    }
                            //}
                        }
                        else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                self.listTaiKhoan = function () {
                    item = {
                        "Paging": {
                            "PageSize": 100,
                            "CurrentPage": 1,
                        }
                    };
                    hopdongApi.listTaiKhoan(item).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.listTaiKhoans = rs.data.list;
                            //for (var i = 0; i < self.listTaiKhoans.length; i++) {
                            //    for (var ii = 0; ii < self.listCustomer.length; ii++) {
                            //        if (self.listCustomer[ii].Nguoitao == self.listTaiKhoans[i].TaikhoanId) {
                            //            self.listCustomer[ii].Nguoitaomodel = self.listTaiKhoans[i].Hovaten;
                            //        }
                            //        if (self.listCustomer[ii].Nguoicapnhat == self.listTaiKhoans[i].TaikhoanId) {
                            //            self.listCustomer[ii].Nguoicapnhatmodel = self.listTaiKhoans[i].Hovaten;
                            //        }
                            //    }
                            //}
                            //if (self.id != undefined)
                            //    self.getItem();
                        }
                        else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                self.listSanpham = function (d1) {
                    var item = {
                        "Paging": {
                            "PageSize": 100,
                            "CurrentPage": 1,
                        }
                    };
                    if (d1 != undefined) {
                        item.Search = d1;
                    }
                    hopdongApi.listSanpham(item).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.listSanphams = rs.data.list;
                        }
                        else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                //end list
                self.init = function () {
                    self.loadData(self.filter);
                    self.listLoaiKhachHang();
                    self.listNguonKhach();
                    self.listQuanHuyen();
                    self.listThanhPho();
                    self.listTaiKhoan();
                    self.listSanpham();
                    self.listNhucaugia();
                };
                self.init();
                self.getEdit = function (d1) {
                    window.location.replace('#!/contract/edit/' + d1.HopdongId);
                }
                self.delete = function (d1) {
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            hopdongApi.delete([d1.HopdongId]).then(function (rs) {
                                var rs = rs.data;
                                if (rs.result) {
                                    self.filter.Paging.CurrentPage = 1;
                                    self.filter.Paging.PageSize = self.pageSize;
                                    self.init(self.filter);
                                    //show message
                                    commonService.showSuccessMessage('Xóa thành công!');
                                    self.init();
                                }
                                else {
                                    commonService.showWarningMessage(rs.message);
                                }
                            }, function (error) {
                                commonService.handlError(error.message);
                            });
                        }
                    });//sweet confirm          
                }
            }
        ]
    });