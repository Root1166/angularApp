angular.module('core.api')
    .factory('apiFactory', ['$http', function ($http) {
        var urlBase = '/api/defaultapi';
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var apiFactory = {};

        //
        apiFactory.getDemands = function () {
            var objRequest = { cmd: 'get_demands'};
            return $http.post(urlBase, objRequest, headers);
        };
        apiFactory.getPositions = function () {
            var objRequest = { cmd: 'get_positions' };
            return $http.post(urlBase, objRequest, headers);
        };
        apiFactory.getDirections = function () {
            var objRequest = { cmd: 'get_directions' };
            return $http.post(urlBase, objRequest, headers);
        };
        apiFactory.getPapers = function () {
            var objRequest = { cmd: 'get_papers' };
            return $http.post(urlBase, objRequest, headers);
        };
        apiFactory.demands = [];
        apiFactory.positions = [];
        apiFactory.directions = [];
        apiFactory.papers = [];
       
        apiFactory.getCities = function () {
            var objRequest = {};
            objRequest.cmd = 'get_cities';
            return $http.post(urlBase, objRequest, headers);
        };
        apiFactory.getDistricts = function (city) {
            var objRequest = {};
            objRequest.cmd = 'get_districts';
            objRequest.city = city;
            //console.log(objRequest);
            return $http.post(urlBase, objRequest, headers);
        };
        apiFactory.getWards = function (district) {
            var objRequest = {};
            objRequest.cmd = 'get_wards';
            objRequest.district = district;
            //console.log(objRequest);
            return $http.post(urlBase, objRequest, headers);
        };
        apiFactory.searchStreets = function (input, wardId) {
            var objRequest = {};
            objRequest.cmd = 'search_streets';
            objRequest.input = input;
            objRequest.ward = wardId;
            //console.log(objRequest);
            return $http.post(urlBase, objRequest, headers);
        };
        apiFactory.getEstateTypes = function () {
            var objRequest = {};
            objRequest.cmd = 'get_estate_types';
            //console.log(objRequest);
            return $http.post(urlBase, objRequest, headers);
        };
        apiFactory.searchEstate = function (searchModel) {
            var objRequest = {};
            objRequest = searchModel;
            objRequest.cmd = 'search_estate';
            objRequest.getPhotos = true;
            //console.log(objRequest);
            return $http.post(urlBase, objRequest, headers);
        };
        apiFactory.submitEstate = function (estate) {
            var objRequest = {};
            objRequest = estate;
            objRequest.cmd = 'submit_estate';
            return $http.post(urlBase, objRequest, headers);
        };
        apiFactory.getEstate = function (estateId) {
            var objRequest = {};
            objRequest = { estateId: estateId};
            objRequest.cmd = 'get_estate';
            return $http.post(urlBase, objRequest, headers);
        };
        apiFactory.changeEstateStatus = function (status, selectedIds) {
            var objRequest = {};
            objRequest = { status: status, ids: selectedIds };
            objRequest.cmd = 'change_estates_status';
            return $http.post(urlBase, objRequest, headers);
        };
        apiFactory.addEstatePhotos = function (estateId, photos) {
            var objRequest = { estateId: estateId, photos: photos };
            objRequest.cmd = 'add_estate_photos';
            return $http.post(urlBase, objRequest, headers);
        };
        apiFactory.getEstatePhotos = function (estateId) {
            objRequest = { estateId: estateId };
            objRequest.cmd = 'get_estate_photos';
            return $http.post(urlBase, objRequest, headers);
        };
        apiFactory.deleteEstatePhoto = function (photoId) {
            var objRequest = { photoId: photoId };
            objRequest.cmd = 'delete_estate_photo';
            return $http.post(urlBase, objRequest, headers);
        };
        apiFactory.sortEstatePhotos = function (photos) {
            var objRequest = { photos: photos };
            objRequest.cmd = 'sort_estate_photos';
            return $http.post(urlBase, objRequest, headers);
        };
        /************ Social Services ***********************************************************************************/
        apiFactory.getSocialServiceTypes = function () {
            var objRequest = {};
            objRequest.cmd = 'get_social_service_types';
            return $http.post(urlBase, objRequest, headers);
        }
        apiFactory.submitSocialService = function (model) {
            var objRequest = model;
            objRequest.cmd = 'submit_social';
            return $http.post(urlBase, objRequest, headers);
        };
        return apiFactory;
    }]);