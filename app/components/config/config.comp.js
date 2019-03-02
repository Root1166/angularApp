angular.module('config.comp', ['config.api','common.srv']).
    component('config', {
        templateUrl: '/app/components/config/config.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'configApi', 'commonService',
            function ConfigController($routeParams, $scope, $rootScope, $location, configApi, commonService) {
                var self = this;
                self.configModel = {};
                self.configModel.UseSsl = false;

                this.onLoad = function () {
                    configApi.get_config().then(function (response) {
                        var response = response.data;
                        if (response.result) {
                            self.configModel = response.data;
                        }
                        else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onSave = function () {
                    console.log(self.configModel);
                    configApi.save_config(self.configModel).then(function (response) {
                        var response = response.data;
                        if (response.result) {
                            //show message
                            commonService.showSuccessMessage('Cập nhật thành công');
                        }
                        else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onLoad();
            }
        ]
    });