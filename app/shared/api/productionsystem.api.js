
angular.module('productionsystem.api', ['base.api'])
    .factory('productionsystemApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var productionsystemApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list productionsystems
        productionsystemApi.list = function (filter) {
            var urlBase = base_url + '/v1/production_system/list';
            return $http.get(urlBase, headers);
        };

        //add new productionsystem
        productionsystemApi.add = function (productionsystem) {
            var urlBase = base_url + '/v1/production_system/add';
            return $http.post(urlBase, productionsystem, headers);
        };

        //update productionsystem
        productionsystemApi.update = function (productionsystem) {
            var urlBase = base_url + '/v1/production_system/update';
            return $http.put(urlBase, productionsystem, headers);
        };

        //delete productionsystem
        productionsystemApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/production_system/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by productionsystem id
        productionsystemApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/production_system/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };
		
        return productionsystemApi;
    }]);