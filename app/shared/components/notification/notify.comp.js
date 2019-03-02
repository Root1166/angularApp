angular.module('shared.notify.comp', ['notify.api', 'common.srv']).
    component('sharedNotify', {
        templateUrl: '/app/shared/components/notification/notify.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', '$window', '$interval', 'notifyApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, $window, $interval, notifyApi, commonService) {
                var self = this;
                self.notificationModels = [];

                this.getResourceLink = function (notify) {
                    if (notify.ResourceType == 1) {//ke hoach san xuat
                        return "home.production.edit({ id: " + notify.ObjectId + " })";
                    }
                    else {//hop dong
                        return "home.contract.edit({ id: " + notify.ObjectId + " })";
                    }
                }

                this.onLoad = function () {
                    $rootScope.isSystemRequest = true;
                    notifyApi.get_my_notifications({
                        "Paging": {
                            "PageSize": 10,
                            "CurrentPage": 1,
                        }
                    }).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.notificationModels = response.data.list;

                            //show notify
                            var i = 0;
                            self.notificationModels.map(function (el) {
                                if (el.IsReceived == false) {         
                                    i++;
                                    setTimeout(function () {
                                        commonService.showSuccessMessage(el.Title);
                                        //receive
                                        notifyApi.receive([el.Id]).then(function (response) {
                                            var response = response.data;
                                            if (response.result) {
                                                
                                            }
                                            else {
                                                commonService.showWarningMessage(response.message);
                                            }
                                        }, function (error) {
                                            commonService.handlError(error.data);
                                        });

                                    }, 3000*i);
                                }//if
                            });


                            $rootScope.isSystemRequest = false;
                        }
                        else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }//onLoad

                $interval(function () {
                    self.onLoad();
                }, 6 * 1000);

                self.onLoad();
            }]
    });