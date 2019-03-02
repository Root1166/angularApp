angular.module('deployment-detail-contractdeploy.comp', [ 'common.srv']).
    component('deploymentDetailContractdeploy', {
        templateUrl: '/app/components/contract/deploymentDetailContractdeploy.tpl.html?v=' + APP_VERSION,
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'hopdongApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, hopdongApi, commonService) {
                var self = this;
                self.tab = $routeParams.tab;
                self.id = $routeParams.id;
                self.model = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };
                self.idSanpham = 0;
                self.get_by_id = function () {
                    hopdongApi.get_by_id(self.id).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.model = rs.data;
                            self.get_by_idKH(self.model.Hopdong.KhachhangId);
                            self.get_by_idTK(self.model.Hopdong.Nguoitao);
                            //if (self.model.Sanphams.length > 0) {
                            //    self.get_by_idSP(self.model.Sanphams[self.idSanpham].SanphamId);
                            //}
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };
                self.get_by_idKH = function (d) {
                    hopdongApi.get_by_idKH(d).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.model.Khachhang = rs.data;

                            if (self.model.Khachhang.DiachiMap != undefined) {
                                var pos = JSON.parse(self.model.Khachhang.DiachiMap);
                                self.model.MapPosition = [pos.lat, pos.lng];
                            }

                            self.get_by_idTP(self.model.Khachhang.ThanhphoId);
                            self.get_by_idQH(self.model.Khachhang.QuanhuyenId);
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };
                self.get_by_idTK = function (d) {
                    hopdongApi.get_by_idTK(d).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.model.Nguoitao = rs.data;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };
                self.get_by_idSP = function (d) {
                    //hopdongApi.get_by_idSP(d).then(function (rs) {
                    //    var rs = rs.data;
                    //    if (rs.result) {
                    //        self.model.Sanphams[self.idSanpham] = rs.data;
                    //        if (self.idSanpham == (self.model.Sanphams.length - 1)) {
                    //            return;
                    //        } else {
                    //            self.idSanpham++;
                    //            self.get_by_idSP(self.model.Sanphams[self.idSanpham].SanphamId);
                    //        }
                    //    } else {
                    //        commonService.showWarningMessage(rs.message);
                    //    }
                    //}, function (error) {
                    //    commonService.handlError(error.data);
                    //});
                };
                self.get_by_idTP = function (d) {
                    hopdongApi.get_by_idTP(d).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.model.Thanhpho= rs.data;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };
                self.get_by_idQH = function (d) {
                    hopdongApi.get_by_idQH(d).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.model.Quanhuyen = rs.data;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                };
                self.init = function () {
                    self.get_by_id();
                }
                self.init();
            }
        ]
    });