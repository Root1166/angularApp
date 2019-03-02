
angular.module('phongban.api', ['base.api'])
    .factory('phongbanApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var phongbanApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list phongbans
        phongbanApi.list = function (filter) {
            var urlBase = base_url + '/v1/phongban/list';
            return $http.post(urlBase, filter, headers);
        };

        //add new phongban
        phongbanApi.add = function (phongban) {
            var urlBase = base_url + '/v1/phongban/add';
            return $http.post(urlBase, phongban, headers);
        };

        //update phongban
        phongbanApi.update = function (phongban) {
            var urlBase = base_url + '/v1/phongban/update';
            return $http.put(urlBase, phongban, headers);
        };

        //delete phongban
        phongbanApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/phongban/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by phongban id
        phongbanApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/phongban/get_by_id?phongbanId=' + id;
            return $http.get(urlBase, headers);
        };
		
        return phongbanApi;
    }]);