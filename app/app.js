'use strict';
angular.module('webApp', [
    'ngAnimate',
    'ngRoute',
    'app.routes', //define routes for app
    'app.config', //define config for app
    'app.core',  //define api services for app
    'app.services', //define common services like upload, http... for app
    'app.directives', //define common directives like datePicker, timePicker... for app
    'app.components', //define components, share components for app
    'ui.router',
    'ngMaterial',
    'ngMessages',
    'jkAngularRatingStars',
    'ngMaterialDatePicker'
]);
