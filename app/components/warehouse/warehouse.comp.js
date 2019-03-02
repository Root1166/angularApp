
angular.module('warehouse.comp', ['warehouse.api', 'common.srv']).
    component('warehouse', {
        templateUrl: '/app/components/warehouse/warehouse.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'warehouseApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, warehouseApi, commonService) {
                var self = this;
                self.warehouseModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentWareHouseModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.onRemoves = function (warehouse) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            var selectedWareHouses = [];
                            angular.forEach(self.warehouseModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedWareHouses.push(itm.Id);
                                }
                            });

                            if (selectedWareHouses.length == 0) {
                                commonService.showWarningMessage('Chưa chọn warehouse cần xóa');
                                return;
                            }

                            //remove
                            warehouseApi.delete(selectedWareHouses).then(function (response) {
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
                    angular.forEach(self.warehouseModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentWareHouseModel = {};
                }

                this.onEdit = function (warehouse) {
                    self.currentWareHouseModel = warehouse;
                }

                this.onSaveWareHouseModel = function () {

                    if (
                        self.currentWareHouseModel.Code == undefined ||
                        self.currentWareHouseModel.Code == '' || self.currentWareHouseModel.Name == undefined ||
                        self.currentWareHouseModel.Name == '' || self.currentWareHouseModel.Description == undefined ||
                        self.currentWareHouseModel.Description == ''
                    ) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    //save warehouse
                    var onSave = undefined;
                    if (self.currentWareHouseModel.Id == undefined || self.currentWareHouseModel.Id == 0)
                        onSave = warehouseApi.add;
                    else
                        onSave = warehouseApi.update;

                    onSave(self.currentWareHouseModel).then(function (response) {
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

                this.onRemove = function (warehouse) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            warehouseApi.delete([warehouse.Id]).then(function (response) {
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
                    warehouseApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.warehouseModels = response.data;
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