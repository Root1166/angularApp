angular.module('customer-add.comp', ['khachhang.api', 'common.srv', 'base.api'])
    .filter('sumProfit', function () {
        return function (data, key) {
            if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
                return 0;
            }
            var sum = 0;
            for (var i = data.length - 1; i >= 0; i--) {
                if (data[i][key] == null || data[i][key] == '' || data[i][key] == 'undefined') {
                    data[i][key] = 0;
                }
                sum += parseInt(data[i][key]);
            }
            return sum;
        };
    })
    .component('customerAdd', {
        templateUrl: '/app/components/customer/add.tpl.html?v=' + APP_VERSION,
        controller: ['$timeout', '$filter', '$q', '$routeParams', '$scope', '$rootScope', 'uploaderApi', '$location', 'khachhangApi', 'commonService', 'thanhphoApi', 'loaikhachhangApi', 'nguonkhachApi', 'userApi', 'nhucaugiaApi', 'sanphamApi', 'quanhuyenApi', 'nhacungcapApi', 'exportService',
            function ($timeout, $filter, $q, $routeParams, $scope, $rootScope, uploaderApi, $location, khachhangApi, commonService, thanhphoApi, loaikhachhangApi, nguonkhachApi, userApi, nhucaugiaApi, sanphamApi, quanhuyenApi, nhacungcapApi, exportService) {
                var self = this;
                self.id = $routeParams.id;
                self.tab = $routeParams.tab;
                self.goBack = false;
                self.IsSaler = true;
                self.IsSalerMana = true;
                self.Roleid = SYSTEM_ROLES.SalesManagement;
                self.Sendemail = {};
                self.currentPage = 1;
                self.pageSize = '50';
                self.Person = CUSTOMER_TYPE.Person;
                self.Company = CUSTOMER_TYPE.Company;
                self.loadTab = function () {
                    switch ($routeParams.tab) {
                        case "1":
                            document.getElementById('tab1').click();
                            self.clickTab_1();
                            break;
                        case "2":
                            document.getElementById('tab2').click();
                            self.clickTab_2();
                            break;
                        case "3":
                            document.getElementById('tab3').click();
                            self.clickTab_3();
                            break;
                        case "4":
                            document.getElementById('tab4').click();
                            self.clickTab_4();
                            break;
                        case "5":
                            document.getElementById('tab5').click();
                            self.clickTab_5();
                            break;
                        default:
                            document.getElementById('tab1').click();
                            self.clickTab_1();
                            break;
                    }
                }

                // this.export = function(){
                //     angular.element(document).ready(function () {
                //         document.getElementById('fileExport').click();
                //     });
                // }

                this.exportServices = function(){
                    var khachhang = self.modelCustomer;
                    var baogia = self.listExcel;
                    exportService.exportExcel(khachhang, baogia)
                }
                this.exportExcel = function (item) {
                    self.listExcel = angular.copy(item);
                    setTimeout(function () {
                        self.exportServices();
                    }, 1000);
                }
                this.getTriGia = function (item) {
                    var giatriSanpham = 0;
                    for (i = 0; i < item.Sanphams.length; i++) {
                        giatriSanpham += item.Sanphams[i].Thanhtien;
                    }
                    var giatriDichvu = 0;
                    for (i = 0; i < item.Dichvus.length; i++) {
                        giatriDichvu += item.Dichvus[i].Thanhtien;
                    }
                    item.Trigia = giatriDichvu + giatriSanpham;
                }

                self.modelCustomer = {};
                self.modelCustomer.MapPosition = [0.227199, 0.222221];

                self.getCurrentLocation = function (event) {
                    self.modelCustomer.MapPosition = [event.latLng.lat(), event.latLng.lng()];
                }

                self.onAddressChanged = function () {
                    if (self.modelCustomer.Diachi == undefined || self.modelCustomer.Diachi.length < 10) {
                        return;
                    }

                    var geocoder = new google.maps.Geocoder();
                    var location = self.modelCustomer.Diachi != undefined ? self.modelCustomer.Diachi : "Hà Nội";
                    geocoder.geocode({ 'address': location }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                self.modelCustomer.MapPosition = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];
                            } else {
                                console.log('Location not found');
                            }
                        } else {
                            console.log('Geocoder failed due to: ' + status);
                        }
                    });
                }


                this.clickTab_1 = function () {
                    self.getKhachHang();
                    self.showButtons = true;
                    self.getLists();
                    self.activeTab = 1;
                }

                self.trangthaiKH = [
                    { Id: CUSTOMERSTATUS.NEW, value: 'new' },
                    { Id: CUSTOMERSTATUS.MOVE2SALE, value: 'send2sale' },
                    { Id: CUSTOMERSTATUS.CONVERTED, value: 'converted' },
                    { Id: CUSTOMERSTATUS.NOTCONVERRSION, value: 'notconvertion' },
                    { Id: CUSTOMERSTATUS.RECEIVED, value: 'received' }
                ]

                this.onCancel = function () {
                    self.baogiaModel = {};
                    self.Hidden = false;
                }

                this.getKhachHang = function () {
                    if ($routeParams.id) {
                        khachhangApi.get_by_id($routeParams.id).then(function (response) {
                            if (response.data.result) {
                                self.modelCustomer = response.data.data;
                                self.modelCustomer.Ngaysinh = $filter('date')(self.modelCustomer.Ngaysinh, 'dd/MM/yyyy');
                                self.onSelectThanhpho(self.modelCustomer.ThanhphoId);
                                if (self.modelCustomer.ThanhphoId) {
                                    thanhphoApi.get_by_id(self.modelCustomer.ThanhphoId).then(function (res) {
                                        self.modelCustomer.Thanhphos = res.data.data.Title;
                                    })
                                }
                                if (self.modelCustomer.QuanhuyenId) {
                                    thanhphoApi.get_by_id(self.modelCustomer.ThanhphoId).then(function (res) {
                                        self.modelCustomer.Quanhuyens = res.data.data.Title;
                                    })
                                }
                                if (self.modelCustomer.SalerId) {
                                    userApi.get_by_id(self.modelCustomer.SalerId).then(function (response) {
                                        if (response.data.result) {
                                            self.modelCustomer.Sale = response.data.data.Hovaten;
                                        } else {
                                            commonService.showWarningMessage(response.data.message);
                                        }
                                    });
                                }
                                self.NhandebietIdsArray = [];
                                if (self.modelCustomer.NhandebietIds) {
                                    var arr = self.modelCustomer.NhandebietIds.split(",");
                                    arr.forEach(function (item) {
                                        self.NhandebietIdsArray.push(parseInt(item));
                                    });
                                }

                                if (self.modelCustomer.DiachiMap != undefined) {
                                    var pos = JSON.parse(self.modelCustomer.DiachiMap);
                                    self.modelCustomer.MapPosition = [pos.lat, pos.lng];
                                }

                                // xác định status para để quay trở lại danh sách
                                var a = self.trangthaiKH.find(function (item) {
                                    return item.Id == self.modelCustomer.Trangthai;
                                });
                                if (a) { self.status = a.value };
                            } else {
                                commonService.showWarningMessage(response.data.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    } else {
                        self.modelCustomer = {};
                        self.modelCustomer.Gioitinh = true;
                        self.status = 'new';
                    }
                }


                // để chọn các thông tin liên quan đến khách hàng
                this.getLists = function () {
                    var filter = {
                        Paging: {
                            PageSize: 100,
                            CurrentPage: 1
                        }
                    };
                    $q.all({
                        Taikhoan: userApi.list(filter),
                        LoaiKH: loaikhachhangApi.list(filter),
                        Nguonkhach: nguonkhachApi.list(filter),
                        Thanhpho: thanhphoApi.list(filter)
                    }).then(function (response) {
                        if (response.Thanhpho.data.result && response.LoaiKH.data.result && response.Nguonkhach.data.result && response.Taikhoan.data.result) {
                            self.listTaiKhoan = response.Taikhoan.data.data.list;
                            self.listLoaiKH = response.LoaiKH.data.data.list;
                            self.listNguonkhach = response.Nguonkhach.data.data.list;
                            self.listThanhpho = response.Thanhpho.data.data.list;
                        } else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                this.searchNguoinhan = function (searchText) {

                    var filter = {
                        "Search": searchText,
                        "RoleId": self.Roleid,
                        "Paging": {
                            "PageSize": 50,
                            "CurrentPage": 1,
                        }
                    };
                    return userApi.list(filter).then(function (response) {
                        return response.data.data.list
                    });

                }
                this.onSelectNguoinhan = function (item) {
                    if (typeof item == 'object')
                        self.modelCustomer.SalerId = item.TaikhoanId;
                    else
                        self.modelCustomer.SalerId = undefined;;
                }

                this.onSelectThanhpho = function (ThanhphoId) {
                    quanhuyenApi.list({ ThanhphoId: ThanhphoId, Paging: { PageSize: 100, CurrentPage: 1 } }).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.listQuanHuyen = rs.data.list;
                        }
                        else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                //init auto upload file path
                this.onFileUploaded = function (response) {
                    var res = response;
                    if (res.result) {
                        self.modelCustomer.FileDinhkem = res.data;
                    } else {
                        commonService.showWarningMessage(res.message);
                    }
                }
                uploaderApi.initDefault(self.onFileUploaded);
                self.uploader = uploaderApi.uploader;

                this.saveKhachhang = function () {
                    if (self.modelCustomer.MapPosition != undefined)
                        self.modelCustomer.DiachiMap = JSON.stringify({ lat: self.modelCustomer.MapPosition[0], lng: self.modelCustomer.MapPosition[1] });

                    if (self.NhandebietIdsArray != undefined) {
                        self.modelCustomer.NhandebietIds = self.NhandebietIdsArray.toString();
                    }
                    if (self.modelCustomer.KhachhangId) {
                        var promise = khachhangApi.update(self.modelCustomer);
                    } else {
                        var promise = khachhangApi.add(self.modelCustomer);
                        //console.log(self.modelCustomer);
                    }
                    promise.then(function (response) {
                        if (response.data.result) {
                            if (self.goBack) {
                                window.history.back();
                            }
                            commonService.showSuccessMessage('Lưu khách hàng thành công!');
                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.clickTab_2 = function () {
                    self.getNhucaugia();
                    self.showButtons = false;
                    self.activeTab = 2;
                }
                this.getNhucaugia = function () {
                    $q.all({
                        list: nhucaugiaApi.list({ Paging: { PageSize: 50, CurrentPage: 1 } }),
                        by_customer: khachhangApi.get_by_idNCG($routeParams.id)
                    })
                        .then(function (response) {
                            if (response.list.data.result && response.by_customer.data.result) {
                                self.listNhucaugia = response.list.data.data.list;
                                self.NhucaugiaModel = response.by_customer.data.data;
                                self.listNhucaugia.forEach(element => {
                                    var a = self.NhucaugiaModel.find(function (item) {
                                        return element.NhucauId == item.NhucaugiaId;
                                    });
                                    if (a) {
                                        element.isSelected = true;
                                    } else {
                                        element.isSelected = false;
                                    }
                                });
                            } else {
                                commonService.showWarningMessage(response.data.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                }
                this.selectNhucaugia = function (item) {
                    var nhucauIds = [];
                    self.listNhucaugia.forEach(function (item) {
                        if (item.isSelected) {
                            nhucauIds.push(item.NhucauId);
                        }
                    });
                    if (nhucauIds.length == 0) {
                        commonService.showWarningMessage('Không có nhu cầu giá nào được chọn!')
                    } else {
                        khachhangApi.save_nhu_cau($routeParams.id, nhucauIds).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage('Cập nhật thông tin nhu cầu thành công!');
                            }
                            else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    }
                }
                self.clickTab_3 = function () {
                    self.onListSanpham();
                    self.get_sanpham_quantams();
                    self.showButtons = false;
                    self.activeTab = 3;
                }
                self.filterSanpham = {
                    Search: undefined,
                    Paging: { PageSize: 100, CurrentPage: 1 }
                }

                this.onListSanpham = function () {
                    sanphamApi.list(self.filterSanpham).then(function (response) {
                        if (response.data.result) {
                            self.listSanpham = response.data.data.list;
                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onSearchSanpham = function ($event) {
                    if ($event.keyCode == 13) {
                        self.filterSanpham.Search = self.searchText;
                        self.onListSanpham();
                    }
                }

                // remove san pham quan tam
                this.removeSanpham = function (item) {
                    khachhangApi.remove_sanpham_quantam([item.Id]).then(function (response) {
                        if (response.data.result) {
                            self.get_sanpham_quantams();
                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                // them san pham quan tam

                this.addSanpham = function (item) {
                    var sanphamExist = self.SanphamquantamModel.find(function (sp) {
                        return item.SanphamId === sp.SanphamId;
                    });
                    if (sanphamExist) {
                        commonService.showWarningMessage('Sản phẩm đã chọn!');
                    } else {
                        khachhangApi.add_sanpham_quantam([item.SanphamId], $routeParams.id).then(function (response) {
                            if (response.data.result) {
                                // load lại sản phẩm quan tâm
                                self.get_sanpham_quantams();
                            } else {
                                commonService.showWarningMessage(response.data.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    }
                }

                // get san pham quan tam
                this.get_sanpham_quantams = function () {
                    khachhangApi.get_sanpham_quantams($routeParams.id).then(function (response) {
                        if (response.data.result) {
                            self.SanphamquantamModel = response.data.data;
                            self.SanphamquantamModel.forEach(function (item) {
                                sanphamApi.get_by_id(item.SanphamId).then(function (response) {
                                    item.AnhSanpham = response.data.data.AnhSanpham;
                                    item.Mota = response.data.data.Mota;
                                });
                            });
                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                // end for tab san pham quan tam

                // for tu van
                // get list tu van

                self.clickTab_4 = function () {
                    self.onListTuvan();
                    self.get_sanpham_quantams();
                    self.showButtons = false;
                    self.activeTab = 4;
                }

                self.filterTuvan = {
                    Search: undefined,
                    CustomerId: $routeParams.id,
                    Paging: { PageSize: 100, CurrentPage: 1 }
                }

                this.onListTuvan = function () {
                    khachhangApi.get_tu_vans(self.filterTuvan).then(function (response) {
                        if (response.data.result) {
                            self.listTuvan = response.data.data.list;
                            self.listTuvan.forEach(function (item) {
                                item.HanXulyFull = item.HanXuly;

                                sanphamApi.get_by_id(item.SanphamTuvanId).then(function (response) {
                                    if (response.data.result) {
                                        item.Sanpham = response.data.data;
                                    }
                                });

                                if (item.Nguoitao != undefined)
                                    userApi.get_by_id(item.Nguoitao).then(function (response) {
                                        if (response.data.result) {
                                            item.NguoitaoModel = response.data.data;
                                        }
                                    });

                                if (item.NguoiXulyId != undefined)
                                    userApi.get_by_id(item.NguoiXulyId).then(function (response) {
                                        if (response.data.result) {
                                            item.nguoixuly = response.data.data;
                                        }
                                    });
                            });
                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onSearchTuvan = function ($event) {
                    if ($event.keyCode == 13) {
                        self.filterTuvan.Search = self.searchText;
                        self.onListTuvan();
                    }
                }

                self.tuvanModel = { KhachhangId: $routeParams.id };
                this.getTuvan = function (item) {
                    self.tuvanModel = item;
                    self.tuvanModel.Ngaytao = $filter('date')(self.tuvanModel.Ngaytao, 'dd/MM/yyyy');
                    var backup = self.tuvanModel.HanXuly;
                    self.tuvanModel.HanXuly = $filter('date')(backup, 'MM/dd/yyyy');
                    self.tuvanModel.HanXulyTime = $filter('date')(backup, 'h:mm a');
                }

                this.deleteTuvan = function (item) {
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {

                            khachhangApi.delete_tu_van([item.Id]).then(function (response) {
                                if (response.data.result) {
                                    self.onListTuvan();
                                    commonService.showSuccessMessage('Xóa tư vấn thành công!')
                                } else {
                                    commonService.showWarningMessage(response.data.message);
                                }
                            }, function (error) {
                                commonService.handlError(error.data);
                            });
                        }//if isConfirm
                    });
                }

                this.saveTuvan = function () {
                    self.tuvanModel.Sanpham = undefined;

                    if (self.tuvanModel.Id) {
                        promise = khachhangApi.update_tu_van(self.tuvanModel);
                    } else {
                        promise = khachhangApi.add_tu_van(self.tuvanModel);
                    }
                    promise.then(function (response) {
                        if (response.data.result) {
                            self.onListTuvan();
                            commonService.showSuccessMessage('Lưu tư vấn thành công!');
                            self.tuvanModel = undefined;
                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                // end for tuvan

                // for bao gia

                self.clickTab_5 = function () {
                    self.onListBaogia();
                    self.showButtons = false;
                    self.activeTab = 5;
                }
                self.filterBaogia = {
                    Search: undefined,
                    CustomerId: $routeParams.id,
                    Paging: {
                        PageSize: 50,
                        CurrentPage: 1
                    }
                }
                // this.searchBaogia
                this.onListBaogia = function () {
                    self.getKhachHang();
                    khachhangApi.get_bao_gias(self.filterBaogia).then(function (response) {
                        if (response.data.result) {
                            self.listBaogia = response.data.data.list;
                            self.listBaogia.forEach(function (item) {
                                $q.all({
                                    nguoitao: userApi.get_by_id(item.Nguoitao),
                                    baogia: khachhangApi.get_bao_gia_detail(item.BaogiaId)
                                })
                                    .then(function (response) {
                                        if (response.nguoitao.data.result && response.baogia.data.result) {
                                            item.NguoitaoModel = response.nguoitao.data.data;
                                            item.Baogia = response.baogia.data.data.Baogia;
                                            item.Sanphams = response.baogia.data.data.Sanphams;

                                            item.Dichvus = response.baogia.data.data.Dichvus;
                                            item.Sanphams.forEach(function (sp) {
                                                sanphamApi.get_by_id(sp.SanphamId).then(function (response) {
                                                    if (response.data.result) {
                                                        sp.GiaTrongkho = angular.copy(response.data.data.Giabans[0].Gia);
                                                        sp.Chenhlech = (sp.Gia - sp.GiaTrongkho) / sp.GiaTrongkho;
                                                        if (sp.Chenhlech < 0) {
                                                            sp.GiaChenhlech = "Giảm: " + Math.round(Math.abs(sp.Chenhlech) * 100000) / 1000 + "%";
                                                        }
                                                        else if (sp.Chenhlech > 0) {
                                                            sp.GiaChenhlech = "Tăng: " + Math.round(sp.Chenhlech * 100000) / 1000 + "%";
                                                        }
                                                        else sp.GiaChenhlech = sp.Chenhlech * 100 + "%";

                                                        sp.TenSanpham = response.data.data.TenSanpham;
                                                        sp.MaSanpham = response.data.data.MaSanpham;
                                                        sp.Mota = response.data.data.Mota;
                                                        sp.AnhSanpham = response.data.data.AnhSanpham;
                                                        sp.Thongtinsp = "Sản phẩm: " + sp.TenSanpham + " \n \ " + "- " + sp.Mota;

                                                        sp.NhacungcapId = response.data.data.NhacungcapId;
                                                        if (sp.NhacungcapId) {
                                                            nhacungcapApi.get_by_id(sp.NhacungcapId).then(function (res) {
                                                                sp.Nhacungcap = res.data.data.TenNhacungcap;
                                                            })
                                                        }
                                                    }
                                                });
                                            });
                                            self.getTriGia(item);

                                        }
                                    });
                            });
                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onSearchBaogia = function () {
                    if (!self.tab5search) {
                        self.tab5search = undefined;
                    }
                    self.filterBaogia.Search = self.tab5search;
                    self.onListBaogia()
                }

                // click them bao gia
                this.addBaogia = function () {
                    self.baogiaModel = {
                        Baogia: { KhachhangId: $routeParams.id },
                        Sanphams: [],
                        Dichvus: []
                    };
                }
                // click sua bao gia
                this.editBaogia = function (item) {
                    self.baogiaModel = angular.copy(item);
                }

                self.selectSanpham = function (item) {
                    var sanphamExist = self.baogiaModel.Sanphams.find(function (a) {
                        return item.SanphamId === a.SanphamId;
                    });
                    if (sanphamExist) {
                        commonService.showWarningMessage('Sản phâm đã đươc chọn!');
                    } else {
                        self.baogiaModel.Sanphams.push(item);
                    }
                }

                self.removeSanphamFromBaogia = function (index) {
                    self.baogiaModel.Sanphams.splice(index, 1);
                }

                // click them dich vu
                this.addDichvu = function () {
                    self.dichvuModel = {};
                }

                // click edit dich vu

                this.editDichvu = function (item) {
                    self.dichvuModel = item;
                }
                this.saveDichvu = function () {
                    if (!self.dichvuModel.Id) {
                        self.baogiaModel.Dichvus.push(self.dichvuModel);
                    }
                    self.dichvuModel = undefined;
                }

                this.removeDichvuFromBaogia = function (index) {
                    self.baogiaModel.Dichvus.splice(index, 1);
                }

                this.saveBaogia = function () {
                    khachhangApi.save_bao_gia(self.baogiaModel).then(function (response) {
                        if (response.data.result) {
                            self.onListBaogia();
                            commonService.showSuccessMessage('Lưu báo giá thành công!');
                            $scope.dismiss();
                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                // click
                // end bao gia

                this.init = function () {
                    userApi.get_my_account().then(function (response) {
                        if (response.data.result) {
                            if (response.data.data.Roles != undefined &&
                                response.data.data.Roles.indexOf(";" + SYSTEM_ROLES.Salers + ";") >= 0) {
                                self.IsSaler = false;
                                self.IsSalerMana = false;
                                self.modelCustomer.SubSalerId = response.data.data.TaikhoanId;
                            }
                            if (response.data.data.Roles != undefined &&
                                response.data.data.Roles.indexOf(";" + SYSTEM_ROLES.SalesManagement + ";") >= 0) {
                                self.Roleid = SYSTEM_ROLES.Salers;
                                self.IsSaler = false;
                                self.modelCustomer.SalerId = response.data.data.TaikhoanId
                            }
                            if (response.data.data.Roles != undefined &&
                                response.data.data.Roles.indexOf(";" + SYSTEM_ROLES.Administrators + ";") >= 0) {
                                self.IsAdmin = true;
                            }

                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                    this.searchNguoinhanMail = function (searchText) {
                        var filter = {
                            "Search": searchText,
                            "Paging": {
                                "PageSize": self.pageSize,
                                "CurrentPage": self.currentPage,
                            }
                        };
                        return userApi.list(filter).then(function (response) {
                            return response.data.data.list
                        });

                    }
                    this.onSelectNguoinhanMail = function (item) {
                        if (typeof item == 'object')
                            self.EmailNoibo = item.Email;
                        else
                            self.EmailNoibo = '';
                    }
                    this.onNguoinhanMail = function (item) {
                        self.EmailKhach = self.modelCustomer.Email;
                        self.Sendemail.BaogiaId = item.BaogiaId;
                    }
                    this.onSendemail = function () {
                        if (self.Emailvalue == 'Khach') {
                            self.Sendemail.EmailReceiver = self.EmailKhach;
                        }
                        if (self.Emailvalue == 'Noibo') {
                            self.Sendemail.EmailReceiver = self.EmailNoibo;
                        }
                        khachhangApi.send_email(self.Sendemail).then(function (response) {
                            if (response.data.result) {
                                self.Sendemail = {};
                                angular.element(document).ready(function () {
                                    $('#closeDialog').click();
                                });
                                commonService.showSuccessMessage('Gửi mail thành công!');
                            } else {
                                commonService.showWarningMessage(response.data.message);
                            }
                        })
                    }
                    self.loadTab();

                    // self.getLists();
                }
                this.init();
            }
        ]
    });
