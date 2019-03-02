
angular.module('congviec.api', ['base.api'])
    .factory('congviecApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var congviecApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get account login 
        
        congviecApi.get_my_account = function () {
            var urlBase = base_url + '/v1/taikhoan/get_my_account';
            return $http.get(urlBase, headers);
        };

        //get list congviecs
        congviecApi.list = function (filter) {
            var urlBase = base_url + '/v1/congviec/list';
            return $http.post(urlBase, filter, headers);
        };

        //add new congviec
        congviecApi.add = function (congviec) {
            var urlBase = base_url + '/v1/congviec/add';
            return $http.post(urlBase, congviec, headers);
        };

        //update congviec
        congviecApi.update = function (congviec) {
            var urlBase = base_url + '/v1/congviec/update';
            return $http.put(urlBase, congviec, headers);
        };

        //delete congviec
        congviecApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/congviec/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by congviec id
        congviecApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/congviec/get_by_id?congviecId=' + id;
            return $http.get(urlBase, headers);
        };
        //
        //get list users
        congviecApi.listTaiKhoan = function (filter) {
            var urlBase = base_url + '/v1/taikhoan/list';
            return $http.post(urlBase, filter, headers);
        };
        //get by hopdong id
        congviecApi.get_by_idHP = function (id) {
            var urlBase = base_url + '/v1/hopdong/get_by_id?hopdongId=' + id;
            return $http.get(urlBase, headers);
        };
        
        //get by taikhoan id
        congviecApi.get_by_idTK = function (id) {
            var urlBase = base_url + '/v1/taikhoan/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };
        //get list hopdongs
        congviecApi.listHopdong = function (filter) {
            var urlBase = base_url + '/v1/hopdong/list_hop_dongs';
            return $http.post(urlBase, filter, headers);
        };
        //get by hopdong id
        congviecApi.get_by_idHopdong = function (id) {
            var urlBase = base_url + '/v1/hopdong/get_by_id?hopdongId=' + id;
            return $http.get(urlBase, headers);
        };
        // trao doi cong viec
        //get list trao doi cong viec
        congviecApi.listComment = function (filter) {
            var urlBase = base_url + '/v1/traodoicongviec/list';
            return $http.post(urlBase, filter, headers);
        };

        //add new trao doi cong viec
        congviecApi.addComment = function (congviec) {
            var urlBase = base_url + '/v1/traodoicongviec/add';
            return $http.post(urlBase, congviec, headers);
        };

        //update trao doi cong viec
        congviecApi.updateComment = function (congviec) {
            var urlBase = base_url + '/v1/traodoicongviec/update';
            return $http.put(urlBase, congviec, headers);
        };

        //delete trao doi cong viec
        congviecApi.deleteComment = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/traodoicongviec/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by congviec id
        congviecApi.get_by_idComment = function (id) {
            var urlBase = base_url + '/v1/traodoicongviec/get_by_id?traodoicongviecId=' + id;
            return $http.get(urlBase, headers);
        };

        return congviecApi;
    }]);