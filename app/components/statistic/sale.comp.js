
angular.module('statistic-sale.comp', ['common.srv']).
    component('statisticSale', {
        templateUrl: '/app/components/statistic/sale.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, commonService) {
                this.stockCardModels = [{
                    Ngaythang: "01/01/2017",
                    Quyen: "158",
                    TenKH: "Nguyễn thị Hồng",
                    Tenhang: "phoi gang",
                    MaCty: "ABC",
                    Dvt: "kg",
                    Khoiluong: "1.250.000",
                    Giaban: "5000",
                },
                {
                    Ngaythang: "01/01/2017",
                    Quyen: "158",
                    TenKH: "Nguyễn thị Hồng",
                    Tenhang: "phoi gang",
                    MaCty: "ABC",
                    Dvt: "kg",
                    Khoiluong: "1.250.000",
                    Giaban: "5000",
                },
                {
                    Ngaythang: "01/01/2017",
                    Quyen: "158",
                    TenKH: "Nguyễn thị Hồng",
                    Tenhang: "phoi gang",
                    MaCty: "ABC",
                    Dvt: "kg",
                    Khoiluong: "1.250.000",
                    Giaban: "5000",
                },
                {
                    Ngaythang: "01/01/2017",
                    Quyen: "158",
                    TenKH: "Nguyễn thị Hồng",
                    Tenhang: "phoi gang",
                    MaCty: "ABC",
                    Dvt: "kg",
                    Khoiluong: "1.250.000",
                    Giaban: "5000",
                }];
            }
        ]
    });
