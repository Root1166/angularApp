angular.module('deployment-detail-contenttask.comp', ['common.srv']).
    component('deploymentDetailContenttask', {
        templateUrl: '/app/components/contract/deploymentDetailContenttask.tpl.html?v=' + APP_VERSION,
        controller: ['$routeParams', '$scope', '$rootScope', '$location','$filter', 'hopdongApi', 'commonService','userApi','uploaderApi',
            function ($routeParams, $scope, $rootScope, $location, $filter, hopdongApi, commonService,userApi, uploaderApi) {
                var self = this;
                self.pageSize = 50;
                self.currentPage = 1;

                self.filter = {
                    Search: undefined,
                    HopdongId: $routeParams.id,
                    Paging: {
                        PageSize: self.pageSize,
                        CurrentPage: self.currentPage,
                    }
                };

                this.onPageChanged = function (pageIndex) {
                    self.filter.Paging.CurrentPage = pageIndex;
                    self.filter.Paging.PageSize = self.pageSize;
                    self.list_giaoviecs();
                }

                self.list_giaoviecs = function () {
                    hopdongApi.list_giaoviecs(self.filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.listCongviec = rs.data.list;
                            self.listCongviec.forEach(element => {
                                self.getNguoiThuchien(element);
                            });
                            self.totalRowCount = rs.data.pager.RowsCount;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };

                this.getNguoiThuchien = function(task) {
                    userApi.get_by_id(task.NguoithuchienId).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            task.nguoiThuchien = rs.data;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.search = function(searchText) {
                    self.filter.Search = searchText;
                    self.list_giaoviecs();
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
                            self.liCustomjoins.forEach(function(item) {
                                self.getTenNhansu(item);
                            });
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
                
                //init auto upload file path
                this.onFileUploaded = function (response) {
                    if (response.result) {
                        self.model.Dinhkem = response.data;
                    } else {
                        commonService.showWarningMessage(response.message);
                    }
                }
                uploaderApi.initDefault(self.onFileUploaded);
                self.uploader = uploaderApi.uploader;

                // click ghi
                self.insert = function () {
                    if (self.model.Id) {
                        hopdongApi.update_giaoviec(self.model).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage('Cập nội dung công việc thành công !');
                                self.list_giaoviecs();
                                self.cancel();
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    } else {
                        hopdongApi.add_giaoviec(self.model).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage('Thêm nội dung công việc thành công !');
                                self.list_giaoviecs();
                                self.cancel();
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    }
                }
                // click hủy
                self.cancel = function () {
                    self.model = {};
                    $('#tab4').modal('hide');
                }

                // click Edit button
                self.edit = function (congviec) {
                    self.model = congviec;
                    self.model.Batdau = $filter('date')(self.model.Batdau,'dd/MM/yyyy');
                    self.model.Ketthuc = $filter('date')(self.model.Ketthuc,'dd/MM/yyyy');
                    self.list_kehoachs();
                    self.liCustomjoin();
                }

                // click Add button 
                self.add = function() {
                    self.model = {};
                    self.model.HopdongId = $routeParams.id;
                    self.list_kehoachs();
                    self.liCustomjoin();
                }

                // delete cong viec
                self.delete = function (congviec) {
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            hopdongApi.remove_giaoviec([congviec.Id]).then(function (rs) {
                                var rs = rs.data;
                                if (rs.result) {
                                    self.list_giaoviecs();
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
                    self.list_giaoviecs();
                }

                this.onLoad();
            }
        ]
    });