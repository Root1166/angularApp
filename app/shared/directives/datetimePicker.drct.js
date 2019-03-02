angular.module('datetimepicker', []).directive('datetimepicker', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            //console.log(attrs);
            setTimeout(function () {
                $(element).datetimepicker();
            }, 500);
        }
    };
});
