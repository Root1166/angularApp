angular.module('notification.drct', [])
    .directive('notification', ['$http', '$rootScope', function ($http, $rootScope) {
    return {
        restrict: 'E',
        link: function (scope, $rootScope, elm, attrs) {
            $rootScope.showNotifyMessage = function () {
                $.toast({
                    heading: 'Welcome to Material Pro admin',
                    text: 'Use the predefined ones, or specify a custom position object.',
                    position: 'top-right',
                    loaderBg:'#ff6849',
                    icon: 'info',
                    hideAfter: 3000, 
                    stack: 6
                  });
            };
        }        
    };
}]);