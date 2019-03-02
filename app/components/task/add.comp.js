
angular.module('task-add.comp', ['congviec.api', 'common.srv'])
    .component('taskAdd', {
        templateUrl: '/app/components/task/add.tpl.html',
        controller: ['$routeParams', '$scope', '$filter', '$rootScope', 'uploaderApi', '$location', 'congviecApi', 'commonService', 'userApi', 'hopdongApi',
            function ($routeParams, $scope, $filter, $rootScope, uploaderApi, $location, congviecApi, commonService, userApi, hopdongApi) {
                var self = this;
                self.id = $routeParams.id;
                self.status = $routeParams.status;
                self.currentPage = 1;
                self.pageSize = 100;
                self.totalRowCount = 0;
                self.Title = '';
                self.showfile = false;
                self.currentCongviec = {};
                self.HopdongLienquansModel = [];
                self.showNguoithuchien = false;
                if (self.status == 0) {
                    self.Title = 'Thêm mới công việc';
                } else {
                    if (self.status == 1) {
                        self.Title = 'Sửa công việc';
                    } else {
                        self.Title = 'Xem công việc';
                    }
                }
                self.filter = {
                    "Search": ' ',
                    "CongviecId": self.id,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };
                self.liStatus = [{
                    id: TRANG_THAI_CONG_VIEC.CHO_XU_LY,
                    value: "Chờ xử lý",
                },
                {
                    id: TRANG_THAI_CONG_VIEC.DANG_XU_LY,
                    value: "Đang xử lý",
                },
                {
                    id: TRANG_THAI_CONG_VIEC.HOAN_THANH,
                    value: "Hoàn thành",
                },
                ]
                this.searchUser = function (searchText) {
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
                this.onSelectNguoinhan = function (item) {
                    if (typeof item == 'object')
                        self.currentCongviec.NguoithuchienId = item.TaikhoanId;
                    else
                        self.currentCongviec.NguoithuchienId = self.currentCongviec.NguoithuchienId;
                }
                this.getNguoigiaocv = function (id) {
                    userApi.get_by_id(id).then(function (response) {
                        var response = response.data;
                        if (response.result) {
                            self.currentCongviec.Nguoigiaocv = response.data.Hovaten;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                this.getNguoithuchiencv = function (id) {
                    userApi.get_by_id(id).then(function (response) {
                        var response = response.data;
                        if (response.result) {
                            self.currentCongviec.Nguoithuchiencv = response.data.Hovaten;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                if (self.id != 0) {
                    congviecApi.get_by_id(self.id).then(function (cv) {
                        var cv = cv.data;
                        if (cv.result) {
                            self.currentCongviec = cv.data;
                            self.currentCongviec.Deadline = $filter('date')(self.currentCongviec.Deadline, 'dd/MM/yyyy');
                            self.currentCongviec.Ngaybatdau = $filter('date')(self.currentCongviec.Ngaybatdau, 'dd/MM/yyyy');
                            self.getNguoigiaocv(self.currentCongviec.NguoitaoId);
                            self.getNguoithuchiencv(self.currentCongviec.NguoithuchienId);
                            if (self.currentCongviec.HopdongLienquans) {
                                var arr = self.currentCongviec.HopdongLienquans.split(",");
                                self.HopdongLienquans = [];
                                arr.forEach(function (hd) {
                                    self.HopdongLienquans.push(parseInt(hd));
                                    if (hd) {
                                        hopdongApi.get_by_id(parseInt(hd)).then(function (hd1) {
                                            if (hd1.data.length) {
                                                self.HopdongLienquansModel.push(hd1.data.data.Hopdong.SoHD);
                                            }
                                        })
                                    }
                                })
                            }

                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                this.onFileUploaded = function (response) {
                    var res = response;
                    if (res.result) {
                        self.currentCongviec.FileDinhkems = res.data;
                        self.showfile = true;
                    } else {
                        commonService.showWarningMessage(res.message);
                    }
                }
                uploaderApi.initDefault(self.onFileUploaded);
                self.uploader = uploaderApi.uploader;
                self.countComment = 0;
                self.listHopdong = function () {
                    item = {
                        "Paging": {
                            "PageSize": 100,
                            "CurrentPage": 1,
                        }
                    };
                    congviecApi.listHopdong(item).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.listHopdongs = rs.data.list;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                self.insert = function () {
                    if (self.currentCongviec.HopdongLienquans) {
                        self.currentCongviec.HopdongLienquans = self.HopdongLienquans.toString();
                    }
                    if (self.id != undefined && self.id != 0) {
                        congviecApi.update(self.currentCongviec).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                if (self.back) {
                                    $location.path('/task/list/alltask');
                                }
                                self.currentCongviec = {};
                                self.HopdongLienquans = [];
                                commonService.showSuccessMessage('Cập nhật công việc thành công !');
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    } else {
                        congviecApi.add(self.currentCongviec).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                if (self.back) {
                                    $location.path('/task/list/alltask');
                                }
                                self.currentCongviec = {};
                                self.HopdongLienquans = [];
                                commonService.showSuccessMessage('Thêm công việc thành công !');
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    }
                }
                this.getAccountLogin = function () {
                    congviecApi.get_my_account().then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.Login = rs.data;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                // begin send messs
                self.listComments = [];
                this.getItemMess = function () {
                    congviecApi.listComment(self.filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.listComments = rs.data.list;
                            self.listComments.forEach(function functionName(comment) {
                                userApi.get_by_id(comment.NguoitaoId).then(function (nguoitao) {
                                    comment.NguoitaoIdmodel = nguoitao.data.data.Hovaten;
                                    comment.Avatar = nguoitao.data.data.Avatar;
                                })
                            })
                            console.log(self.listComments, "rs.data.list");
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                this.sendMess = function () {
                    self.modelComment.CongviecId = self.id;
                    congviecApi.addComment(self.modelComment).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            commonService.showSuccessMessage('Thêm trao đổi công việc thành công !');
                            self.getItemMess();
                            self.modelComment.NoidungThaoluan = "";
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                this.deleteMess = function (mess) {
                    if (confirm('Chắc chắn xóa?')) {
                        congviecApi.deleteComment([mess.Id]).then(function (response) {
                            var response = response.data;
                            if (response.result) {
                                commonService.showSuccessMessage('Xóa thành công!');
                                self.getItemMess();
                            } else {
                                commonService.showWarningMessage(response.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    }
                }

                this.init = function () {
                    if (self.id != undefined && self.id != 0) {
                        self.getItemMess();
                        this.getAccountLogin();
                    }
                    self.listHopdong();
                }
                this.init();
                this.onEnter = function ($event) {
                    if ($event.keyCode == 13) {
                        self.sendMess();
                    }
                }
            }
        ]
    });
