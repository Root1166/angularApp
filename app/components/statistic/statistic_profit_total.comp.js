
angular.module('statistic-profit-total.comp', ['common.srv']).
component('statisticProfitTotal', {
    templateUrl: '/app/components/statistic/statistic_profit_total.tpl.html',
    controller: ['$routeParams', '$scope', '$rootScope', '$location', 'commonService', 'thanhphoApi', 'quanhuyenApi', 'baocaoApi',
        function($routeParams, $scope, $rootScope, $location, commonService, thanhphoApi, quanhuyenApi, baocaoApi) {
            var self = this;
            self.statisticCustomerModels = [];
            self.currentPage = 1;
            self.pageSize = 50;
            self.filter = {
                CityId: undefined,
                DistrictId: undefined,
                Start: undefined,
                End: new Date(),
                Paging: {
                    PageSize: self.pageSize,
                    CurrentPage: self.currentPage,
                }
            }
            this.filterByDate = function(arg1) {
                if (arg1 != undefined) {
                    self.filter.Start = arg1.start;
                    self.filter.End = arg1.end;
                    self.onLoad();
                }
            }
            this.onLoad = function() {
                baocaoApi.reportProfit(self.filter).then(function(response){
                    if (response.data) {
                        self.ProfitModels = response.data.data;
                    } else {
                        commonService.showWarningMessage(response.message);
                    }
                }, function(error) {
                    commonService.handlError(error.data);
                });
            }

            this.onLoad();
            this.searchThanhpho = function(searchText) {
                var filter = {
                    "Search": searchText,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage
                    }
                };
                return thanhphoApi.list(filter).then(function(response) {
                    return response.data.data.list
                });

            }
            this.onSelectThanhpho = function(item) {
                console.log(item);
                if (typeof item == 'object')
                    self.filter.CityId = item.Id;
                else {
                    self.filter.CityId = undefined;
                }
                self.onLoad()
            }
            this.searchQuanhuyen = function(searchText) {
                var filter = {
                    "Search": searchText,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage
                    }
                };
                return quanhuyenApi.list(filter).then(function(response) {
                    return response.data.data.list
                });

            }
            this.onSelectQuanhuyen = function(item) {
                console.log(item);
                if (typeof item == 'object')
                    self.filter.DistrictId = item.Id;
                else {
                    self.filter.DistrictId = undefined;
                }
                self.onLoad()
            }

        }
    ]
});
