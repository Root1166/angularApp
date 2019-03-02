
angular.module('scrap.comp', ['scrap.api', 'common.srv']).
    component('scrap', {
        templateUrl: '/app/components/scrap/scrap.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'scrapApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, scrapApi, commonService) {
                var self = this;
                self.scrapModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentScrapModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.onRemoves = function (scrap) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            var selectedScraps = [];
                            angular.forEach(self.scrapModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedScraps.push(itm.Id);
                                }
                            });

                            if (selectedScraps.length == 0) {
                                commonService.showWarningMessage('Chưa chọn scrap cần xóa');
                                return;
                            }

                            //remove
                            scrapApi.delete(selectedScraps).then(function (response) {
                                var response = response.data;
                                if (response.result) {
                                    self.filter.Paging.CurrentPage = 1;
                                    self.filter.Paging.PageSize = self.pageSize;
                                    self.onList(self.filter);

                                    //show message
                                    commonService.showSuccessMessage('Xóa thành công');
                                }
                                else {
                                    commonService.showWarningMessage(response.message);
                                }
                            }, function (error) {
                                commonService.handlError(error.data);
                            });
                        }//if confirm
                    });//confirm sweet                    
                }

                this.toggleAll = function () {
                    var toggleStatus = self.isAllSelected;
                    angular.forEach(self.scrapModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentScrapModel = {};
                }

                this.onEdit = function (scrap) {
                    self.currentScrapModel = scrap;
                }

                this.onSaveScrapModel = function () {

                    if (
                        self.currentScrapModel.Code == undefined ||
                        self.currentScrapModel.Code == '' || self.currentScrapModel.Name == undefined ||
                        self.currentScrapModel.Name == ''
                    ) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    //save scrap
                    var onSave = undefined;
                    if (self.currentScrapModel.Id == undefined || self.currentScrapModel.Id == 0)
                        onSave = scrapApi.add;
                    else
                        onSave = scrapApi.update;

                    onSave(self.currentScrapModel).then(function (response) {
                        var response = response.data;
                        if (response.result) {
                            self.filter.Paging.CurrentPage = 1;
                            self.filter.Paging.PageSize = self.pageSize;
                            self.onList(self.filter);

                            $scope.dismiss();

                            //show message
                            commonService.showSuccessMessage('Cập nhật thành công!');
                        }
                        else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onRemove = function (scrap) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            scrapApi.delete([scrap.Id]).then(function (response) {
                                var response = response.data;
                                if (response.result) {
                                    self.filter.Paging.CurrentPage = 1;
                                    self.filter.Paging.PageSize = self.pageSize;
                                    self.onList(self.filter);

                                    //show message
                                    commonService.showSuccessMessage('Xóa thành công!');
                                }
                                else {
                                    commonService.showWarningMessage(response.message);
                                }
                            }, function (error) {
                                commonService.handlError(error.data);
                            });
                        }
                    });//sweet confirm                    
                }

                this.onPageChanged = function (pageIndex) {
                    self.filter.Paging.CurrentPage = pageIndex;
                    self.filter.Paging.PageSize = self.pageSize;
                    self.onList(self.filter);
                }

                this.onSearch = function ($event) {
                    if ($event.charCode == 13) {
                        self.filter.Search = self.search;
                        self.filter.Paging.CurrentPage = 1;
                        self.filter.Paging.PageSize = self.pageSize;
                        self.onList(self.filter);
                    }
                }

                this.onList = function (filter) {
                    scrapApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.scrapModels = response.data;
                        }
                        else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }//onList

                this.onLoad = function () {
                    //first load data from list
                    self.onList(self.filter);
                }

                this.onLoad();
            }
        ]
    });