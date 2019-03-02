angular.module('select2ajax.drct', [])
    .directive("select2ajax", function ($timeout, $parse) {
        return {
            restrict: 'AC',
            scope: {
                s2Search: "&",
                s2Model: "=",
                s2Process: "&",
                s2Show: "=",
                s2Modelvalue: '=',
                s2Change: '&'
            },
            link: function (scope, element, attrs) {
                var init = function () {
                    //console.log(attrs);
                    $timeout(function () {
                        element.select2({
                            width: 'resolve',
                            ajax: {
                                delay: 500,
                                transport: function (params, success, failure) {
                                    scope.s2Search({ text: params.data.term }).then(success, failure);
                                },
                                processResults: function (response) {
                                    return scope.s2Process({ response: response });
                                }
                            }
                        });
                    });
                }

                $(element).on('select2:select', function (e) {
                    // console.log(e.params.data.text);
                    // console.log(e.params.data);
                    //if (scope.s2Model !== undefined) 
                    scope.s2Model = e.params.data;
                    scope.s2Modelvalue = e.params.data.id;
                    if (scope.s2Change !== undefined) scope.s2Change({value: e.params.data.id});
                });
                $(element).on('select2:unselect', function (e) {
                    console.log('unselect');
                    //if (scope.s2Model !== undefined)
                    scope.s2Model = null;
                    scope.s2Modelvalue = null;
                });

                var reInit = function () {
                    $timeout(function () {
                        element.select2('destroy');
                    });
                    init();
                }
                init();

                scope.$watch('s2Show', function (newValue, oldValue) {
                    if (newValue) {
                        reInit();
                    }
                }, true);
            }
        };
    });