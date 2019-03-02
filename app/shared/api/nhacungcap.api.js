
angular.module('nhacungcap.api', ['base.api'])
    .factory('nhacungcapApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var nhacungcapApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list nhacungcaps
        nhacungcapApi.list = function (filter) {
            var urlBase = base_url + '/v1/nhacungcap/list';
            return $http.post(urlBase, filter, headers);
        };

        //add new nhacungcap
        nhacungcapApi.add = function (nhacungcap) {
            var urlBase = base_url + '/v1/nhacungcap/add';
            return $http.post(urlBase, nhacungcap, headers);
        };

        //update nhacungcap
        nhacungcapApi.update = function (nhacungcap) {
            var urlBase = base_url + '/v1/nhacungcap/update';
            return $http.put(urlBase, nhacungcap, headers);
        };

        //delete nhacungcap
        nhacungcapApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/nhacungcap/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by nhacungcap id
        nhacungcapApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/nhacungcap/get_by_id?NhacungcapId=' + id;
            return $http.get(urlBase, headers);
        };

        return nhacungcapApi;
    }]);
