angular.module('deployment-detail-error.comp', ['common.srv']).
    component('deploymentDetailError', {
        templateUrl: '/app/components/contract/deploymentDetailError.tpl.html',
        controller: ['$filter', '$routeParams', '$scope', '$rootScope', '$location', 'hopdongApi', 'commonService', 'userApi', 'uploaderApi',
            function ($filter, $routeParams, $scope, $rootScope, $location, hopdongApi, commonService, userApi, uploaderApi) {
                var self = this;
                self.pageSize = 50;
                self.currentPage = 1;

                self.filter = {
                    KythuatId: undefined,
                    Loailoi: undefined,
                    Search: undefined,
                    HopdongId: $routeParams.id,
                    Paging: {
                        PageSize: self.pageSize,
                        CurrentPage: self.currentPage
                    }
                };

                // load master data
                self.liError = function () {
                    hopdongApi.list_sucos(self.filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liErrors = rs.data.list;
                            self.liErrors.forEach(element => {
                                self.getNguoiThuchien(element);
                            });
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };

                this.getNguoiThuchien = function (suco) {
                    userApi.get_by_id(suco.NguoithuchienId).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            suco.nguoiThuchien = rs.data;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                // end load master data

                // search theo text
                this.onSearch = function ($event) {
                    if ($event.keyCode == 13) {
                        self.filter.Search = self.text;
                        self.liError();
                    }
                }
                // end search theo text

                // search theo loại sự cố
                self.loaiSucos = [
                    {
                        id: SU_CO.Do_khach_hang,
                        value: 'Do khách hàng',
                    },
                    {
                        id: SU_CO.Do_ky_thuat,
                        value: 'Do kỹ thuật',
                    },
                    {
                        id: SU_CO.Khach_quan,
                        value: 'Lỗi khách quan',
                    },
                ];

                this.onSelectLoailoi = function (loailoi) {
                    if (loailoi) {
                        self.filter.Loailoi = loailoi.id;
                    } else {
                        self.filter.Loailoi = undefined;
                    }
                    self.liError();
                }
                // end search theo loai sự cố


                // search theo kỹ thuật viên
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
                            self.liCustomjoins.forEach(element => self.getTenNhansu(element));
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };

                this.getTenNhansu = function (nhansu) {
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

                this.onSelectKythuatvien = function (kythuatvien) {
                    if (kythuatvien) {
                        self.filter.KythuatId = kythuatvien.UserId;
                    } else {
                        self.filter.KythuatId = undefined;
                    }
                    self.liError();
                }
                // end search theo kỹ thuật viên

                // click add button
                this.add = function () {
                    self.model = {};
                    self.model.HopdongId = $routeParams.id;
                }

                // click edit button 
                this.edit = function (suco) {
                    self.model = suco;
                    self.model.ThoidiemXayra = $filter('date')(self.model.ThoidiemXayra, 'dd/MM/yyyy');
                    self.model.ThoidiemKhacphuc = $filter('date')(self.model.ThoidiemKhacphuc, 'dd/MM/yyyy');
                }


                // load ảnh
                this.onFileUploaded = function (response) {
                    if (response.result) {
                        self.model.AnhHientruong = response.data;
                    } else {
                        commonService.showWarningMessage(response.message);
                    }
                }
                uploaderApi.initDefault(self.onFileUploaded);
                self.uploader = uploaderApi.uploader;


                self.insert = function () {
                    if (self.model.Id) {
                        hopdongApi.update_suco(self.model).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage('Cập sự cố tham gia thành công !');
                                self.init();
                                self.cancel();
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    } else {
                        hopdongApi.add_suco(self.model).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage('Thêm sự cố tham gia thành công !');
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
                    $('#tab8').modal('hide');
                }

                self.delete = function (d1) {
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            hopdongApi.remove_suco([d1.Id]).then(function (rs) {
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

                self.init = function () {
                    self.liError();
                    self.liCustomjoin();
                }
                self.init();
            }
        ]
    });