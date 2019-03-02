
angular.module('statistic-stock-waste.comp', ['common.srv']).
    component('statisticStockWaste', {
        templateUrl: '/app/components/statistic/stock_waste.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, commonService) {
                this.stockCardModels = [{
                    Ma: "01.02.04",
                    Ten: "Bùn thải có các TPNH từ quá trình xử lý nước thải",
                    Tonkho: "200 kg",                  
                    Kho: "CT",
                    Vitri: "X.01.02",
                    Ngaynhapkho: "3/4/2013"
                },
                {
                    Ma: "01.02.04",
                    Ten: "Axit thải và chất thải tính axit",
                    Tonkho: "200 kg",
                    Kho: "CT",
                    Vitri: "X.01.02",
                    Ngaynhapkho: "3/4/2013"
                },
                {
                    Ma: "01.02.04",
                    Ten: "KOH, NaOH, NH4OH",
                    Tonkho: "200 kg",
                    Kho: "CT",
                    Vitri: "X.01.02",
                    Ngaynhapkho: "3/4/2013"
                },
                {
                    Ma: "01.02.04",
                    Ten: "Bùn thải có các TPNH từ quá trình xử lý nước thải",
                    Tonkho: "200 kg",
                    Kho: "CT",
                    Vitri: "X.01.02",
                    Ngaynhapkho: "3/4/2013"
                }];
            }
        ]
    });