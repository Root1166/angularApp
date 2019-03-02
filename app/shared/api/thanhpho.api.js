
angular.module('thanhpho.api', ['base.api'])
    .factory('thanhphoApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var thanhphoApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list thanhphos
        thanhphoApi.list = function (filter) {
            var urlBase = base_url + '/v1/thanhpho/list';
            return $http.post(urlBase, filter, headers);
        };

        //add new thanhpho
        thanhphoApi.add = function (thanhpho) {
            var urlBase = base_url + '/v1/thanhpho/add';
            return $http.post(urlBase, thanhpho, headers);
        };

        //update thanhpho
        thanhphoApi.update = function (thanhpho) {
            var urlBase = base_url + '/v1/thanhpho/update';
            return $http.put(urlBase, thanhpho, headers);
        };

        //delete thanhpho
        thanhphoApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/thanhpho/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by thanhpho id
        thanhphoApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/thanhpho/get_by_id?thanhphoId=' + id;
            return $http.get(urlBase, headers);
        };
		
        return thanhphoApi;
    }]);