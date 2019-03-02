
angular.module('warehouselocation.api', ['base.api'])
    .factory('warehouselocationApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var warehouselocationApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list warehouselocations
        warehouselocationApi.list = function (filter) {
            var urlBase = base_url + '/v1/ware_house_location/list?search=' + (filter.Search == undefined ? '' : filter.Search);
            return $http.get(urlBase, headers);
        };

        //add new warehouselocation
        warehouselocationApi.add = function (warehouselocation) {
            var urlBase = base_url + '/v1/ware_house_location/add';
            return $http.post(urlBase, warehouselocation, headers);
        };

        //update warehouselocation
        warehouselocationApi.update = function (warehouselocation) {
            var urlBase = base_url + '/v1/ware_house_location/update';
            return $http.put(urlBase, warehouselocation, headers);
        };

        //delete warehouselocation
        warehouselocationApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/ware_house_location/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by warehouselocation id
        warehouselocationApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/ware_house_location/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };
		
        return warehouselocationApi;
    }]);