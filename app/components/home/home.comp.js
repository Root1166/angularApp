angular.module('home.comp', ['statistic.api','common.srv']).
    component('home', {
        templateUrl: '/app/components/home/home.tpl.html',
        controller: ['statisticApi', 'commonService', function (statisticApi, commonService) {
            var self = this;

            this.onLoad = function () {
                //statisticApi.statistic_contract().then(function (response) {
                //    var response = response.data;

                //    if (response.result) {
                //        self.contractModel = response.data;
                //    }
                //    else {
                //        commonService.showWarningMessage(response.message);
                //    }
                //}, function (error) {
                //    commonService.handlError(error.data);
                //});

                //statisticApi.statistic_plan().then(function (response) {
                //    var response = response.data;

                //    if (response.result) {
                //        self.planModel = response.data;
                //    }
                //    else {
                //        commonService.showWarningMessage(response.message);
                //    }
                //}, function (error) {
                //    commonService.handlError(error.data);
                //});

                //statisticApi.statistic_purchase().then(function (response) {
                //    var response = response.data;

                //    if (response.result) {
                //        self.purchaseModel = response.data;
                //    }
                //    else {
                //        commonService.showWarningMessage(response.message);
                //    }
                //}, function (error) {
                //    commonService.handlError(error.data);
                //});

                //statisticApi.statistic_sale().then(function (response) {
                //    var response = response.data;

                //    if (response.result) {
                //        self.saleModel = response.data;
                //    }
                //    else {
                //        commonService.showWarningMessage(response.message);
                //    }
                //}, function (error) {
                //    commonService.handlError(error.data);
                //});

                //statisticApi.statistic_stock().then(function (response) {
                //    var response = response.data;

                //    if (response.result) {
                //        self.stockModel = response.data;
                //    }
                //    else {
                //        commonService.showWarningMessage(response.message);
                //    }
                //}, function (error) {
                //    commonService.handlError(error.data);
                //});
            }//onLoad

            self.onLoad();
        }]
    });