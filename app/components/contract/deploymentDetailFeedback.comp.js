//lỗi chưa chọn người giao
angular.module('deployment-detail-feedback.comp', ['common.srv']).
    component('deploymentDetailFeedback', {
        templateUrl: '/app/components/contract/deploymentDetailFeedback.tpl.html',
        controller: ['$filter','$routeParams', '$scope', '$rootScope', '$location', 'hopdongApi', 'commonService','userApi',
            function ($filter,$routeParams, $scope, $rootScope, $location, hopdongApi, commonService,userApi) {
                var self = this;
                
                self.cancel = function () {
                    self.model = {};
                    $('#tab12').modal('hide');
                }
                self.currentPage = 1;
                self.pageSize = 50;
            
                self.filter = {
                    HopdongId: $routeParams.id,
                    KythuatId: undefined,
                    Search: undefined,
                    Paging: {
                        PageSize: self.pageSize,
                        CurrentPage: self.currentPage
                    }
                };

                // load master data
                self.liFeedback = function () {
                    hopdongApi.list_phanhois(self.filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liFeedbacks = rs.data.list;
                            self.liFeedbacks.forEach(element => {
                                self.getKythuatvien(element);
                            });
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };

                this.getKythuatvien = function(feedback) {
                    userApi.get_by_id(feedback.KythuatId).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            feedback.Kythuatvien = rs.data;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                // end load master data

                // search
                // search theo text
                this.onSearch = function($event) {
                    if($event.keyCode == 13) {
                        self.filter.Search = self.text;
                        self.liError();
                    }
                }
                // end search theo text
                // search theo kythuat
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
                        self.filter.KythuatId = kythuat.UserId;
                    } else {
                        self.filter.KythuatId = undefined;
                    }
                    self.liFeedback();
                }

                // end serch theo ky thuat
                // end search
                
                // click add button
                this.add = function() {
                    self.model = {};
                    self.model.HopdongId = $routeParams.id;
                }
                
                this.edit = function(feedback) {
                    self.model = feedback;
                    self.model.Ngaythicong = $filter('date')(self.model.Ngaythicong, 'dd/MM/yyyy');
                }
                
                
                self.insert = function () {
                    if (self.model.Id) {
                        hopdongApi.update_phanhoi(self.model).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage('Cập vật tư tham gia thành công !');
                                self.liFeedback();
                                self.cancel();
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    } else {
                        hopdongApi.add_phanhoi(self.model).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage('Thêm vật tư tham gia thành công !');
                                self.liFeedback();
                                self.cancel();
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    }
                }
                
                self.delete = function (d1) {
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            hopdongApi.remove_phanhoi([d1.Id]).then(function (rs) {
                                var rs = rs.data;
                                if (rs.result) {
                                    self.liFeedback();
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
                    self.liFeedback();
                    self.liCustomjoin();
                }
                self.init();
            }
        ]
    });