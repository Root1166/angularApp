angular.module('baocao.api', ['base.api'])
    .factory('baocaoApi', ['$http', 'baseApi', function($http, baseApi) {
        var headers = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        var baocaoApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;
        // bao cao khach hang
        baocaoApi.reportCustomer = function(filter) {
            var urlBase = base_url + '/v1/baocao/report_customer';
            return $http.post(urlBase, filter, headers);
        };
        //bao cao thong ke theo loi nhuan
        baocaoApi.reportProfit = function(filter) {
            var urlBase = base_url + '/v1/baocao/report_total_profit';
            return $http.post(urlBase, filter, headers);
        };
        // bao cao thi cong
        baocaoApi.reportConstruction = function(filter) {
            var urlBase = base_url + '/v1/baocao/report_construction';
            return $http.post(urlBase, filter, headers);
        };
        // bao cao chi phi
        baocaoApi.reportCost = function(filter) {
            var urlBase = base_url + '/v1/baocao/report_cost';
            return $http.post(urlBase, filter, headers);
        };
        // bao cao khu vực
        baocaoApi.reportRegion = function(filter) {
            var urlBase = base_url + '/v1/baocao/report_region';
            return $http.post(urlBase, filter, headers);
        };
        // báo cáo tiến độ
        baocaoApi.reportProgress = function(filter) {
            var urlBase = base_url + '/v1/baocao/report_progress';
            return $http.post(urlBase, filter, headers);
        };
        //báo cáo chi tiết lợi nhuận
        baocaoApi.reportProfitDetail = function(filter) {
            var urlBase = base_url + '/v1/baocao/report_profit_detail';
            return $http.post(urlBase, filter, headers);
        };
        return baocaoApi;
    }]);
