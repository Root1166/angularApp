
angular.module('productionadditive.api', ['base.api'])
    .factory('productionadditiveApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var productionadditiveApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list productionadditives
        productionadditiveApi.list = function (filter) {
            var urlBase = base_url + '/v1/production_additive/list';
            return $http.get(urlBase, headers);
        };

        //add new productionadditive
        productionadditiveApi.add = function (productionadditive) {
            var urlBase = base_url + '/v1/production_additive/add';
            return $http.post(urlBase, productionadditive, headers);
        };

        //update productionadditive
        productionadditiveApi.update = function (productionadditive) {
            var urlBase = base_url + '/v1/production_additive/update';
            return $http.put(urlBase, productionadditive, headers);
        };

        //delete productionadditive
        productionadditiveApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/production_additive/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by productionadditive id
        productionadditiveApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/production_additive/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };
		
        return productionadditiveApi;
    }]);