angular.module('base.api',[])
    .factory('baseApi', ['$http', function ($http) {
        var api_url_base = 'http://api-bil.vnsolution.com.vn';
        var auth_url_base = 'http://login-bil.vnsolution.com.vn';
        // var api_url_base = 'http://api.bilico.vn';
        // var auth_url_base = 'http://login.bilico.vn';
        var baseApi = {};

        //get global config api
        baseApi.getBaseUri = function () {
            return {
                api_url_base: api_url_base,
                auth_url_base: auth_url_base
            }
        };

        baseApi.getToken = function () {
            var token = localStorage.getItem('token');
            if (token == undefined)
                window.location.href = '/login.html';
            return JSON.parse(token);
        };

        return baseApi;
    }]);