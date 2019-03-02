
angular.module('nguonkhach.api', ['base.api'])
    .factory('nguonkhachApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var nguonkhachApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list nguonkhachs
        nguonkhachApi.list = function (filter) {
            var urlBase = base_url + '/v1/nguonkhach/list';
            return $http.post(urlBase, filter, headers);
        };

        //add new nguonkhach
        nguonkhachApi.add = function (nguonkhach) {
            var urlBase = base_url + '/v1/nguonkhach/add';
            return $http.post(urlBase, nguonkhach, headers);
        };

        //update nguonkhach
        nguonkhachApi.update = function (nguonkhach) {
            var urlBase = base_url + '/v1/nguonkhach/update';
            return $http.put(urlBase, nguonkhach, headers);
        };

        //delete nguonkhach
        nguonkhachApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/nguonkhach/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by nguonkhach id
        nguonkhachApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/nguonkhach/get_by_id?nguonkhachId=' + id;
            return $http.get(urlBase, headers);
        };
		
        return nguonkhachApi;
    }]);