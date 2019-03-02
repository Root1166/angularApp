
angular.module('unit.api', ['base.api'])
    .factory('unitApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var unitApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list units
        unitApi.list = function (filter) {
            var urlBase = base_url + '/v1/unit/list?search=' + (filter.Search == undefined ? '' : filter.Search);
            return $http.get(urlBase, headers);
        };

        //add new unit
        unitApi.add = function (unit) {
            var urlBase = base_url + '/v1/unit/add';
            return $http.post(urlBase, unit, headers);
        };

        //update unit
        unitApi.update = function (unit) {
            var urlBase = base_url + '/v1/unit/update';
            return $http.put(urlBase, unit, headers);
        };

        //delete unit
        unitApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/unit/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by unit id
        unitApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/unit/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };
		
        return unitApi;
    }]);