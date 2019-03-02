angular.module('sanpham.api', ['base.api'])
.factory('sanphamApi', ['$http', 'baseApi', function ($http, baseApi) {
    var headers = { headers: { 'Content-Type': 'application/json' } };
    var sanphamApi = {};
    var base_url = baseApi.getBaseUri().api_url_base;
    var token = baseApi.getToken();

    $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

    //get list sanphams
    sanphamApi.list = function (filter) {
        var urlBase = base_url + '/v1/sanpham/list';
        return $http.post(urlBase, filter, headers);
    };

    //add new sanpham
    sanphamApi.add = function (sanpham) {
        var urlBase = base_url + '/v1/sanpham/add';
        return $http.post(urlBase, sanpham, headers);
    };

    //update sanpham
    sanphamApi.update = function (sanpham) {
        var urlBase = base_url + '/v1/sanpham/update';
        return $http.put(urlBase, sanpham, headers);
    };

    //delete sanpham
    sanphamApi.delete = function (ids) {
        return $http({
            method: 'DELETE',
            url: base_url + '/v1/sanpham/delete',
            data: ids,
            headers: { 'Content-Type': 'application/json' }
        });
    };

    //get by sanpham id
    sanphamApi.get_by_id = function (id) {
        var urlBase = base_url + '/v1/sanpham/get_by_id?sanphamId=' + id;
        return $http.get(urlBase, headers);
    };
    
    return sanphamApi;
}]);