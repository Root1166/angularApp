
angular.module('product.api', ['base.api'])
    .factory('productApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var productApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;
        // danh sach san pham
        productApi.listSanpham = function (filter) {
           var urlBase = base_url + '/v1/sanpham/list';
           return $http.post(urlBase, filter, headers);
       };
        // get san pham theo sanphamId
        productApi.get_by_id = function (id) {
             var urlBase = base_url + '/v1/sanpham/get_by_id?sanphamId=' + id;
             return $http.get(urlBase, headers);
         };

        //add new sanpham
        productApi.add = function (product) {
            var urlBase = base_url + '/v1/sanpham/add';
            return $http.post(urlBase, product, headers);
        };

        //update sanpham
        productApi.update = function (baohanh) {
            var urlBase = base_url + '/v1/sanpham/update';
            return $http.put(urlBase, baohanh, headers);
        };

        //delete sanpham
        productApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/sanpham/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };
        //export data
        productApi.product_export = function () {
            return urlBase = base_url + '/v1/sanpham/export';
        };
        //export data
        productApi.product_import = function (d1) {
            var urlBase = base_url + '/v1/sanpham/import?fileKey=' + d1;
            return $http.post(urlBase, '', headers);
        }
        return productApi;
    }]);
