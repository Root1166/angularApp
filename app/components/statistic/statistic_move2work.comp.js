angular.module('statistic-move2work.comp', ['common.srv']).
    component('statisticMove2work', {
        templateUrl: '/app/components/statistic/statistic_move2work.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'commonService','baocaoApi','userApi',
            function ($routeParams, $scope, $rootScope, $location, commonService,baocaoApi,userApi) {
                var self = this;
                self.currentPage = 1;
                self.pageSize = 50;
                self.totalRowCount = 0;
                self.filter = {
                    KythuatId: undefined,
                    Start: undefined,
                    End: new Date(),
                    Paging: {
                        PageSize: self.pageSize,
                        CurrentPage: self.currentPage,
                    }
                }
                this.filterByDate = function(arg1) {
                    if (arg1 != undefined) {
                        self.filter.Start = arg1.start;
                        self.filter.End = arg1.end;
                        self.onLoad();
                    }
                }
                this.searchKythuatvien = function(searchText) {
                    var filter = {
                        "Search": searchText,
                        "Paging": {
                            "PageSize": self.pageSize,
                            "CurrentPage": self.currentPage,
                        }
                    };
                    return userApi.list(filter).then(function(response) {
                        return response.data.data.list
                    });

                }
                this.onSelectKythuatvien = function(item) {
                    console.log(item);
                    if (typeof item == 'object')
                        self.filter.KythuatId = item.TaikhoanId;
                    else{
                        self.filter.KythuatId = undefined;
                    }
                        self.onLoad();
                }
                this.onPageChanged = function(pageIndex) {
                    self.filter.Paging.CurrentPage = pageIndex;
                    self.filter.Paging.PageSize = self.pageSize;
                    self.onLoad(self.filter);
                }
                this.onLoad = function() {
                    baocaoApi.reportRegion(self.filter).then(function(response) {
                        console.log(response);
                        var response = response.data
                        if (response.result) {
                            self.reportRegionModel = response.data;
                        } else {
                            commonService.showWarningMessage(response.message);

                        }
                    }, function(error) {
                        commonService.handlError(error.data);
                    });
                }

            this.onLoad();

            }
        ]
    });
