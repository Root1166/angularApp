
angular.module('production-definition.comp', ['productionsystem.api', 'typeofwaste.api', 'common.srv']).
    component('productionDefinition', {
        templateUrl: '/app/components/production/definition.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'productionsystemApi', 'typeofwasteApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, productionsystemApi, typeofwasteApi, commonService) {
                var self = this;
                self.productionsystemModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentProductionSystemModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.onRemoves = function (productionsystem) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            var selectedProductionSystems = [];
                            angular.forEach(self.productionsystemModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedProductionSystems.push(itm.SystemId);
                                }
                            });

                            if (selectedProductionSystems.length == 0) {
                                commonService.showWarningMessage('Chưa chọn hệ thống sản xuất cần xóa');
                                return;
                            }

                            //remove
                            productionsystemApi.delete(selectedProductionSystems).then(function (response) {
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
                    angular.forEach(self.productionsystemModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentProductionSystemModel = {};
                }

                this.onEdit = function (productionsystem) {
                    self.currentProductionSystemModel = productionsystem;

                    self.typeOfWasteModels.map(function (el) {
                        if (productionsystem.TypeOfWasteId == el.TypeId)
                            self.currentProductionSystemModel.TypeOfWasteModel = el;
                    });

                    self.parentSystemModels.map(function (el) {
                        if (productionsystem.ParentId == el.SystemId)
                            self.currentProductionSystemModel.ParentSystemModel = el;
                    });
                }

                this.onSaveProductionSystemModel = function () {

                    if (
                        self.currentProductionSystemModel.Name == undefined ||
                        self.currentProductionSystemModel.Name == '' || self.currentProductionSystemModel.Code == undefined ||
                        self.currentProductionSystemModel.Code == '' || self.currentProductionSystemModel.Description == undefined ||
                        self.currentProductionSystemModel.Description == '' || self.currentProductionSystemModel.ProductionShifts == undefined ||
                        self.currentProductionSystemModel.ProductionShifts == '' || self.currentProductionSystemModel.Capacity == undefined ||
                        self.currentProductionSystemModel.Capacity == ''
                    ) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    if (self.currentProductionSystemModel.TypeOfWasteModel == undefined) {
                        commonService.showWarningMessage('Chưa chọn loại chất thải sản xuất');
                        return;
                    }

                    self.currentProductionSystemModel.TypeOfWasteId = self.currentProductionSystemModel.TypeOfWasteModel.TypeId;
                    if (self.currentProductionSystemModel.ParentSystemModel != undefined && self.currentProductionSystemModel.ParentSystemModel != null) {
                        self.currentProductionSystemModel.ParentId = self.currentProductionSystemModel.ParentSystemModel.SystemId;
                    }

                    //save productionsystem
                    var onSave = undefined;
                    if (self.currentProductionSystemModel.SystemId == undefined || self.currentProductionSystemModel.SystemId == 0)
                        onSave = productionsystemApi.add;
                    else
                        onSave = productionsystemApi.update;

                    onSave(self.currentProductionSystemModel).then(function (response) {
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

                this.onRemove = function (productionsystem) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            productionsystemApi.delete([productionsystem.SystemId]).then(function (response) {
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
                    productionsystemApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.productionsystemModels = response.data;
                            self.parentSystemModels = [];
                            self.productionsystemModels.map(function (el) {
                                if (el.ParentId == null) {
                                    self.parentSystemModels.push(el);
                                }
                            });
                            //mapping
                            for (i = 0; i < self.productionsystemModels.length; i++) {
                                self.typeOfWasteModels.map(function (el) {
                                    if (el.TypeId == self.productionsystemModels[i].TypeOfWasteId) {
                                        self.productionsystemModels[i].WasteTypeName = el.TypeName;
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
                    //$q.all().then(function (response) {
                    //    console.log();
                    //});

                    typeofwasteApi.list().then(function (response) {
                        if (response.data.result) {
                            self.typeOfWasteModels = response.data.data;
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