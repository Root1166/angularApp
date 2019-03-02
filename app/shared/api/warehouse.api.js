
angular.module('warehouse.api', ['base.api'])
    .factory('warehouseApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var warehouseApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list warehouses
        warehouseApi.list = function (filter) {
            var urlBase = base_url + '/v1/ware_house/list';
            return $http.get(urlBase, headers);
        };

        //add new warehouse
        warehouseApi.add = function (warehouse) {
            var urlBase = base_url + '/v1/ware_house/add';
            return $http.post(urlBase, warehouse, headers);
        };

        //update warehouse
        warehouseApi.update = function (warehouse) {
            var urlBase = base_url + '/v1/ware_house/update';
            return $http.put(urlBase, warehouse, headers);
        };

        //delete warehouse
        warehouseApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/ware_house/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get by warehouse id
        warehouseApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/ware_house/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };
		
        return warehouseApi;
    }]);