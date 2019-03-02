
angular.module('customer-list.comp', ['khachhang.api', 'common.srv']).
    component('customerList', {
        templateUrl: '/app/components/customer/list.tpl.html?v=' + APP_VERSION,
        controller: ['$q', '$routeParams', '$scope', '$rootScope', 'uploaderApi', '$location', 'khachhangApi', 'commonService', 'thanhphoApi', 'loaikhachhangApi', 'nguonkhachApi', 'userApi', 'nhucaugiaApi', 'sanphamApi', 'quanhuyenApi',
            function ($q, $routeParams, $scope, $rootScope, uploaderApi, $location, khachhangApi, commonService, thanhphoApi, loaikhachhangApi, nguonkhachApi, userApi, nhucaugiaApi, sanphamApi, quanhuyenApi) {
                var self = this;
                self.status = $routeParams.status;
                self.zone = $routeParams.zone;
                self.iSelected = 0;
                self.currentPage = 1;
                self.pageSize = 50;
                self.IsSaler = true;
                self.isNotSalerMana = true;
                self.isAdmin = false;
                self.Roleid = SYSTEM_ROLES.SalesManagement;
                self.listTaikhoan = [];
                self.Person = CUSTOMER_TYPE.Person;
                self.Company = CUSTOMER_TYPE.Company;
                self.filter = {
                    Search: undefined,
                    Status: undefined,
                    Start: undefined,
                    End: undefined,
                    KinhdoanhNhanId: undefined,
                    NguoitaoId: undefined,
                    CskhId: undefined,
                    ThanhphoId: undefined,
                    QuanhuyenId: undefined,
                    NhucauId: undefined,
                    NguoixulyId: undefined,
                    LoaikhachId: undefined,
                    SanphamQuantamId: undefined,
                    NguonkhachId: undefined,
                    LoaiKhachhang:undefined,
                    Paging: {
                        PageSize: self.pageSize,
                        CurrentPage: self.currentPage
                    }
                };

                switch ($routeParams.status) {
                    case 'new':
                        self.pageTitle = 'DANH SÁCH KH MỚI';
                        self.filter.Status = CUSTOMERSTATUS.NEW;
                        self.ShowTooltip = true;
                        break;
                    case 'send2sale':
                        self.pageTitle = 'D/S KH ĐÃ CHUYỂN SALE';
                        self.filter.Status = CUSTOMERSTATUS.MOVE2SALE;
                        self.ShowTooltip = true;
                        break;
                    case 'send2subsale':
                        self.pageTitle = 'D/S KHÁCH HÀNG';
                        self.filter.Status = CUSTOMERSTATUS.MOVE2SUBSALE;
                        self.ShowTooltip = true;
                        break;
                    case 'converted':
                        self.pageTitle = 'DANH SÁCH KH ĐÃ CHUYỂN ĐỔI';
                        self.filter.Status = CUSTOMERSTATUS.CONVERTED;
                        self.ShowTooltip = true;
                        break;
                    case 'notconvertion':
                        self.pageTitle = 'DANH SÁCH KH KHÔNG CHUYỂN ĐỔI';
                        self.filter.Status = CUSTOMERSTATUS.NOTCONVERRSION;
                        self.ShowTooltip = false;
                        break;
                    case 'received':
                        self.pageTitle = 'DANH SÁCH KH MỚI TIẾP NHẬN';
                        self.filter.Status = CUSTOMERSTATUS.RECEIVED;
                        self.ShowTooltip = true;
                        break;
                    default:
                        self.pageTitle = 'TẤT CẢ';
                        self.ShowTooltip = true;
                        break;
                };

                self.toggleAll = function () {
                    var toggleStatus = self.isAllSelected;
                    angular.forEach(self.listCustomer, function (itm) { itm.selected = toggleStatus; });
                }
                self.onPageChanged = function (pageIndex) {
                    self.filter.Paging.CurrentPage = pageIndex;
                    self.filter.Paging.PageSize = self.pageSize;
                    self.loadData();
                }
                // load master data
                self.loadData = function () {
                    var action = undefined;
                    switch (self.filter.Status) {
                        case CUSTOMERSTATUS.NEW:
                            action = khachhangApi.list_new;
                            break;

                        case CUSTOMERSTATUS.MOVE2SALE:
                            action = khachhangApi.list_send2sale;
                            break;

                        case CUSTOMERSTATUS.MOVE2SUBSALE:
                            action = khachhangApi.list_send2subsale;
                            break;

                        case CUSTOMERSTATUS.CONVERTED:
                            action = khachhangApi.list_converted;
                            break;

                        case CUSTOMERSTATUS.NOTCONVERRSION:
                            action = khachhangApi.list_not_convertion;
                            break;

                        case CUSTOMERSTATUS.RECEIVED:
                            action = khachhangApi.list_received;
                            break;
                    }


                    action(self.filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.listCustomer = rs.data.list;
                            self.totalRowCount = rs.data.pager.RowsCount;
                            self.listCustomer.forEach(function (item) {
                                var promises = {
                                    Nhucaugia: khachhangApi.get_by_idNCG(item.KhachhangId),
                                    Sanphamquantam: khachhangApi.get_sanpham_quantams(item.KhachhangId),
                                    Nguoitao: userApi.get_by_id(item.Nguoitao)
                                }
                                if (item.SubSalerId) {
                                    promises.NguoiPhutrach = userApi.get_by_id(item.SubSalerId);
                                }
                                if (item.ThanhphoId) {
                                    promises.Thanhpho = thanhphoApi.get_by_id(item.ThanhphoId);
                                }
                                if (item.LoaiKHId) {
                                    promises.LoaiKH = loaikhachhangApi.get_by_id(item.LoaiKHId);
                                }
                                if (item.NguonkhachId) {
                                    promises.Nguonkhach = nguonkhachApi.get_by_id(item.NguonkhachId);
                                }
                                if (item.Nguoicapnhat) {
                                    promises.Nguoicapnhat = userApi.get_by_id(item.Nguoicapnhat);
                                }
                                $q.all(promises).then(function (response) {
                                    if (response.Nhucaugia.data.result && response.Sanphamquantam.data.result &&
                                        response.Nguoitao.data.result) {
                                        if (item.ThanhphoId) {
                                            item.Thanhpho = response.Thanhpho.data.data;
                                        }
                                        if (item.LoaiKHId) {
                                            item.LoaiKH = response.LoaiKH.data.data;
                                        }
                                        if (item.NguonkhachId) {
                                            item.Nguonkhach = response.Nguonkhach.data.data;
                                        }
                                        if (item.SubSalerId) {
                                            item.NguoiPhutrach = response.NguoiPhutrach.data.data;
                                        }
                                        item.Nhucaugia = response.Nhucaugia.data.data;
                                        item.Sanphamquantam = response.Sanphamquantam.data.data;
                                        item.Nguoitao = response.Nguoitao.data.data;
                                        if (item.Nguoicapnhat) {
                                            item.Nguoicapnhat = response.Nguoicapnhat.data.data;
                                        }
                                    } else {
                                        commonService.showWarningMessage(response.message);
                                    }
                                }, function (error) {
                                    commonService.handlError(error.data);
                                });
                            });
                            console.log(self.listCustomer);
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                //end load master data

                // filter
                this.getLists = function () {
                    var filter = {
                        Paging: {
                            PageSize: 100,
                            CurrentPage: 1
                        }
                    };
                    $q.all({
                        Taikhoan: userApi.list(filter),
                        Nhucaugia: nhucaugiaApi.list(filter),
                        Sanpham: sanphamApi.list(filter),
                        LoaiKH: loaikhachhangApi.list(filter),
                        Nguonkhach: nguonkhachApi.list(filter),
                        Thanhpho: thanhphoApi.list(filter)
                    }).then(function (response) {
                        if (response.Thanhpho.data.result && response.LoaiKH.data.result && response.Nguonkhach.data.result && response.Nhucaugia.data.result && response.Sanpham.data.result && response.Taikhoan.data.result) {
                            self.listTaiKhoan = response.Taikhoan.data.data.list;
                            self.listNhucaugia = response.Nhucaugia.data.data.list;
                            self.listSanpham = response.Sanpham.data.data.list;
                            self.listLoaiKH = response.LoaiKH.data.data.list;
                            self.listNguonkhach = response.Nguonkhach.data.data.list;
                            self.listThanhpho = response.Thanhpho.data.data.list;
                            console.log('listTaikhoan', self.listTaikhoan);
                        } else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onSelectKinhDoanh = function (item) {
                    if (item) {
                        self.filter.KinhdoanhNhanId = item.TaikhoanId;
                    } else {
                        self.filter.KinhdoanhNhanId = undefined;
                    }
                    self.loadData();
                }

                this.onSelectNguoitao = function (item) {
                    if (item) {
                        self.filter.NguoitaoId = item.TaikhoanId;
                    } else {
                        self.filter.NguoitaoId = undefined;
                    }
                    self.loadData();
                }

                this.onSelectCSKH = function (item) {
                    if (item) {
                        self.filter.CskhId = item.TaikhoanId;
                    } else {
                        self.filter.CskhId = undefined;
                    }
                    self.loadData();
                }
                this.onSelectNguoixuly = function (item) {
                    if (item) {
                        self.filter.NguoixulyId = item.TaikhoanId;
                    } else {
                        self.filter.NguoixulyId = undefined;
                    }
                    self.loadData();
                }

                this.onSelectThanhpho = function (item) {
                    var filter = {
                        ThanhphoId: undefined,
                        Paging: {
                            PageSize: 100,
                            CurrentPage: 1
                        }
                    };
                    if (item) {
                        self.filter.ThanhphoId = item.Id;
                        filter.ThanhphoId = item.Id;
                    } else {
                        self.filter.ThanhphoId = undefined;
                        filter.ThanhphoId = undefined;
                    }
                    self.loadData();
                    quanhuyenApi.list(filter).then(function (rs) {
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

                this.onSelectQuanhuyen = function (item) {
                    if (item) {
                        self.filter.QuanhuyenId = item.Id;
                    } else {
                        self.filter.QuanhuyenId = undefined;
                    }
                    self.loadData();
                }

                this.onSelectNhucaugia = function (item) {
                    if (item) {
                        self.filter.NhucauId = item.NhucauId;
                    } else {
                        self.filter.NhucauId = undefined;
                    }
                    self.loadData();
                }

                this.onSelectSanphamquantam = function (item) {
                    if (item) {
                        self.filter.SanphamQuantamId = item.SanphamId;
                    } else {
                        self.filter.SanphamQuantamId = undefined;
                    }
                    self.loadData();
                }

                this.onSelectLoaiKH = function (item) {
                    if (item) {
                        self.filter.LoaikhachId = item.LoaiKhachhangId;
                    } else {
                        self.filter.LoaikhachId = undefined;
                    }
                    self.loadData();
                }
                
                this.onSelectDoituong = function(item){
                    if(item){
                        self.filter.LoaiKhachhang = item;
                    }else {
                        self.filter.LoaiKhachhang = undefined;
                    }
                    self.loadData();
                }

                this.onSelectNguonkhach = function (item) {
                    if (item) {
                        self.filter.NguonkhachId = item.NguonKhachId;
                    } else {
                        self.filter.NguonkhachId = undefined;
                    }
                    self.loadData();
                }

                this.onSearch = function ($event) {
                    if ($event.keyCode == 13) {
                        self.filter.Search = self.searchText;
                        self.loadData();
                    }
                }

                this.filterByDate = function (arg1) {
                    if (arg1 != undefined) {
                        self.filter.Start = arg1.start;
                        self.filter.End = arg1.end;
                    }
                    self.loadData();
                }


                self.return2Marketing = function (d1) {
                    commonService.confirmSweet('Chắc chắn chuyển lại cho marketing?', 'Đồng ý?', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            khachhangApi.return_2_marketing(d1.KhachhangId).then(function (rs) {
                                var rs = rs.data;
                                if (rs.result) {
                                    self.filter.Paging.CurrentPage = 1;
                                    self.filter.Paging.PageSize = self.pageSize;
                                    self.loadData(self.filter);

                                    //show message
                                    commonService.showSuccessMessage('Chuyển lại thành công!');
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

                self.delete = function (d1) {
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            khachhangApi.delete([d1.KhachhangId]).then(function (rs) {
                                var rs = rs.data;
                                if (rs.result) {
                                    self.filter.Paging.CurrentPage = 1;
                                    self.filter.Paging.PageSize = self.pageSize;
                                    self.loadData(self.filter);
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

                self.deleteMore = function () {
                    var d1 = [];
                    for (var i = 0; i < self.listCustomer.length; i++) {
                        if (self.listCustomer[i].selected) {
                            d1.push(self.listCustomer[i].KhachhangId);
                        }
                    }
                    if (d1.length < 1) {
                        commonService.showWarningMessage('Yêu cầu chọn khách hàng trước khi xóa.');
                        return false;
                    }
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            khachhangApi.delete(d1).then(function (rs) {
                                var rs = rs.data;
                                if (rs.result) {
                                    self.filter.Paging.CurrentPage = 1;
                                    self.filter.Paging.PageSize = self.pageSize;
                                    self.loadData(self.filter);
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

                // for move2sale
                // click chuyển hàng loạt

                this.move2sales = function () {
                    self.selectedCutormers = [];
                    for (var i = 0; i < self.listCustomer.length; i++) {
                        if (self.listCustomer[i].selected) {
                            self.selectedCutormers.push(self.listCustomer[i].KhachhangId);
                        }
                    }
                    if (self.selectedCutormers.length == 0) {
                        commonService.showWarningMessage('Chưa có khách hàng nào được chọn');
                        return;
                    }
                }
                this.move2subsales = function () {
                    self.selectedCutormers = [];
                    for (var i = 0; i < self.listCustomer.length; i++) {
                        if (self.listCustomer[i].selected) {
                            self.selectedCutormers.push(self.listCustomer[i].KhachhangId);
                        }
                    }
                    if (self.selectedCutormers.length == 0) {
                        commonService.showWarningMessage('Chưa có khách hàng nào được chọn');
                        return;
                    }
                }
                // click only one
                this.move2sale_only = function (item) {
                    self.selectedCutormers = [item.KhachhangId];
                }

                self.save_moveSale = function () {
                    var addSale = undefined;
                    if (self.status == 'received')
                        addSale = khachhangApi.add2subsale;
                    else
                        addSale = khachhangApi.add2sale;

                    self.TaikhoanIds = self.TaikhoanIds.reduce((acc, curr) => acc + curr + ",", "");
                    console.log('1111', self.salerId, self.selectedCutormers, self.TaikhoanIds);
                    addSale({
                        salerId: self.salerId,
                        customerIds: self.selectedCutormers,
                        nhandebietIds: self.TaikhoanIds
                    }).then(function (rs) {

                        var rs = rs.data;
                        if (rs.result) {
                            commonService.showSuccessMessage('Chuyển sale thành công.');
                            self.loadData();
                            $('#selectSale').modal('hide');
                        }
                        else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };
                // end move2sale


                //init auto upload file path
                this.onFileUploaded = function (response) {
                    var res = response;
                    if (res.result) {
                        khachhangApi.customer_import(res.data).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage(rs.message);
                                self.loadData();
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

                self.onFileExport = function () {
                    var a = document.createElement('a');
                    a.href = khachhangApi.customer_export();
                    a.target = '_blank';
                    a.click();
                }

                this.getMyAccount = function () {
                    userApi.get_my_account().then(function (response) {
                        if (response.data.result) {
                            if (response.data.data.Roles != undefined &&
                                response.data.data.Roles.indexOf(";" + SYSTEM_ROLES.SalesManagement + ";") >= 0) {
                                self.Roleid = SYSTEM_ROLES.Salers;
                            }
                            if (response.data.data.Roles != undefined &&
                                response.data.data.Roles.indexOf(";" + SYSTEM_ROLES.Salers + ";") >= 0) {
                                self.isNotSalerMana = false;
                            }
                            if (response.data.data.Roles != undefined &&
                                response.data.data.Roles.indexOf(";" + SYSTEM_ROLES.Administrators + ";") >= 0) {
                                self.isAdmin = true;
                            }
                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                self.init = function () {
                    self.loadData();
                    self.getLists();
                    self.getMyAccount();
                    console.log(self.listTaikhoan);
                }
                self.init();
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
                        self.salerId = item.TaikhoanId;
                    else
                        self.salerId = undefined;
                }
            }
        ]
    });
