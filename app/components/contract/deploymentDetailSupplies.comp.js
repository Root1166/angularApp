angular.module('deployment-detail-supplies.comp', ['common.srv']).
    component('deploymentDetailSupplies', {
        templateUrl: '/app/components/contract/deploymentDetailSupplies.tpl.html',
        controller: ['$filter','$routeParams', '$scope', '$rootScope', '$location', 'hopdongApi', 'commonService','userApi',
            function ($filter,$routeParams, $scope, $rootScope, $location, hopdongApi, commonService,userApi) {
                var self = this;
                
                self.cancel = function () {
                    self.model = {};
                    $('#tab7').modal('hide');
                }
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
                
                self.liSupplie = function () {
                    hopdongApi.list_vattus(self.filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liSupplies = rs.data.list;
                            self.liSupplies.forEach(element => {
                                self.getNguoiGiao(element);
                                self.getNguoiNhan(element);
                            });
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };

                this.getNguoiGiao = function(vattu) {
                    userApi.get_by_id(vattu.NguoigiaoId).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            vattu.nguoiGiao = rs.data;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.getNguoiNhan = function(vattu) {
                    userApi.get_by_id(vattu.NguoinhanId).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            vattu.nguoiNhan = rs.data;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                
                self.search = function (searchText) {
                    self.filter.Search = searchText;
                    self.liSupplie();
                }


                // click edit button
                self.edit = function (vattu) {
                    self.model = vattu;
                    self.model.Ngaygiao = $filter('date')(self.model.Ngaygiao, 'dd/MM/yyyy');
                    self.model.Ngaynhan = $filter('date')(self.model.Ngaynhan, 'dd/MM/yyyy');
                    self.liCustomjoin();
                }

                //  click add button 
                self.add = function () {
                    self.model = {};
                    self.model.HopdongId = $routeParams.id;
                    self.liCustomjoin();
                }

                // xóa
                self.delete = function (d1) {
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            hopdongApi.remove_vattu([d1.Id]).then(function (rs) {
                                var rs = rs.data;
                                if (rs.result) {
                                    self.filter.Paging.CurrentPage = 1;
                                    self.filter.Paging.PageSize = self.pageSize;
                                    self.init();
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

                // for modal dialog

                //
                this.liCustomjoin = function () {
                    var filter = {
                            HopdongId: $routeParams.id,
                            Paging: {
                                PageSize: self.pageSize,
                                CurrentPage: self.currentPage
                            }
                        };
                    hopdongApi.list_nhansus(filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liCustomjoins = rs.data.list;
                            self.liCustomjoins.forEach(element => {
                                self.getTenNhansu(element);
                            });
                            self.totalRowCount = rs.data.pager.RowsCount;
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



                // ghi

                self.insert = function () {
                    if (self.model.Id) {
                        hopdongApi.update_vattu(self.model).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage('Cập vật tư tham gia thành công !');
                                self.liSupplie();
                                self.cancel();
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    } else {
                        hopdongApi.add_vattu(self.model).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage('Thêm vật tư tham gia thành công !');
                                self.liSupplie();
                                self.cancel();
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    }
                }

                self.init = function () {
                    self.liSupplie();
                }
                self.init();
            }
        ]
    });