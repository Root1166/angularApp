
angular.module('buyer.api', ['base.api'])
    .factory('buyerApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var buyerApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list buyers
        buyerApi.list = function (filter) {
            var urlBase = base_url + '/v1/buyer/list';
            return $http.post(urlBase, filter, headers);
        };

        //add new buyer
        buyerApi.add = function (buyer) {
            var urlBase = base_url + '/v1/buyer/add';
            return $http.post(urlBase, buyer, headers);
        };

        //update buyer
        buyerApi.update = function (buyer) {
            var urlBase = base_url + '/v1/buyer/update';
            return $http.put(urlBase, buyer, headers);
        };

        //delete buyer
        buyerApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/buyer/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by buyer id
        buyerApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/buyer/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };
		
        return buyerApi;
    }]);