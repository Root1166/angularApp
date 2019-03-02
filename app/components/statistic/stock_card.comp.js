
angular.module('statistic-stock-card.comp', ['common.srv']).
    component('statisticStockCard', {
        templateUrl: '/app/components/statistic/stock_card.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, commonService) {
                this.stockCardModels = [{
                    SoCT: "ABC123123",
                    Loaithe: "Nhập",
                    Ma: "KF234234",
                    Ten: "Công ty TNHH ABC",
                    Loai: "Khách hàng",
                    Soluong: "200 kg",
                    NgayNX: "3/4/2013",
                    NguoiGN: "Nguyễn Thị A",
                    Kho: "CT",
                    Vitri: "X.01.02"
                }, {
                    SoCT: "ABC123123",
                    Loaithe: "Xuất",
                    Ma: "KF234234",
                    Ten: "Phòng KT",
                    Loai: "BP KT",
                    Soluong: "200 kg",
                    NgayNX: "3/4/2013",
                    NguoiGN: "Nguyễn Thị A",
                    Kho: "CT",
                    Vitri: "X.01.02"
                    }, {
                        SoCT: "ABC123123",
                        Loaithe: "Xuất",
                        Ma: "KF234234",
                        Ten: "Phòng KT",
                        Loai: "BP KT",
                        Soluong: "200 kg",
                        NgayNX: "3/4/2013",
                        NguoiGN: "Nguyễn Thị A",
                        Kho: "CT",
                        Vitri: "X.01.02"
                }, {
                    SoCT: "ABC123123",
                    Loaithe: "Xuất",
                    Ma: "KF234234",
                    Ten: "Phòng KT",
                    Loai: "BP KT",
                    Soluong: "200 kg",
                    NgayNX: "3/4/2013",
                    NguoiGN: "Nguyễn Thị A",
                    Kho: "CT",
                    Vitri: "X.01.02"
                }];
            }
        ]
    });