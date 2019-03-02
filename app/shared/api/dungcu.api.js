
angular.module('dungcu.api', ['base.api'])
    .factory('dungcuApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var dungcuApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list dungcus
        dungcuApi.list = function (filter) {
            var urlBase = base_url + '/v1/dungcu/list';
            return $http.post(urlBase, filter, headers);
        };

        //add new dungcu
        dungcuApi.add = function (dungcu) {
            var urlBase = base_url + '/v1/dungcu/add';
            return $http.post(urlBase, dungcu, headers);
        };

        //update dungcu
        dungcuApi.update = function (dungcu) {
            var urlBase = base_url + '/v1/dungcu/update';
            return $http.put(urlBase, dungcu, headers);
        };

        //delete dungcu
        dungcuApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/dungcu/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by dungcu id
        dungcuApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/dungcu/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };
        //plugin other API 
        //get by TaikhoanId
        dungcuApi.get_by_idTK = function (id) {
            var urlBase = base_url + '/v1/taikhoan/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };
        //get list users
        dungcuApi.listTaiKhoan = function (filter) {
            var urlBase = base_url + '/v1/taikhoan/list';
            return $http.post(urlBase, filter, headers);
        };

        return dungcuApi;
    }]);