angular.module('deployment-detail-attachments.comp', ['common.srv']).
    component('deploymentDetailAttachments', {
        templateUrl: '/app/components/contract/deploymentDetailAttachments.tpl.html',
        controller: ['$filter','$routeParams', '$scope', '$rootScope', '$location', 'hopdongApi', 'commonService','userApi','uploaderApi',
            function ($filter, $routeParams, $scope, $rootScope, $location, hopdongApi, commonService,userApi,uploaderApi) {
                var self = this;
                
                self.filter = {
                    NguoiguiId: undefined,
                    Search: undefined,
                    HopdongId: $routeParams.id,
                    Paging: {
                        PageSize: 50,
                        CurrentPage: 1
                    }
                };

                // load master data
                this.onListTailieudinhkem = function() {
                    hopdongApi.list_tailieu_dinhkems(self.filter).then(function(response) {
                        if(response.data.result) {
                            self.list_tailieu_dinhkems = response.data.data.list;
                            self.list_tailieu_dinhkems.forEach(element => {
                                self.getKythuatvien(element);
                                self.getKehoach(element);
                            });
                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function(error) {
                        commonService.handlError(error.data);
                    });
                }

                this.getKythuatvien = function(tailieu) {
                    userApi.get_by_id(tailieu.NguoitaoId).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            tailieu.Nguoitao = rs.data;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.getKehoach = function(tailieu) {
                    hopdongApi.get_ke_hoach_by_id(tailieu.KehoachId).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            tailieu.Kehoach = rs.data;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                // end load master data

                // search theo text
                this.search = function($event) {
                    if($event.keyCode == 13) {
                        self.filter.Search = self.text;
                        self.list_tailieu_dinhkems();
                    }
                }

                // search theo kythuat
                this.liCustomjoin = function () {
                    var filter = {
                            HopdongId: $routeParams.id,
                            Paging: {
                                PageSize: 50,
                                CurrentPage: 1
                            }
                        };
                    hopdongApi.list_nhansus(filter).then(function (rs) {
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

                this.getNhansu = function(nhansu) {
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

                this.onSelectKythuat = function(kythuat) {
                    if(kythuat) {
                        self.filter.NguoitaoId = kythuat.UserId;
                    } else {
                        self.filter.NguoitaoId = undefined;
                    }
                    self.liResult();
                }
                // end serch theo ky thuat

                // click add button 
                this.add = function() {
                    self.model = {};
                    self.model.HopdongId = $routeParams.id;
                    // self.model.AnhCongtrinhs = [];
                    self.list_kehoachs();
                }

                // click edit button
                this.edit = function(tailieu) {
                    self.model = tailieu;
                    self.model.Ngaytao = $filter('date')('self.model.Ngaytao', 'dd/MM/yyyy');
                    self.list_kehoachs();
                }

                this.list_kehoachs = function () {
                    var filter = {
                            HopdongId: $routeParams.id,
                            Paging: {
                                PageSize: 50,
                                CurrentPage: 1
                            }
                        };
                    hopdongApi.list_kehoachs(filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liPlanDeploys = rs.data.list;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };

                //init auto upload file path
            this.onFileUploaded = function (response) {
                if (response.result) {
                    self.model.FileKey = response.data;
                } else {
                    commonService.showWarningMessage(response.message);
                }
            }
            uploaderApi.initDefault(self.onFileUploaded);
            self.uploader = uploaderApi.uploader;

                self.insert = function () {
                    var promise = {}
                    if (self.model.Id) {
                        promise = hopdongApi.update_tailieu_dinhkem(self.model);
                    } else {
                        promise = hopdongApi.add_tailieu_dinhkem(self.model);
                    }
                    promise.then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            commonService.showSuccessMessage('Thực hiện thành công!');
                            self.onListTailieudinhkem();
                            self.cancel();
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                self.cancel = function () {
                    self.model = {};
                    $('#tab11').modal('hide');
                }


                self.delete = function (d1) {
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            hopdongApi.update_tailieu_dinhkem([d1.Id]).then(function (rs) {
                                var rs = rs.data;
                                if (rs.result) {
                                    self.onListTailieudinhkem();
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
                this.onLoad = function() {
                    self.onListTailieudinhkem();
                    self.liCustomjoin();
                }

                this.onLoad();
            }
        ]
    });