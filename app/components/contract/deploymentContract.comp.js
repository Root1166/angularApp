
angular.module('contract-deploymentcontract.comp', [ 'common.srv']).
    component('contractDeploymentcontract', {
        templateUrl: '/app/components/contract/deploymentContract.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'hopdongApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, hopdongApi, commonService) {
                var self = this;
                self.tab = $routeParams.tab;
                self.id = $routeParams.id;
                this.onLoad = function () {
                    if ($routeParams.tab == undefined)
                        $routeParams.tab = 'contractdeploy';

                    angular.element(document).ready(function () {
                        // your code here
                        (window.innerWidth > 0 ? window.innerWidth : this.screen.width) < 1920 ? ($("body").addClass("mini-sidebar"),
                            $(".navbar-brand span").hide(), $(".sidebartoggler i").addClass("ti-menu")) : ($("body").removeClass("mini-sidebar"),
                                $(".navbar-brand span").show());
                        var height = (window.innerHeight > 0 ? window.innerHeight : this.screen.height) - 1;
                        (height -= 0) < 1 && (height = 1), height > 0 && $(".page-wrapper").css("min-height", height + "px");
                    });
                }

                this.isActiveTab = function (tab) {
                    if (tab == $routeParams.tab) {
                        return true;
                    }
                    return false;
                }
                this.onLoad();
            }
        ]
    });