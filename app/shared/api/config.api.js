angular.module('config.api', ['base.api'])
    .factory('configApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var configApi = {};

        //get config api
        configApi.get_config = function () {
            var urlBase = baseApi.getBaseUri().api_url_base + '/v1/config/get_config';
            
            return $http.get(urlBase, headers);
        };

        //save config api
        configApi.save_config = function (config) {
            var urlBase = baseApi.getBaseUri().api_url_base + '/v1/config/save_config';

            return $http.post(urlBase, config, headers);
        };

        return configApi;
    }]);