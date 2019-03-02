
angular.module('waste.api', ['base.api'])
    .factory('wasteApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var wasteApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list wastes
        wasteApi.list = function (filter) {
            var urlBase = base_url + '/v1/waste/list';
            return $http.post(urlBase, filter, headers);
        };

        //add new waste
        wasteApi.add = function (waste) {
            var urlBase = base_url + '/v1/waste/add';
            return $http.post(urlBase, waste, headers);
        };

        //update waste
        wasteApi.update = function (waste) {
            var urlBase = base_url + '/v1/waste/update';
            return $http.put(urlBase, waste, headers);
        };

        //delete waste
        wasteApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/waste/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by waste id
        wasteApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/waste/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };
		
        return wasteApi;
    }]);