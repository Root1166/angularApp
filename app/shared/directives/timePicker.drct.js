angular.module('timePicker', []).directive('timePicker', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            setTimeout(function () {
                $(element).timepicker();
            });
        }
    };
});
