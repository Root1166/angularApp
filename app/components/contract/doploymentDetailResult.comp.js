angular.module('doployment-detail-result.comp', ['common.srv']).
    component('doploymentDetailResult', {
        templateUrl: '/app/components/contract/doploymentDetailResult.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'hopdongApi', 'commonService','userApi',
            function ($routeParams, $scope, $rootScope, $location, hopdongApi, commonService,userApi) {
                var self = this;
                             
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
                self.liResult = function () {
                    hopdongApi.list_danhgia_noibos(self.filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liResults = rs.data.list;
                            self.liResults.forEach(element => {
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

                // search by text
                self.search = function ($event) {
                    if($event.keyCode == 13) {
                        self.filter.Search = self.text;
                        self.liResult();
                    } 
                }
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
                    self.liResult();
                }
                // end serch theo ky thuat
                // click add button

                this.add = function() {
                    self.model = {};
                    self.model.HopdongId = $routeParams.id;
                }

                this.edit = function(danhgia) {
                    self.model = danhgia;
                    self.model.Ngaydanhgia = $filter(self.model.Ngaydanhgia,'dd/MM/yyyy');
                }


                self.insert = function () {
                    if (self.model.Id) {
                        hopdongApi.update_danhgia_noibo(self.model).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage('Cập kết quả đánh giá thành công !');
                                self.liResult();
                                self.cancel();
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    } else {
                        hopdongApi.add_danhgia_noibo(self.model).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage('Thêm kết quả đánh giá thành công !');
                                self.liResult();
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
                    $('#tab13').modal('hide');
                }


                self.delete = function (d1) {
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            hopdongApi.remove_danhgia_noibo([d1.Id]).then(function (rs) {
                                var rs = rs.data;
                                if (rs.result) {
                                    self.liResult();
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
                    self.liResult();
                    self.liCustomjoin();
                }
                self.init();
            }
        ]
    });