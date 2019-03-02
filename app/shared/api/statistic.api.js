angular.module('statistic.api', ['base.api'])
    .factory('statisticApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var statisticApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        statisticApi.statistic_contract = function () {
            var urlBase = base_url + '/v1/statistic/statistic_contract';
            return $http.get(urlBase, headers);
        };

        statisticApi.statistic_plan = function () {
            var urlBase = base_url + '/v1/statistic/statistic_plan';
            return $http.get(urlBase, headers);
        };

        statisticApi.statistic_purchase = function () {
            var urlBase = base_url + '/v1/statistic/statistic_purchase';
            return $http.get(urlBase, headers);
        };

        statisticApi.statistic_sale = function () {
            var urlBase = base_url + '/v1/statistic/statistic_sale';
            return $http.get(urlBase, headers);
        };

        statisticApi.statistic_stock = function () {
            var urlBase = base_url + '/v1/statistic/statistic_stock';
            return $http.get(urlBase, headers);
        };

        return statisticApi;
    }]);