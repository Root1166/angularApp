
angular.module('contract-edit.comp', [ 'common.srv']).
    component('contractEdit', {
        templateUrl: '/app/components/contract/add.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'hopdongApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, hopdongApi, commonService) {
                var self = this;
                self.status = $routeParams.status;
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };
                self.liKhachhangs = [];
                self.modelContractAdd = {
                    "Hopdong": {
                        "HopdongId": 0,
                        "KhachhangId": 0,
                        "BaogiaId": "",
                        "SoHD": "",
                        "Ngaytao": "",
                        "Nguoitao": 0,
                        "Trigia": 0,
                        "Ngaycapnhat": "",
                        "Nguoicapnhat": "",
                        "Trangthai": 0,
                        "Ghichu": "",
                        "Loai": 0
                    },
                    "Sanphams": [
                        {
                            "Id": 0,
                            "HopdongId": 0,
                            "SanphamId": 0,
                            "Soluong": 0,
                            "Gia": 0,
                            "Thanhtien": 0
                        }
                    ],
                    "Dichvus": [
                        {
                            "Id": 0,
                            "HopdongId": 0,
                            "Dichvu": "",
                            "Soluong": 0,
                            "Gia": 0,
                            "Thanhtien": 0
                        }
                    ]
                };
                this.getItem = function (d1) {
                    hopdongApi.get_by_id(d1).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.modelContractAdd = rs.data;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.liKhachhang = function (d1) {
                    hopdongApi.liKhachhangs(d1).then(function (rs) {
                        var rs = rs.data;
                        if (rs.result) {
                            self.liKhachhangs = rs.data;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.init = function () {
                    this.liKhachhang();
                    this.loadList(self.filter);
                };
                this.init();
                this.getEdit = function (d1) {
                    window.location.replace('#!/contract/edit/' + d1.HopdongId);
                }
                self.insert = function () {

                }
            }
        ]
    });