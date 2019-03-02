
angular.module('nhucaugia.api', ['base.api'])
    .factory('nhucaugiaApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var nhucaugiaApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list nhucaugias
        nhucaugiaApi.list = function (filter) {
            var urlBase = base_url + '/v1/nhucaugia/list';
            return $http.post(urlBase, filter, headers);
        };

        //add new nhucaugia
        nhucaugiaApi.add = function (nhucaugia) {
            var urlBase = base_url + '/v1/nhucaugia/add';
            return $http.post(urlBase, nhucaugia, headers);
        };

        //update nhucaugia
        nhucaugiaApi.update = function (nhucaugia) {
            var urlBase = base_url + '/v1/nhucaugia/update';
            return $http.put(urlBase, nhucaugia, headers);
        };

        //delete nhucaugia
        nhucaugiaApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/nhucaugia/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by nhucaugia id
        nhucaugiaApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/nhucaugia/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };
		
        return nhucaugiaApi;
    }]);