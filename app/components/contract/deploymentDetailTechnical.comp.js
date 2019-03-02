//chưa rõ phần còn lại còn thừa hay còn thiếu
angular.module('deployment-detail-technical.comp', ['common.srv']).
    component('deploymentDetailTechnical', {
        templateUrl: '/app/components/contract/deploymentDetailTechnical.tpl.html?v=' + APP_VERSION,
        controller: ['$filter', '$routeParams', '$scope', '$rootScope', '$location', 'hopdongApi', 'commonService', 'userApi',
            function ($filter, $routeParams, $scope, $rootScope, $location, hopdongApi, commonService, userApi) {
                var self = this;

                self.currentPage = 1;
                self.pageSize = '50';

                self.filter = {
                    HopdongId: $routeParams.id,
                    NguoitamungId: undefined,
                    Search: undefined,
                    Paging: {
                        PageSize: self.pageSize,
                        CurrentPage: self.currentPage
                    }
                };

                // master data
                self.liTechnical = function () {
                    hopdongApi.list_quyettoans(self.filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liTechnicals = rs.data.list;
                            console.log(self.liTechnicals);
                            self.liTechnicals.forEach(element => {
                                self.getNguoiquettoan(element);
                                self.getNguoiduyetquettoan(element);
                                self.getTongChi(element);
                                //self.getTamung(element);
                                element.Tamung = element.TongTamung;
                            });
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };

                // lay thong tin nguoi quyet toan
                self.getNguoiquettoan = function (quyettoan) {
                    userApi.get_by_id(quyettoan.NguoiQuyettoanId).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            quyettoan.NguoiQuyettoan = rs.data;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                // lay thong tin nguoi duyet quyet toan
                self.getNguoiduyetquettoan = function (quyettoan) {
                    userApi.get_by_id(quyettoan.NguoiDuyetQuyettoanId).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            quyettoan.NguoiDuyetQuyettoan = rs.data;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                // lấy tổng chi
                this.getTongChi = function (quyettoan) {
                    var result = 0;
                    for (i = 0; i < quyettoan.Chiphis.length; i++) {
                        result += quyettoan.Chiphis[i].Sotien;
                    }
                    quyettoan.Tongchi = result;
                }
                // lấy tạm ứng

                this.getTamung = function (quyettoan) {
                    hopdongApi.get_tamung_by_nguoi_quyettoanId(quyettoan.HopdongId,quyettoan.NguoiQuyettoanId).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            if (rs.data) {
                                quyettoan.Tamung = rs.data.Sotien;
                            } else {
                                commonService.showWarningMessage("Đã quyết toán hoặc chưa có tạm ứng");
                            }
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                // end master data
                // search theo text
                self.search = function ($event) {
                    if ($event.keyCode == 13) {
                        self.filter.Search = self.text;
                        self.liTechnical();
                    }
                }

                // search theo nguoi tam ung
                this.liCustomjoin = function () {
                    hopdongApi.list_nhansus(self.filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liCustomjoins = rs.data.list;
                            self.liCustomjoins.forEach(element => {
                                self.getNhansu(element);
                            });
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };

                this.getNhansu = function (nhansu) {
                    userApi.get_by_id(nhansu.UserId).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            nhansu.Hovaten = rs.data.Hovaten;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onSelectNguoitamung = function (nguoitamung) {
                    if (nguoitamung) {
                        self.filter.NguoitamungId = nguoitamung.UserId;
                    } else {
                        self.filter.NguoitamungId = undefined;
                    }
                    self.liTechnical();
                }
                // end search theo nguoi tam ung

                //for modal dialog
                // click add button
                this.add = function () {
                    self.model = {};
                    self.model.HopdongId = $routeParams.id;
                    self.model.Chiphis = [];
                    self.listTaiKhoan();
                }

                // click edit button
                this.edit = function (quyettoan) {
                    self.model = quyettoan;
                    self.model.NgayQuyettoan = $filter('date')(self.model.NgayQuyettoan, 'dd/MM/yyyy');
                    self.listTaiKhoan();
                }

                // load nguoi duyet quyet toan
                self.listTaiKhoan = function () {
                    item = {
                        Paging: {
                            PageSize: 100,
                            CurrentPage: 1
                        }
                    };
                    userApi.list(item).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.listTaiKhoans = rs.data.list;
                        }
                        else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                //  chi phi
                this.addChiphi = function () {
                    self.model.Chiphis.push({});
                }
                this.removeChiphi = function (index) {
                    self.model.Chiphis.splice(index, 1);
                    self.getTongChi(self.model);
                }

                self.listLoaiChiphi = [
                    { id: LOAI_CHI_PHI.Nhan_cong, Name: "Nhân công" },
                    { id: LOAI_CHI_PHI.Di_lai, Name: "Đi lại" },
                    { id: LOAI_CHI_PHI.An_uong, Name: "Ăn uống" },
                    { id: LOAI_CHI_PHI.Nha_nghi, Name: "Nhà nghỉ" },
                    { id: LOAI_CHI_PHI.Khac, Name: "Khác" }
                ];

                //

                self.insert = function () {
                    if (self.model.Id) {
                        hopdongApi.update_quyettoan(self.model).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage('Cập quyết toán kỹ thuật thành công !');
                                self.liTechnical();
                                self.cancel();
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    } else {
                        hopdongApi.add_quyettoan(self.model).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage('Thêm quyết toán kỹ thuật thành công !');
                                self.liTechnical();
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
                    $('#tab10').modal('hide');
                }
                // end for modal dialog
                self.delete = function (d1) {
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            hopdongApi.remove_quyettoan([d1.Id]).then(function (rs) {
                                var rs = rs.data;
                                if (rs.result) {
                                    self.liTechnical();
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
                    self.liTechnical();
                    self.liCustomjoin();
                }
                self.init();
            }
        ]
    });