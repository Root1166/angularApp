
angular.module('nhomsanpham.api', ['base.api'])
    .factory('nhomsanphamApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var nhomsanphamApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list nhomsanphams
        nhomsanphamApi.list = function (filter) {
            var urlBase = base_url + '/v1/nhomsanpham/list';
            return $http.post(urlBase, filter, headers);
        };

        //add new nhomsanpham
        nhomsanphamApi.add = function (nhomsanpham) {
            var urlBase = base_url + '/v1/nhomsanpham/add';
            return $http.post(urlBase, nhomsanpham, headers);
        };

        //update nhomsanpham
        nhomsanphamApi.update = function (nhomsanpham) {
            var urlBase = base_url + '/v1/nhomsanpham/update';
            return $http.put(urlBase, nhomsanpham, headers);
        };

        //delete nhomsanpham
        nhomsanphamApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/nhomsanpham/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by nhomsanpham id
        nhomsanphamApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/nhomsanpham/get_by_id?NhomsanphamId=' + id;
            return $http.get(urlBase, headers);
        };

        return nhomsanphamApi;
    }]);
