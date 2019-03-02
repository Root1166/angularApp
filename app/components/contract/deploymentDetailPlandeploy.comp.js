angular.module('deployment-detail-plandeploy.comp', ['common.srv']).
    component('deploymentDetailPlandeploy', {
        templateUrl: '/app/components/contract/deploymentDetailPlandeploy.tpl.html?v=' + APP_VERSION,
        controller: ['$routeParams', '$scope', '$rootScope', '$location', '$filter', 'hopdongApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, $filter, hopdongApi, commonService) {
                var self = this;
                self.pageSize = 50;
                self.currentPage = 1;
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
                    self.list_kehoachs();
                }

                this.list_kehoachs = function () {
                    hopdongApi.list_kehoachs(self.filter).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liPlanDeploys = rs.data.list;
                            console.log(self.liPlanDeploys);
                            self.totalRowCount = rs.data.pager.RowsCount;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };

                this.search = function (searchTxt) {
                    self.filter.Search = searchTxt;
                    self.list_kehoachs();
                }

                // huy bo ghi ke hoach
                this.cancel = function () {
                    self.model = {};
                }

                // save kế hoạch
                this.insert = function () {
                    self.model.HopdongId = $routeParams.id;
                    if (self.model.Id) {
                        hopdongApi.update_kehoach(self.model).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage('Cập nhật kế hoạch triển khai thành công !');
                                self.list_kehoachs();
                                self.cancel();
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    } else {
                        hopdongApi.add_kehoach(self.model).then(function (rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                commonService.showSuccessMessage('Thêm kế hoạch triển khai thành công !');
                                self.list_kehoachs();
                                self.cancel();
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    }
                }

                // click button Sửa
                self.edit = function (kehoach) {
                    self.model = kehoach;
                    self.model.Batdau = $filter('date')(self.model.Batdau, 'dd/MM/yyyy');
                    self.model.Ketthuc = $filter('date')(self.model.Ketthuc, 'dd/MM/yyyy');
                }

                //click button them thong tin 
                this.add = function () {
                    self.model = {};
                    self.model.HopdongId = $routeParams.id;
                }
                // remove kehoach
                self.delete = function (kehoach) {
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            hopdongApi.remove_kehoach([kehoach.Id]).then(function (rs) {
                                var rs = rs.data;
                                if (rs.result) {
                                    self.list_kehoachs();
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

                this.init = function () {
                    self.list_kehoachs(self.filter);
                }

                this.init();
            }
        ]
    });