angular.module('shared.profile.comp', ['user.api', 'common.srv']).
    component('sharedProfile', {
        templateUrl: '/app/shared/components/profile/profile.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', '$window', 'userApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, $window, userApi, commonService) {
                var self = this;
                self.profileModel = {};

                this.onSignOut = function () {
                    localStorage.removeItem("token");
                }

                this.onLoad = function () {
                    userApi.get_my_account().then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.profileModel = response.data;
                        }
                        else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }//onLoad

                self.onLoad();
            }]
    });