angular.module('datePicker', []).directive('datePicker', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            //console.log(attrs);
            setTimeout(function () {
                $(element).datepicker({ autoclose: true, todayHighlight: true, dateFormat: attrs.format, language: attrs.lang });
            }, 500);
        }
    };
});