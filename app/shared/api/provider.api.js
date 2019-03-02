
angular.module('provider.api', ['base.api'])
    .factory('providerApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var providerApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list providers
        providerApi.list = function (filter) {
            var urlBase = base_url + '/v1/provider/list';
            return $http.post(urlBase, filter, headers);
        };

        //add new provider
        providerApi.add = function (provider) {
            var urlBase = base_url + '/v1/provider/add';
            return $http.post(urlBase, provider, headers);
        };

        //update provider
        providerApi.update = function (provider) {
            var urlBase = base_url + '/v1/provider/update';
            return $http.put(urlBase, provider, headers);
        };

        //delete provider
        providerApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/provider/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by provider id
        providerApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/provider/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };
		
        return providerApi;
    }]);