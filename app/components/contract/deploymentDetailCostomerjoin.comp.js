angular.module('deployment-detail-costomerjoin.comp', ['common.srv']).
    component('deploymentDetailCostomerjoin', {
        templateUrl: '/app/components/contract/deploymentDetailCostomerjoin.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'hopdongApi', 'commonService','userApi','phongbanApi',
            function ($routeParams, $scope, $rootScope, $location, hopdongApi, commonService,userApi,phongbanApi) {
                var self = this;
                
                self.cancel = function () {
                    self.model = {};
                    $('#tab3').modal('hide');
                }
                self.currentPage = 1;
                self.pageSize = '50';
                
                self.filter = {
                    Search: undefined,
                    HopdongId: $routeParams.id,
                    Paging: {
                        PageSize: self.pageSize,
                        CurrentPage: self.currentPage
                    }
                };

                this.onPageChanged = function (pageIndex) {
                    self.filter.Paging.CurrentPage = pageIndex;
                    self.filter.Paging.PageSize = self.pageSize;
                    self.liCustomjoin();
                }

                this.liCustomjoin = function () {
                    hopdongApi.list_nhansus(self.filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liCustomjoins = rs.data.list;
                            self.liCustomjoins.forEach(element => {
                                self.getNhansu(element);
                            });
                            self.totalRowCount = rs.data.pager.RowsCount;
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
                            nhansu.nhansuModel = rs.data;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
               
                this.search = function (searchText) {
                    self.filter.Search = searchText;
                    self.liCustomjoin();
                }

                this.insert = function () {
                    if (self.model.Id) {
                        hopdongApi.update_nhansu(self.model).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage('Cập nhân sự tham gia thành công !');
                                self.liCustomjoin();
                                self.cancel();
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    } else {
                        hopdongApi.add_nhansu(self.model).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage('Thêm nhân sự tham gia thành công !');
                                self.liCustomjoin();
                                self.cancel();
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    }
                }

                this.listPhongban = function () {
                    phongbanApi.list({Paging: {PageSize:50, CurrentPage: 1}}).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.phongbanModels = rs.data.list;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };

                // click on button Sửa
                this.edit = function (nhansu) {
                    self.model = nhansu;
                    self.listPhongban();
                }

                // click on button add

                this.add = function() {
                    self.model = {};
                    self.model.HopdongId = $routeParams.id;
                    self.listPhongban();
                } 

                this.delete = function (nhansu) {
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            hopdongApi.remove_nhansu([nhansu.Id]).then(function (rs) {
                                var rs = rs.data;
                                if (rs.result) {
                                    self.liCustomjoin();
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

                this.searchNhansu = function (text) {
                    var phongbanId = undefined;

                    if (self.model.Phongban != undefined) {
                        phongbanId = self.model.Phongban.PhongbanId;
                    }

                    return userApi.list({
                        Search: text,
                        PhongbanId: phongbanId,
                        Paging: {
                            PageSize: 20,
                            CurrentPage: 1
                        }
                    });
                }
                
                this.procesNhansu = function (response) {
                    var rs = [];
                    if (response.data.result) {
                        response.data.data.list.forEach(e => {
                            rs.push({
                                id: e.TaikhoanId,
                                text: e.Hovaten
                            });
                        });
                    }
                    return {
                        results: rs
                    };
                }

                this.init = function () {
                    self.liCustomjoin();
                    // self.listPhongban();
                }

                self.init();

            }
        ]
    });