
angular.module('notify.api', ['base.api'])
    .factory('notifyApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var notifyApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //receive new notify
        notifyApi.receive = function (ids) {
            var urlBase = base_url + '/v1/notification/receive';
            return $http.post(urlBase, ids, headers);
        };

        //preview new notify
        notifyApi.preview = function (ids) {
            var urlBase = base_url + '/v1/notification/preview';
            return $http.post(urlBase, ids, headers);
        };

        //delete notify
        notifyApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/notification/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        //get my notifications
        notifyApi.get_my_notifications = function (filter) {
            var urlBase = base_url + '/v1/notification/get_my_notifications';
            return $http.post(urlBase, filter, headers);
        };

        return notifyApi;
    }]);