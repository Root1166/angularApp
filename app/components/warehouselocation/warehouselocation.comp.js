
angular.module('warehouselocation.comp', ['warehouselocation.api', 'warehouse.api', 'common.srv']).
    component('warehouselocation', {
        templateUrl: '/app/components/warehouselocation/warehouselocation.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'warehouselocationApi','warehouseApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, warehouselocationApi, warehouseApi, commonService) {
                var self = this;
                self.warehouselocationModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentWareHouseLocationModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.onRemoves = function (warehouselocation) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            var selectedWareHouseLocations = [];
                            angular.forEach(self.warehouselocationModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedWareHouseLocations.push(itm.Id);
                                }
                            });

                            if (selectedWareHouseLocations.length == 0) {
                                commonService.showWarningMessage('Chưa chọn vị trí đặt hàng cần xóa');
                                return;
                            }

                            //remove
                            warehouselocationApi.delete(selectedWareHouseLocations).then(function (response) {
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
                    angular.forEach(self.warehouselocationModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentWareHouseLocationModel = {};
                }

                this.onEdit = function (warehouselocation) {
                    self.currentWareHouseLocationModel = warehouselocation;

                    self.warehouseModels.map(function (el) {
                        if (warehouselocation.WareHouseId == el.Id)
                            self.currentWareHouseLocationModel.WareHouseModel = el;
                    });

                }

                this.onSaveWareHouseLocationModel = function () {

                    if (
                        self.currentWareHouseLocationModel.Code == undefined ||
                        self.currentWareHouseLocationModel.Code == '' || self.currentWareHouseLocationModel.LocationName == undefined ||
                        self.currentWareHouseLocationModel.LocationName == ''
                    ) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    if (self.currentWareHouseLocationModel.WareHouseModel == undefined) {
                        commonService.showWarningMessage('Chưa chọn kho');
                        return;
                    }
                    self.currentWareHouseLocationModel.WareHouseId = self.currentWareHouseLocationModel.WareHouseModel.Id;

                    //save warehouselocation
                    var onSave = undefined;
                    if (self.currentWareHouseLocationModel.Id == undefined || self.currentWareHouseLocationModel.Id == 0)
                        onSave = warehouselocationApi.add;
                    else
                        onSave = warehouselocationApi.update;

                    onSave(self.currentWareHouseLocationModel).then(function (response) {
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

                this.onRemove = function (warehouselocation) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            warehouselocationApi.delete([warehouselocation.Id]).then(function (response) {
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
                    warehouselocationApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.warehouselocationModels = response.data;

                            //binding
                            for (i = 0; i < self.warehouselocationModels.length; i++) {
                                self.warehouseModels.map(function (el) {
                                    if (el.Id == self.warehouselocationModels[i].WareHouseId) {
                                        self.warehouselocationModels[i].WareHouseName = el.Name;
                                    }
                                });
                            }//for
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
                    warehouseApi.list().then(function (response) {
                        if (response.data.result) {
                            self.warehouseModels = response.data.data;
                            self.onList(self.filter);
                        }//if
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onLoad();
            }
        ]
    });