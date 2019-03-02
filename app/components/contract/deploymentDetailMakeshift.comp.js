angular.module('deployment-detail-makeshift.comp', ['common.srv']).
    component('deploymentDetailMakeshift', {
        templateUrl: '/app/components/contract/deploymentDetailMakeshift.tpl.html?v=' + APP_VERSION,
        controller: ['$filter','$routeParams', '$scope', '$rootScope', '$location', 'hopdongApi', 'commonService','userApi',
            function ($filter,$routeParams, $scope, $rootScope, $location, hopdongApi, commonService,userApi) {
                var self = this;
                self.pageSize = 50;
                self.currentPage = 1;
                
                self.filter = {
                    NguoitamungId: undefined,
                    HopdongId: $routeParams.id,
                    Search: undefined,
                    Paging: {
                        PageSize: self.pageSize,
                        CurrentPage: self.currentPage
                    }
                };
               
                self.liMakeshift = function () {
                    hopdongApi.list_tamungs(self.filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liMakeshifts = rs.data.list;
                            self.liMakeshifts.forEach(element => {
                                self.getNguoiTamung(element);
                            });
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };

                this.getNguoiTamung = function(tamung) {
                    userApi.get_by_id(tamung.NguoitamungId).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            tamung.NguoiTamung = rs.data;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                // Tìm người chậm quyết toán
                this.listChamQuyettoan = function() {
                    hopdongApi.get_tamung_cham_quyet_toans($routeParams.id).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.listChamQuyettoans = rs.data;
                            self.listChamQuyettoans.forEach(element => {
                                self.getNguoiTamung(element);
                            });
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                // end tìm người chậm quyết toán
                
                // search theo text
                this.onSearch = function($event) {
                    if($event.keyCode == 13) {
                        self.filter.Search = self.text;
                        self.liError();
                    }
                }
                // end search theo text

                
                // search theo người tạm ứng
                this.liCustomjoin = function () {
                    var filter = {
                        HopdongId: $routeParams.id,
                        Paging: {
                            PageSize: 50,
                            CurrentPage: 1
                        }
                    }
                    hopdongApi.list_nhansus(filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liCustomjoins = rs.data.list;
                            self.liCustomjoins.forEach(element => {
                                self.getTenNhansu(element);
                            });
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };

                this.getTenNhansu = function(nhansu) {
                    userApi.get_by_id(nhansu.UserId).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            nhansu.Ten = rs.data.Hovaten;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onSelectNguoiTamung = function(nguoitamung) {
                    if(nguoitamung) {
                        self.filter.NguoitamungId = nguoitamung.UserId;
                    } else {
                        self.filter.NguoitamungId = undefined;
                    }
                    self.liMakeshift();
                }
                // end search theo nguoi tạm ứng
                // list nguoi cho tam ung

                this.listNguoiChoTamung = function () {
                    var filter = {
                        Paging: {
                            PageSize: 50,
                            CurrentPage: 1
                        }
                    }
                    userApi.list(filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.listNguoiChoTamungs = rs.data.list;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };

                // click add button

                this.add = function() {
                    self.model = {};
                    self.model.HopdongId = $routeParams.id;
                    self.listNguoiChoTamung();
                }
                // click edit button
                this.edit = function(tamung) {
                    self.model = tamung;
                    self.model.Ngaytamung = $filter('date')(self.model.Ngaytamung, 'dd/MM/yyyy');
                    self.model.NgayDKQuyettoan = $filter('date')(self.model.NgayDKQuyettoan, 'dd/MM/yyyy');
                    self.listNguoiChoTamung();
                }

                self.insert = function () {
                    if (self.model.Id) {
                        hopdongApi.update_tamung(self.model).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage('Cập nhật tạm ứng thành công !');
                                self.init();
                                self.cancel();
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    } else {
                        hopdongApi.add_tamung(self.model).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage('Thêm tạm ứng thành công !');
                                self.init();
                                self.cancel();
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    }
                }

                self.cancel = function () {
                    self.model = {};
                    $('#tab9').modal('hide');
                }

                self.delete = function (d1) {
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            hopdongApi.remove_tamung([d1.Id]).then(function (rs) {
                                var rs = rs.data;
                                if (rs.result) {
                                    self.liMakeshift();
                                    //show message
                                    commonService.showSuccessMessage('Xóa thành công!');
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


                self.init = function () {
                    self.liMakeshift();
                    self.listChamQuyettoan();
                    self.liCustomjoin();
                }
                self.init();
            }
        ]
    });