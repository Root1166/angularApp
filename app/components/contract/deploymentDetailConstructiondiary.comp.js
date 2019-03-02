//loi thua truong NguoibaocaoId
//loi thieu Giadoanthicongid, chưa rõ giai đoạn ở đây là như thế nào
//danh sách kỹ thuật chưa báo cáo không biết lấy dữ liệu từ đâu
angular.module('deployment-detail-constructiondiary.comp', ['common.srv']).
    component('deploymentDetailConstructiondiary', {
        templateUrl: '/app/components/contract/deploymentDetailConstructiondiary.tpl.html?v=' + APP_VERSION,
        controller: ['$q', '$filter', '$routeParams', '$scope', '$rootScope', '$location', 'hopdongApi', 'commonService', 'userApi', 'uploaderApi',
            function ($q, $filter, $routeParams, $scope, $rootScope, $location, hopdongApi, commonService, userApi, uploaderApi) {
                let self = this;
                self.currentPage = 1;
                self.pageSize = 50;

                self.filter = {
                    KehoachId: undefined,
                    LoaiCongviec: undefined,
                    Search: undefined,
                    HopdongId: $routeParams.id,
                    Paging: {
                        PageSize: self.pageSize,
                        CurrentPage: self.currentPage
                    }
                };

                this.onLoad = function () {
                    var filter = {
                        HopdongId: $routeParams.id,
                        Paging: {
                            PageSize: self.pageSize,
                            CurrentPage: self.currentPage
                        }
                    };
                    $q.all({
                        nhatky: hopdongApi.list_nhat_ky_thi_congs(filter),
                        nhansu: hopdongApi.list_nhansus(filter)
                    }).then(function (response) {
                        if (response.nhatky.data.result && response.nhansu.data.result) {
                            self.liconstructiondiarys = response.nhatky.data.data.list;
                            self.liCustomjoins = response.nhansu.data.data.list;
                            self.liCustomjoins.forEach(element => {
                                self.getTenNhansu(element);
                            });
                            self.phanloaiNguoiCoBaocao_NguoiChuacoBaocao();
                        } else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                self.liconstructiondiary = function () {
                    hopdongApi.list_nhat_ky_thi_congs(self.filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liconstructiondiarys = rs.data.list;
                            console.log('liconstructiondiary filter', self.filter);
                            console.log('liconstructiondiary', self.liconstructiondiarys);
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

                this.phanloaiNguoiCoBaocao_NguoiChuacoBaocao = function () {
                    self.listNguoicoBaocao = [];
                    self.listNguoiChuacoBaocao = [];
                    for (i = 0; i < self.liCustomjoins.length; i++) {
                        var nguoi = self.liCustomjoins[i];
                        var a = self.liconstructiondiarys.find(function (item) {
                            return item.NguoibaocaoId == nguoi.UserId;
                        });
                        if (a) {
                            self.listNguoicoBaocao.push(nguoi);
                        } else {
                            self.listNguoiChuacoBaocao.push(nguoi);
                        }
                    }
                }

                //
                self.onSearch = function ($event) {
                    if ($event.keyCode == 13) {
                        self.filter.Search = self.text;
                        self.liconstructiondiary();
                    }
                }


                // loc theo giai doan
                self.list_kehoachs = function () {
                    item = {
                        HopdongId: $routeParams.id,
                        Paging: {
                            PageSize: 100,
                            CurrentPage: 1,
                        }
                    };
                    hopdongApi.list_kehoachs(item).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liPlanDeploys = rs.data.list;
                            console.log(self.liPlanDeploys,"fgfsgfs");
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };

                self.onSelectKehoach = function(kehoach) {
                    if(kehoach) {
                        self.filter.KehoachId = kehoach;
                        
                    } else {
                        self.filter.KehoachId = undefined;
                    }
                    self.liconstructiondiary();
                }

                // lọc theo cong việc thực hiện
                self.listLoaiCongviec = [
                    { Id: LOAI_CONG_VIEC.Thoi_gian_di_xe, Name: "Thời gian đi xe" },
                    { Id: LOAI_CONG_VIEC.Thoi_gian_cho_vat_tu, Name: "Thời gian chờ vật tư" },
                    { Id: LOAI_CONG_VIEC.Thoi_gian_chuan_bi_vat_tu, Name: "Thời gian chuẩn bị vật tư" },
                    { Id: LOAI_CONG_VIEC.Thoi_gian_thi_cong, Name: "Thời gian thi công" },
                    { Id: LOAI_CONG_VIEC.Di_tinh, Name: "Đi tỉnh" },
                    { Id: LOAI_CONG_VIEC.Khac, Name: "Khác" }
                ];

                self.onSelectLoaiCongviec = function (loaicongviec) {
                    if (loaicongviec) {
                        self.filter.LoaiCongviec = loaicongviec;
                        console.log(self.filter);
                    } else {
                        self.filter.LoaiCongviec = undefined;
                    }
                    self.liconstructiondiary();
                }

                // click add button
                this.add = function () {
                    self.model = {};
                    self.model.HopdongId = $routeParams.id;
                }

                // click edit button
                this.edit = function (baocao) {
                    console.log(baocao, "baocao 2");
                    self.model = angular.copy(baocao)

                }
                // load ảnh
                //init auto upload file path
                this.onFileUploaded = function (response) {
                    if (response.result) {
                        self.model.AnhDinhkem = response.data;
                    } else {
                        commonService.showWarningMessage(response.message);
                    }
                }
                uploaderApi.initDefault(self.onFileUploaded);
                self.uploader = uploaderApi.uploader;


                this.insert = function () {
                    self.model.Batdau = $filter('date')(self.model.Batdau, "yyyy-MM-dd'T'HH:mm:ss'Z'");
                    self.model.Ketthuc = $filter('date')(self.model.Ketthuc, "yyyy-MM-dd'T'HH:mm:ss'Z'");
                    if (self.model.Id) {
                        hopdongApi.update_nhat_ky_thi_cong(self.model).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage('Cập nhật nhật ký thi công thành công !');
                                self.liconstructiondiary();
                                self.cancel();
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    } else {
                        hopdongApi.add_nhat_ky_thi_cong(self.model).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage('Thêm nhân báo cáo thành công !');
                                self.liconstructiondiary();
                                self.cancel();
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    }
                }

                this.cancel = function () {
                    self.model = {};
                    $('#tab5').modal('hide');
                }


                this.delete = function (d1) {
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            hopdongApi.remove_nhat_ky_thi_cong([d1.Id]).then(function (rs) {
                                var rs = rs.data;
                                if (rs.result) {
                                    commonService.showSuccessMessage('Xóa thành công!');
                                    self.liconstructiondiary();
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

                this.init = function () {
                    self.onLoad();
                    self.list_kehoachs();
                }
                this.init();
            }
        ]
    });
