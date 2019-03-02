
angular.module('scrap.api', ['base.api'])
    .factory('scrapApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var scrapApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list scraps
        scrapApi.list = function (filter) {
            var urlBase = base_url + '/v1/scrap/list';
            return $http.get(urlBase, headers);
        };

        //add new scrap
        scrapApi.add = function (scrap) {
            var urlBase = base_url + '/v1/scrap/add';
            return $http.post(urlBase, scrap, headers);
        };

        //update scrap
        scrapApi.update = function (scrap) {
            var urlBase = base_url + '/v1/scrap/update';
            return $http.put(urlBase, scrap, headers);
        };

        //delete scrap
        scrapApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/scrap/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by scrap id
        scrapApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/scrap/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };
		
        return scrapApi;
    }]);