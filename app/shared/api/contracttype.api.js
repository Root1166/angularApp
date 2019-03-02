
angular.module('contracttype.api', ['base.api'])
    .factory('contracttypeApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var contracttypeApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list contracttypes
        contracttypeApi.list = function (filter) {
            var urlBase = base_url + '/v1/contract_type/list';
            return $http.get(urlBase, headers);
        };

        //add new contracttype
        contracttypeApi.add = function (contracttype) {
            var urlBase = base_url + '/v1/contract_type/add';
            return $http.post(urlBase, contracttype, headers);
        };

        //update contracttype
        contracttypeApi.update = function (contracttype) {
            var urlBase = base_url + '/v1/contract_type/update';
            return $http.put(urlBase, contracttype, headers);
        };

        //delete contracttype
        contracttypeApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/contract_type/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by contracttype id
        contracttypeApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/contract_type/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };
		
        return contracttypeApi;
    }]);