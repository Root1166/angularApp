angular.module('department.api', ['base.api'])
    .factory('departmentApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var departmentApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list departments
        departmentApi.list = function () {
            var urlBase = base_url + '/v1/department/list';
            return $http.get(urlBase, headers);
        };

        //add new department
        departmentApi.add = function (department) {
            var urlBase = base_url + '/v1/department/add';
            return $http.post(urlBase, department, headers);
        };

        //update department
        departmentApi.update = function (department) {
            var urlBase = base_url + '/v1/department/update';
            return $http.put(urlBase, department, headers);
        };

        //delete department
        departmentApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/department/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by department id
        departmentApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/department/get_by_id?departmentId=' + id;
            return $http.get(urlBase, headers);
        };

        return departmentApi;
    }]);