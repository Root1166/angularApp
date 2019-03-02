
angular.module('provider.comp', ['provider.api', 'common.srv']).
    component('provider', {
        templateUrl: '/app/components/provider/provider.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'providerApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, providerApi, commonService) {
                var self = this;
                self.providerModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentProviderModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.onRemoves = function (provider) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            var selectedProviders = [];
                            angular.forEach(self.providerModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedProviders.push(itm.Id);
                                }
                            });

                            if (selectedProviders.length == 0) {
                                commonService.showWarningMessage('Chưa chọn provider cần xóa');
                                return;
                            }

                            //remove
                            providerApi.delete(selectedProviders).then(function (response) {
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
                    angular.forEach(self.providerModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentProviderModel = {};
                }

                this.onEdit = function (provider) {
                    self.currentProviderModel = provider;
                }

                this.onSaveProviderModel = function () {

                    if (
                        self.currentProviderModel.Code == undefined ||
                        self.currentProviderModel.Code == '' || self.currentProviderModel.Name == undefined ||
                        self.currentProviderModel.Name == '' 
                    ) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    //save provider
                    var onSave = undefined;
                    if (self.currentProviderModel.Id == undefined || self.currentProviderModel.Id == 0)
                        onSave = providerApi.add;
                    else
                        onSave = providerApi.update;

                    onSave(self.currentProviderModel).then(function (response) {
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

                this.onRemove = function (provider) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            providerApi.delete([provider.Id]).then(function (response) {
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
                    providerApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.providerModels = response.data.list;
                            self.totalRowCount = response.data.pager.RowsCount;
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