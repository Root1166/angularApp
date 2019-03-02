
angular.module('contract-list.comp', ['common.srv']).
    component('contractList', {
        templateUrl: '/app/components/contract/list.tpl.html?v=' + APP_VERSION,
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'hopdongApi', 'commonService','nguonkhachApi','loaikhachhangApi','thanhphoApi','quanhuyenApi','nhucaugiaApi','nhomsanphamApi','sanphamApi','userApi','khachhangApi',
            function ($routeParams, $scope, $rootScope, $location, hopdongApi, commonService,nguonkhachApi,loaikhachhangApi,thanhphoApi,quanhuyenApi,nhucaugiaApi,nhomsanphamApi,sanphamApi,userApi,khachhangApi) {
                var self = this;
                self.status = $routeParams.status;
                self.profileModel = {};
                self.listContract = [];
                self.Hidden = false;
                self.currentPage = 1;
                self.pageSize = 50;
                // self.totalRowCount = 0;
                self.filter = {
                    Search: undefined,
                    CustomerId: undefined,
                    Status: undefined,
                    CreatorId: undefined,
                    CityId: undefined,
                    DistrictId: undefined,
                    NhucaugiaId: undefined,
                    LoaiKhachhangId: undefined,
                    NguonkhachId: undefined,
                    NhomsanphamId: undefined,
                    SanphamQuantamId: undefined,
                    LoaiHopdong: undefined,
                    Paging: {
                      PageSize: self.pageSize,
                      CurrentPage: self.currentPage
                    }
                  };



                this.onInit = function() {
                    angular.element(document).ready(function () {
                        // your code here
                        (window.innerWidth > 0 ? window.innerWidth : this.screen.width) < 1120 ? ($("body").addClass("mini-sidebar"),
                            $(".navbar-brand span").hide(), $(".sidebartoggler i").addClass("ti-menu")) : ($("body").removeClass("mini-sidebar"),
                                $(".navbar-brand span").show());
                        var height = (window.innerHeight > 0 ? window.innerHeight : this.screen.height) - 1;
                        (height -= 0) < 1 && (height = 1), height > 0 && $(".page-wrapper").css("min-height", height + "px");
                    });
               
                    switch ($routeParams.status) {
                        case 'waiting':
                            self.filter.Status = TRANG_THAI_HOP_DONG.Pending;
                            this.pageTitle = 'HỢP ĐỒNG CHỜ THI CÔNG';
                            break;
                        case 'inprogress':
                            self.filter.Status = TRANG_THAI_HOP_DONG.InProgress;
                            this.pageTitle = 'HỢP ĐỒNG ĐANG THI CÔNG';
                            break;
                        case 'completed':
                            self.filter.Status = TRANG_THAI_HOP_DONG.Completed;
                            this.pageTitle = 'HỢP ĐỒNG ĐÃ HOÀN THÀNH';
                            break;
                        case 'new':
                            self.filter.Status = TRANG_THAI_HOP_DONG.New;
                            this.pageTitle = 'HỢP ĐỒNG VỪA THÀNH LẬP';
                            break;
                        default:
                            this.pageTitle = 'DANH SÁCH TẤT CẢ HỢP ĐỒNG';
                            break;
                    };
                }
                this.toggleAll = function () {
                    var toggleStatus = self.isAllSelected;
                    angular.forEach(self.contractData, function (itm) { itm.selected = toggleStatus; });
                }
                
                //for Filter ==============================
                self.liThanhpho = function () {
                    item = {
                        Paging: {
                            PageSize: 100,
                            CurrentPage: 1
                        }
                    };
                    thanhphoApi.list(item).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liThanhphos = rs.data.list;
                        }
                        else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onCheckPermission = function () {
                    if (self.profileModel.Roles != undefined &&
                        self.profileModel.Roles.indexOf(";" + SYSTEM_ROLES.Technician + ";")>=0) {
                            self.isTechnical = true;   
                        }
                }
                this.onSelectCity = function(city) {
                    if(city) {
                        self.filter.CityId = city.Id;
                        self.liQuanhuyen(city);
                    } else {
                        self.filter.CityId = undefined;
                        self.liQuanhuyens = [];
                    }
                    self.loadList();
                }
                //
                self.liQuanhuyen = function (city) {
                    item = {
                        ThanhphoId: city.Id,
                        Paging: {
                            PageSize: 100,
                            CurrentPage: 1
                        }
                    };
                    quanhuyenApi.list(item).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liQuanhuyens = rs.data.list;
                        }
                        else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onSelectDistrict = function(district) {
                    if(district) {
                        self.filter.DistrictId = district.Id;
                    } else {
                        self.filter.DistrictId = undefined;
                    }
                    self.loadList();
                }
                //
                self.liNhucaugia = function () {
                    item = {
                        Paging: {
                            PageSize: 100,
                            CurrentPage: 1
                        }
                    };
                    nhucaugiaApi.list(item).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liNhucaugias = rs.data.list;
                        }
                        else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onSelectNhucaugia = function(nhucaugia) {
                    if(nhucaugia) {
                        self.filter.NhucaugiaId = nhucaugia.NhucauId;
                    } else {
                        self.filter.NhucaugiaId = undefined;
                    }
                    self.loadList();
                }

                //

                self.liNhomSP = function () {
                    item = {
                        Paging: {
                            PageSize: 100,
                            CurrentPage: 1
                        }
                    };
                    nhomsanphamApi.list(item).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liNhomSPs = rs.data.list;
                        }
                        else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onSelectNhomSP = function(nhomsp) {
                    if(nhomsp) {
                        self.filter.NhomsanphamId = nhomsp.Id;
                    } else {
                        self.filter.NhomsanphamId = undefined;
                    }
                    self.loadList();
                }
                

                this.searchSanphamquantam = function (text) {
                    return sanphamApi.list({
                        Search: text,
                        Paging: {
                            PageSize: 20,
                            CurrentPage: 1
                        }
                    });
                }

                self.sanphanQuantam = {SanphamId:0, TenSanpham:''};
                
                this.procesSanphamquantam = function (response) {
                    var rs = [];
                    if (response.data.result) {
                        response.data.data.list.forEach(e => {
                            rs.push({
                                id: e.SanphamId,
                                text: e.TenSanpham
                            });
                        });
                    }
                    return {
                        results: rs
                    };
                }

                this.onSelectSanpham = function(value) {
                    self.filter.SanphamQuantamId = value;
                    self.loadList();
                }

                //
                self.liNguoixuly = function () {
                    item = {
                        Paging: {
                            PageSize: 100,
                            CurrentPage: 1
                        }
                    };
                    userApi.list(item).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liNguoixulys = rs.data.list;
                        }
                        else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onSelectNguoixuly = function(nguoixuly) {
                    if(nguoixuly) {
                        self.filter.CreatorId = nguoixuly.TaikhoanId;
                    } else {
                        self.filter.CreatorId = undefined;
                    }
                    self.loadList();
                }
                //
                self.liLoaikhach = function () {
                    item = {
                        Paging: {
                            PageSize: 100,
                            CurrentPage: 1
                        }
                    };
                    loaikhachhangApi.list(item).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liLoaikhachs = rs.data.list;
                        }
                        else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onSelectLoaiKhach = function(loaikhach) {
                    if(loaikhach) {
                        self.filter.LoaiKhachhangId = loaikhach.LoaiKhachhangId;
                    } else {
                        self.filter.LoaiKhachhangId = undefined;
                    }
                    self.loadList();
                }
                //
                
                //
                self.liNguonkhach = function () {
                    item = {
                        Paging: {
                            PageSize: 100,
                            CurrentPage: 1
                        }
                    };
                    nguonkhachApi.list(item).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liNguonkhachs = rs.data.list;
                        }
                        else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onSelectNguonKhach = function(nguonkhach) {
                    if(nguonkhach) {
                        self.filter.NguonkhachId = nguonkhach.NguonKhachId;
                    } else {
                        self.filter.NguonkhachId = undefined;
                    }
                    self.loadList();
                }
                //

                self.liLoaiHopdongs = [
                    {Id: LOAI_HOP_DONG.HopdongDichvu, Name: "HĐ dịch vụ"},
                    {Id: LOAI_HOP_DONG.Donhang, Name: "Đơn hàng"}
                ]

                this.onSelectLoaiHopDong = function(loaihd) {
                    if(loaihd) {
                        self.filter.LoaiHopdong = loaihd.Id;
                    } else {
                        self.filter.LoaiHopdong = undefined;
                    }
                    self.loadList();
                }

                // end for filter

                // master data

                this.loadList = function () {
                    hopdongApi.list(self.filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.listContract = rs.data.list;
                            self.listContract.forEach(function(item){
                                self.getKhachHang(item);
                                self.getNguoitao(item);
                                self.getNguoicapnhat(item);
                                self.getSanpham(item);
                            });
                            self.totalRowCount = rs.data.pager.RowCount;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                } 
                self.onPageChanged = function (pageIndex) {
                    self.filter.Paging.CurrentPage = pageIndex;
                    self.filter.Paging.PageSize = self.pageSize;
                    self.loadList();
                }
                // end master data

                // get data ...
                this.getKhachHang = function(hopdong) {
                    khachhangApi.get_by_id(hopdong.KhachhangId).then(function(response) {
                        if(response.data.result) {
                            hopdong.Customer = response.data.data;
                            self.getCityOfCustomer(hopdong.Customer);
                            self.getTypeOfCustomer(hopdong.Customer);
                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function(error) {
                        commonService.handlError(error.data);
                    });
                }

                this.getCityOfCustomer = function(cutomer) {
                    thanhphoApi.get_by_id(cutomer.ThanhphoId).then(function(response) {
                        if(response.data.result) {
                            cutomer.thanhPho = response.data.data;
                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function(error) {
                        commonService.handlError(error.data);
                    });
                }

                this.getTypeOfCustomer = function(cutomer) {
                    loaikhachhangApi.get_by_id(cutomer.LoaiKHId).then(function(response) {
                        if(response.data.result) {
                            cutomer.LoaiKH = response.data.data;
                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function(error) {
                        commonService.handlError(error.data);
                    });
                }

                // người tạo

                this.getNguoitao = function(hopdong) {
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

                // nguoi cap nhat
                this.getNguoicapnhat = function(hopdong) {
                    userApi.get_by_id(hopdong.Nguoicapnhat).then(function(response) {
                        if(response.data.result) {
                            hopdong.NguoicapnhatName = response.data.data.Hovaten;
                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function(error) {
                        commonService.handlError(error.data);
                    });
                }

                //get san pham
                this.getSanpham = function(hopdong) {
                    hopdongApi.get_by_id(hopdong.HopdongId).then(function(response) {
                        if(response.data.result) {
                            hopdong.listSanpham = response.data.data.Sanphams;
                            hopdong.listDichvu = response.data.data.Dichvus;
                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function(error) {
                        commonService.handlError(error.data);
                    });
                }
                // end get data...
                
                this.showFilters = function() {
                    self.Hidden = !self.Hidden;
                }
                
                this.delete = function (d1) {
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            hopdongApi.delete([d1.HopdongId]).then(function (rs) {
                                var rs = rs.data;
                                if (rs.result) {
                                    self.loadList();
                                    //show message
                                    commonService.showSuccessMessage('Xóa thành công!');
                                    this.init();
                                }
                                else {
                                    commonService.showWarningMessage(rs.message);
                                }
                            }, function (error) {
                                commonService.handlError(error.data);
                            });
                        }
                    });//sweet confirm          
                }

                // chuyển kỹ thuật
                this.chuyenkythuat = function(hd) {
                    hopdongApi.move_2_tech(hd.HopdongId).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.loadList();
                            //show message
                            commonService.showSuccessMessage('Chuyển thành công!');
                            this.init();
                        }
                        else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.message);
                    });
                }

                this.onSearch = function($event) {
                    if($event.keyCode == 13) {
                        self.filter.Search = self.search;
                        self.loadList();
                    }
                }

                this.onPageChanged = function (pageIndex) {
                    self.filter.Paging.CurrentPage = pageIndex;
                    self.filter.Paging.PageSize = self.pageSize;
                    self.loadList();
                }

                this.onLoad = function() {
                    self.onInit();
                    self.loadList();
                    self.liLoaikhach();
                    self.liNguoixuly();
                    self.liNguonkhach();
                    self.liNhomSP();
                    self.liNhucaugia();
                    self.liThanhpho();
                }
                this.onLoad();

                this.showLoad = function(){
                    userApi.get_my_account().then(function (response) {
                        var response = response.data;
                        if (response.result) {
                            self.profileModel = response.data; 
                            self.onCheckPermission();
                        }
                        else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.showLoad();
            }
        ]
    });