
angular.module('statistic-production-system.comp', ['common.srv']).
    component('statisticProductionSystem', {
        templateUrl: '/app/components/statistic/production_system.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, commonService) {
                this.stockCardModels = [{
                    Ma: "BĐK",
                    Ten: "Bóng đèn huỳnh quang",
                    T01: "2,501,241,100",                  
                    T02: "2,501,241,100",
                    T03: "2,501,241,100",
                    T04: "2,501,241,100",
                    T05: "2,501,241,100",
                    T06: "2,501,241,100",
                    Total: "2,501,241,100",
                    Congsuat: "20,000,000"
                },
                {
                    Ma: "BĐK",
                    Ten: "Bóng đèn huỳnh quang",
                    T01: "2,501,241,100",
                    T02: "2,501,241,100",
                    T03: "2,501,241,100",
                    T04: "2,501,241,100",
                    T05: "2,501,241,100",
                    T06: "2,501,241,100",
                    Total: "2,501,241,100",
                    Congsuat: "20,000,000"
                },
                {
                    Ma: "BĐK",
                    Ten: "Bóng đèn huỳnh quang",
                    T01: "2,501,241,100",
                    T02: "2,501,241,100",
                    T03: "2,501,241,100",
                    T04: "2,501,241,100",
                    T05: "2,501,241,100",
                    T06: "2,501,241,100",
                    Total: "2,501,241,100",
                    Congsuat: "20,000,000"
                },
                {
                    Ma: "BĐK",
                    Ten: "Bóng đèn huỳnh quang",
                    T01: "2,501,241,100",
                    T02: "2,501,241,100",
                    T03: "2,501,241,100",
                    T04: "2,501,241,100",
                    T05: "2,501,241,100",
                    T06: "2,501,241,100",
                    Total: "2,501,241,100",
                    Congsuat: "20,000,000"
                }];
            }
        ]
    });