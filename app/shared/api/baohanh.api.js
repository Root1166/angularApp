
angular.module('baohanh.api', ['base.api'])
    .factory('baohanhApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var baohanhApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        baohanhApi.listSanphamHD = function (id) {
             var urlBase = base_url + '/v1/hopdong/get_san_pham_by_hop_dong_id?hopdongId=' + id;
             return $http.get(urlBase, headers);
         };
        baohanhApi.listSanpham = function (ma_san_pham) {
             var urlBase = base_url + '/v1/hopdong/search_sanpham_datmua?ma_san_pham=' + ma_san_pham;
             return $http.get(urlBase, headers);
         };
        //get list baohanhs
        baohanhApi.list = function (filter) {
            var urlBase = base_url + '/v1/baohanh/list';
            return $http.post(urlBase, filter, headers);
        };

        //add new baohanh
        baohanhApi.add = function (baohanh) {
            var urlBase = base_url + '/v1/baohanh/add';
            return $http.post(urlBase, baohanh, headers);
        };

        //update baohanh
        baohanhApi.update = function (baohanh) {
            var urlBase = base_url + '/v1/baohanh/update';
            return $http.put(urlBase, baohanh, headers);
        };

        //delete baohanh
        baohanhApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/baohanh/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by baohanh id
        baohanhApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/baohanh/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };


        return baohanhApi;
    }]);
