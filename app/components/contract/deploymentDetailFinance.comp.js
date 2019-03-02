angular.module('deployment-detail-finance.comp', ['common.srv']).
    component('deploymentDetailFinance', {
        templateUrl: '/app/components/contract/deploymentDetailFinance.tpl.html?v=' + APP_VERSION,
        controller: ['$filter','$routeParams', '$scope', '$rootScope', '$location', 'hopdongApi', 'commonService',
            function ($filter,$routeParams, $scope, $rootScope, $location, hopdongApi, commonService) {
                var self = this;
                
                self.currentPage = 1;
                self.pageSize = 50;
                self.filter = {
                    HopdongId: $routeParams.id,
                    Search: undefined,
                    Paging: {
                        PageSize: self.pageSize,
                        CurrentPage: self.currentPage
                    }
                };
                
                // load master data
                self.list_thanhtoans = function () {
                    hopdongApi.list_thanhtoans(self.filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liThanhtoans = rs.data.list;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };
                self.list_dukienthus = function () {
                    hopdongApi.list_dukienthus(self.filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liDukienthus = rs.data.list;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };
                self.list_dukienchis = function () {
                    hopdongApi.list_dukienchis(self.filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liDukienchis = rs.data.list;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };
                self.list_dukienhang_canthiets = function () {
                    hopdongApi.list_dukienhang_canthiets(self.filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liDukienhangcanthiets = rs.data.list;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };

                self.getBaocaoLoinhuan = function() {
                    hopdongApi.bao_cao_loi_nhuan($routeParams.id).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            var t = rs.data;
                            self.BaocaoLoinhuan = t;
                            self.BaocaoLoinhuan.Loinhuan = t.Khoanthu - t.ChiphiNgaycong - t.ChiphiAnUong - t.ChiphiNhaNghi - t.ChiphiDiLai - t.ChiphiKhac;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                // end load masterdata

                // print bao cao loi nhuan
                this.onPrint = function (objectId) {
                    var divToPrint = document.getElementById(objectId);
                    newWin = window.open("");
                    newWin.document.write(divToPrint.outerHTML);
                    newWin.print();
                    newWin.close();
                    //window.print();
                }
                
                // search 
                self.search = function (tab) {
                    self.filter.Search = self.text;
                    switch (tab) {
                        case 1: self.list_thanhtoans(); break;
                        case 2: self.list_dukienthus(); break;
                        case 3: self.list_dukienchis(); break;
                        case 4: self.list_dukienhang_canthiets(); break;
                    }  
                }

                // click edit button

                self.edit = function(tab,item) {
                    switch (tab) {
                        case 1: 
                            self.thanhtoanModel = item;
                            self.thanhtoanModel.Ngaytao = $filter('date')(self.thanhtoanModel.Ngaytao, 'dd/MM/yyyy');
                            break;
                        case 2: self.dukienthuModel = item; break;
                        case 3: self.dukienchiModel = item; break;
                        case 4: 
                            self.dukienhang_canthietModel = item;
                            self.dukienhang_canthietModel.Thoigiancan = $filter('date')(self.dukienhang_canthietModel.Thoigiancan, 'dd/MM/yyyy');
                            break;
                    }
                }

                self.cancel = function(tab) {
                    switch (tab) {
                        case 1: self.thanhtoanModel = {}; break;
                        case 2: self.dukienthuModel = {}; break;
                        case 3: self.dukienchiModel = {}; break;
                        case 4: self.dukienhang_canthietModel = {}; break;
                    }
                }

                self.insert = function (tab) {
                    var promise = {};                    
                    switch(tab) {
                        case 1:
                            if (self.thanhtoanModel.Id) {
                                promise = hopdongApi.update_thanhtoan(self.thanhtoanModel);
                            } else {
                                self.thanhtoanModel.HopdongId = $routeParams.id;
                                promise = hopdongApi.add_thanhtoan(self.thanhtoanModel);
                            }
                            break;
                        case 2:
                            if (self.dukienthuModel.Id) {
                                promise = hopdongApi.update_dukienthu(self.dukienthuModel);
                            } else {
                                self.dukienthuModel.HopdongId = $routeParams.id;
                                promise = hopdongApi.add_dukienthu(self.dukienthuModel);
                            }
                            break;
                        case 3:
                            if (self.dukienchiModel.Id) {
                                promise = hopdongApi.update_dukienchi(self.dukienchiModel);
                            } else {
                                self.dukienchiModel.HopdongId = $routeParams.id;
                                promise = hopdongApi.add_dukienchi(self.dukienchiModel);
                            }
                            break;
                        case 4:
                            if (self.dukienhang_canthietModel.Id) {
                                promise = hopdongApi.update_dukienhang_canthiet(self.dukienhang_canthietModel);
                            } else {
                                self.dukienhang_canthietModel.HopdongId = $routeParams.id;
                                promise = hopdongApi.add_dukienhang_canthiet(self.dukienhang_canthietModel);
                            }
                            break;
                    }
                    promise.then(function(response) {
                        if(response.data.result) {
                            switch (tab) {
                                case 1: self.list_thanhtoans(); break;
                                case 2: self.list_dukienthus(); break;
                                case 3: self.list_dukienchis(); break;
                                case 4: self.list_dukienhang_canthiets(); break;
                            }
                            self.cancel(tab);
                            commonService.showSuccessMessage('Thực hiện thành công!');
                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function(error) {
                        commonService.handlError(error.data);
                    });
                }
                
                self.delete = function (tab, item) {
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            var promise = {};
                            switch (tab) {
                                case 1: promise = hopdongApi.remove_thanhtoan([item.Id]); break;
                                case 2: promise = hopdongApi.remove_dukienthu([item.Id]); break;
                                case 3: promise = hopdongApi.remove_dukienchi([item.Id]); break;
                                case 4: promise = hopdongApi.remove_dukienhang_canthiet([item.Id]); break;
                            }
                            promise.then(function(response) {
                                if(response.data.result) {
                                    switch (tab) {
                                        case 1: self.list_thanhtoans(); break;
                                        case 2: self.list_dukienthus(); break;
                                        case 3: self.list_dukienchis(); break;
                                        case 4: self.list_dukienhang_canthiets(); break;
                                    }
                                    self.cancel(tab);
                                    commonService.showSuccessMessage('Xóa thành công!');
                                } else {
                                    commonService.showWarningMessage(response.data.message);
                                }
                            }, function(error) {
                                commonService.handlError(error.data);
                            });
                        }
                    });//sweet confirm   
                }

                self.init = function () {
                    self.list_thanhtoans();
                    self.list_dukienthus();
                    self.list_dukienchis();
                    self.list_dukienhang_canthiets();
                    self.getBaocaoLoinhuan();
                }
                self.init();
            }
        ]
    });