
angular.module('loaikhachhang.api', ['base.api'])
    .factory('loaikhachhangApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var loaikhachhangApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list loaikhachhangs
        loaikhachhangApi.list = function (filter) {
            var urlBase = base_url + '/v1/loaikhachhang/list';
            return $http.post(urlBase, filter, headers);
        };

        //add new loaikhachhang
        loaikhachhangApi.add = function (loaikhachhang) {
            var urlBase = base_url + '/v1/loaikhachhang/add';
            return $http.post(urlBase, loaikhachhang, headers);
        };

        //update loaikhachhang
        loaikhachhangApi.update = function (loaikhachhang) {
            var urlBase = base_url + '/v1/loaikhachhang/update';
            return $http.put(urlBase, loaikhachhang, headers);
        };

        //delete loaikhachhang
        loaikhachhangApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/loaikhachhang/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by loaikhachhang id
        loaikhachhangApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/loaikhachhang/get_by_id?loaikhachhangId=' + id;
            return $http.get(urlBase, headers);
        };
		
        return loaikhachhangApi;
    }]);