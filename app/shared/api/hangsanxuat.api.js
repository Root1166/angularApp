
angular.module('hangsanxuat.api', ['base.api'])
    .factory('hangsanxuatApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var hangsanxuatApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list hangsanxuats
        hangsanxuatApi.list = function (filter) {
            var urlBase = base_url + '/v1/hangsanxuat/list';
            return $http.post(urlBase, filter, headers);
        };

        //add new hangsanxuat
        hangsanxuatApi.add = function (hangsanxuat) {
            var urlBase = base_url + '/v1/hangsanxuat/add';
            return $http.post(urlBase, hangsanxuat, headers);
        };

        //update hangsanxuat
        hangsanxuatApi.update = function (hangsanxuat) {
            var urlBase = base_url + '/v1/hangsanxuat/update';
            return $http.put(urlBase, hangsanxuat, headers);
        };

        //delete hangsanxuat
        hangsanxuatApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/hangsanxuat/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by hangsanxuat id
        hangsanxuatApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/hangsanxuat/get_by_id?hangsanxuatId=' + id;
            return $http.get(urlBase, headers);
        };

        return hangsanxuatApi;
    }]);
