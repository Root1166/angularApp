
angular.module('statistic-production-waste.comp', ['common.srv']).
    component('statisticProductionWaste', {
        templateUrl: '/app/components/statistic/production_waste.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, commonService) {
                this.stockCardModels = [{
                    Ma: "01.01.02",
                    Ten: "Bóng đèn huỳnh quang",
                    Hethong: "BĐK",
                    Tong: "20,000,000"
                },
                {
                    Ma: "01.01.02",
                    Ten: "Bóng đèn huỳnh quang",
                    Hethong: "BĐK",
                    Tong: "20,000,000"
                },
                {
                    Ma: "01.01.02",
                    Ten: "Bóng đèn huỳnh quang",
                    Hethong: "BĐK",
                    Tong: "20,000,000"
                },
                {
                    Ma: "01.01.02",
                    Ten: "Bóng đèn huỳnh quang",
                    Hethong: "BĐK",
                    Tong: "20,000,000"
                }];
            }
        ]
    });