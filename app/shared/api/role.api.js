angular.module('role.api', ['base.api'])
    .factory('roleApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var roleApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get permissions
        roleApi.list_permissions = function () {
            var urlBase = base_url + '/v1/role/list_permissions';
            return $http.get(urlBase, headers);
        };

        //get list roles
        roleApi.list = function () {
            var urlBase = base_url + '/v1/role/list';
            return $http.get(urlBase, headers);
        };

        //add new role
        roleApi.add = function (role) {
            var urlBase = base_url + '/v1/role/add';
            return $http.post(urlBase, role, headers);
        };

        //update role
        roleApi.update = function (role) {
            var urlBase = base_url + '/v1/role/update';
            return $http.put(urlBase, role, headers);
        };

        //delete role
        roleApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/role/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by role id
        roleApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/role/get_by_id?roleId=' + id;
            return $http.get(urlBase, headers);
        };

        return roleApi;
    }]);