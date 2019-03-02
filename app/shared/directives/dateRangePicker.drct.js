angular.module('dateRangePicker.drct', [])
    .directive('dateRangePicker', function () {
    return {
        restrict: 'A',
        scope: {
            onLoadCallback: '&'
        },
        link: function (scope, element, attrs, ctrl) {
            scope.startDate = moment().subtract("days", 29).format("D MMMM, YYYY");
            scope.endDate = moment().format("D MMMM, YYYY");           

            $(element).daterangepicker({ startDate: moment().subtract("days", 29), endDate: moment(), minDate: new Date(2013, 1, 1), maxDate: new Date(), showDropdowns: !0, showWeekNumbers: !0, timePicker: !1, timePickerIncrement: 1, timePicker12Hour: !0, ranges: { 'Hôm nay': [moment(), moment()], 'Hôm qua': [moment().subtract("days", 1), moment().subtract("days", 1)], "7 ngày qua": [moment().subtract("days", 6), moment()], "30 ngày qua": [moment().subtract("days", 29), moment()], "Tháng này": [moment().startOf("month"), moment().endOf("month")], "Tháng trước": [moment().subtract("month", 1).startOf("month"), moment().subtract("month", 1).endOf("month")] }, opens: "left", buttonClasses: ["btn btn-default"], applyClass: "small bg-green", cancelClass: "small ui-state-default", format: "DD/MM/YYYY", separator: " tới ", locale: { applyLabel: "Áp dụng", fromLabel: "Từ", toLabel: "Đến", customRangeLabel: "Tùy chỉnh", daysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], monthNames: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"], firstDay: 1 } },
           function (a, b) {
               scope.startDate = a.format("D MMMM, YYYY");
               scope.endDate = b.format("D MMMM, YYYY");
               $(element).find("span").html(a.format("D MMMM, YYYY") + " - " + b.format("D MMMM, YYYY"));

               //scope.$parent.$parent[attrs.dateRangePicker] = { start: scope.startDate, end: scope.endDate };
               scope.onLoadCallback({ arg1: { start: scope.startDate, end: scope.endDate } });

               console.log(scope);

               if (scope.x == undefined)
                   return;

               scope.x.startDate = scope.startDate;
               scope.x.endDate = scope.endDate;
           });

            $(element).find("span").html(moment().subtract("days", 29).format("D MMMM, YYYY") + " - " + moment().format("D MMMM, YYYY"));
        }
    };
});