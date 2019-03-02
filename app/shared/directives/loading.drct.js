angular.module('loading.drct', [])
    .directive('appLoading', ['$http', '$rootScope', function ($http, $rootScope) {
        return {
            restrict: 'E',
            link: function (scope, elm, attrs) {
                scope.ajax_loading = false;

                scope.isLoading = function () {
                    if ($rootScope.isSystemRequest == true)
                        return false;

                    scope.ajax_loading = $http.pendingRequests.length > 0;

                    return scope.ajax_loading;
                };
                let targetElm = elm.children()[0];
                scope.$watch(scope.isLoading, function (v) {
                    if (v) {
                        scope.ajax_loading = true;
                        targetElm.classList.add("busy");
                    }
                    else {
                        targetElm.classList.remove("busy");
                        scope.ajax_loading = false;
                    }
                });
            },
            template: '<div id="ajax-busy"><div class="bar"></div><div class="bar"></div><div class="bar"></div></div>'
        };
    }]);