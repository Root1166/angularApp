
angular.module('typeofwaste.api', ['base.api'])
    .factory('typeofwasteApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var typeofwasteApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list typeofwastes
        typeofwasteApi.list = function () {
            var urlBase = base_url + '/v1/type_of_waste/list';
            return $http.get(urlBase, headers);
        };

        //add new typeofwaste
        typeofwasteApi.add = function (typeofwaste) {
            var urlBase = base_url + '/v1/type_of_waste/add';
            return $http.post(urlBase, typeofwaste, headers);
        };

        //update typeofwaste
        typeofwasteApi.update = function (typeofwaste) {
            var urlBase = base_url + '/v1/type_of_waste/update';
            return $http.put(urlBase, typeofwaste, headers);
        };

        //delete typeofwaste
        typeofwasteApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/type_of_waste/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by typeofwaste id
        typeofwasteApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/type_of_waste/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };
		
        return typeofwasteApi;
    }]);