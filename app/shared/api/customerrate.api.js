
angular.module('customerrate.api', ['base.api'])
    .factory('customerrateApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var customerrateApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list customerrates
        customerrateApi.list = function (filter) {
            var urlBase = base_url + '/v1/customer_rate/list';
            return $http.get(urlBase, headers);
        };

        //add new customerrate
        customerrateApi.add = function (customerrate) {
            var urlBase = base_url + '/v1/customer_rate/add';
            return $http.post(urlBase, customerrate, headers);
        };

        //update customerrate
        customerrateApi.update = function (customerrate) {
            var urlBase = base_url + '/v1/customer_rate/update';
            return $http.put(urlBase, customerrate, headers);
        };

        //delete customerrate
        customerrateApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/customer_rate/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by customerrate id
        customerrateApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/customer_rate/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };
		
        return customerrateApi;
    }]);