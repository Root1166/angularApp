
angular.module('city.api', ['base.api'])
    .factory('cityApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var cityApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list citys
        cityApi.list = function (filter) {
            var urlBase = base_url + '/v1/city/list';
            return $http.post(urlBase, filter, headers);
        };

        //add new city
        cityApi.add = function (city) {
            var urlBase = base_url + '/v1/city/add';
            return $http.post(urlBase, city, headers);
        };

        //update city
        cityApi.update = function (city) {
            var urlBase = base_url + '/v1/city/update';
            return $http.put(urlBase, city, headers);
        };

        //delete city
        cityApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/city/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by city id
        cityApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/city/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };
		
        return cityApi;
    }]);