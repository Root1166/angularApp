angular.module('user.api', ['base.api'])
    .factory('userApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var userApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list users
        userApi.list = function (filter) {
            var urlBase = base_url + '/v1/taikhoan/list';
            return $http.post(urlBase, filter, headers);
        };

        //add new user
        userApi.add = function (user) {
            var urlBase = base_url + '/v1/taikhoan/add';
            return $http.post(urlBase, user, headers);
        };

        //update user
        userApi.update = function (taikhoan) {
            var urlBase = base_url + '/v1/taikhoan/update';
            return $http.put(urlBase, taikhoan, headers);
        };

        //delete user
        userApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/taikhoan/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //lock user
        userApi.lock = function (id) {
            var urlBase = base_url + '/v1/taikhoan/toggle_lock?Id=' + id;
            return $http.post(urlBase, headers);
        };

        //get by user id
        userApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/taikhoan/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };

        //get current logined user
        userApi.get_my_account = function () {
            var urlBase = base_url + '/v1/taikhoan/get_my_account';
            return $http.get(urlBase, headers);
        };

        //get roles of current logined user
        userApi.get_my_roles = function () {
            var urlBase = base_url + '/v1/taikhoan/get_my_roles';
            return $http.get(urlBase, headers);
        };

        //save current logined user
        userApi.save_my_account = function (user) {
            var urlBase = base_url + '/v1/taikhoan/save_my_account';
            return $http.post(urlBase, user, headers);
        };

        //reset password for user
        userApi.reset_password = function (userId, new_pasword) {
            var urlBase = base_url + '/v1/taikhoan/reset_password?taikhoanId=' + userId + "&newPassword=" + new_pasword;
            return $http.post(urlBase, headers);
        };

        //change password for user
        userApi.change_password = function (old_pasword, new_pasword) {
            var urlBase = base_url + '/v1/taikhoan/change_password?oldPassword=' + old_pasword + '&newPassword=' + new_pasword;
            return $http.post(urlBase, headers);
        };

        return userApi;
    }]);