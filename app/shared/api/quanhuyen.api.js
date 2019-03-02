
angular.module('quanhuyen.api', ['base.api'])
    .factory('quanhuyenApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var quanhuyenApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list quanhuyens
        quanhuyenApi.list = function (filter) {
            var urlBase = base_url + '/v1/quanhuyen/list';
            return $http.post(urlBase, filter, headers);
        };

        //add new quanhuyen
        quanhuyenApi.add = function (quanhuyen) {
            var urlBase = base_url + '/v1/quanhuyen/add';
            return $http.post(urlBase, quanhuyen, headers);
        };

        //update quanhuyen
        quanhuyenApi.update = function (quanhuyen) {
            var urlBase = base_url + '/v1/quanhuyen/update';
            return $http.put(urlBase, quanhuyen, headers);
        };

        //delete quanhuyen
        quanhuyenApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/quanhuyen/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by quanhuyen id
        quanhuyenApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/quanhuyen/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };
		
        return quanhuyenApi;
    }]);