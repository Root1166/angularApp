
angular.module('waste.comp', ['waste.api', 'typeofwaste.api', 'common.srv']).
    component('waste', {
        templateUrl: '/app/components/waste/waste.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'wasteApi', 'typeofwasteApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, wasteApi, typeofwasteApi, commonService) {
                var self = this;
                self.wasteModels = [];
                self.typeOfWasteModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentWasteModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.onRemoves = function (waste) {
                    
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function(isConfirm){
                        if(isConfirm)
                        {
                            var selectedWastes = [];
                            angular.forEach(self.wasteModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedWastes.push(itm.WasteId);
                                }
                            });

                            if (selectedWastes.length == 0) {
                                commonService.showWarningMessage('Chưa chọn waste cần xóa');
                                return;
                            }

                            //remove
                            wasteApi.delete(selectedWastes).then(function (response) {
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
                    angular.forEach(self.wasteModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentWasteModel = {};
                }

                this.onEdit = function (waste) {
                    self.currentWasteModel = waste;

                    self.typeOfWasteModels.map(function (el) {
                        if (waste.TypeOfWasteId == el.TypeId)
                            self.currentWasteModel.TypeOfWasteModel = el;
                    });
                }

                this.onSaveWasteModel = function () {
				                   
				   if (
					self.currentWasteModel.TypeOfWasteModel == undefined || 
                    self.currentWasteModel.Code == undefined || 
					self.currentWasteModel.Code == ''  || 					self.currentWasteModel.Name == undefined || 
					self.currentWasteModel.Name == ''		
					) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                   self.currentWasteModel.TypeOfWasteId = self.currentWasteModel.TypeOfWasteModel.TypeId;

                    //save waste
                    var onSave = undefined;
                    if (self.currentWasteModel.WasteId == undefined || self.currentWasteModel.WasteId == 0)
                        onSave = wasteApi.add;
                    else
                        onSave = wasteApi.update;

                    onSave(self.currentWasteModel).then(function (response) {
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

                this.onRemove = function (waste) {                   

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function(isConfirm){
                        if(isConfirm)
                        {
                            //remove
                            wasteApi.delete([waste.WasteId]).then(function (response) {
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

                this.filterChanged = function () {
                    if (self.typeOfWasteModel != undefined)
                        self.filter.TypeOfWasteId = self.typeOfWasteModel.TypeId;
                    else
                        self.filter.TypeOfWasteId = null;

                    self.filter.Paging.CurrentPage = 1;
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
                    wasteApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.wasteModels = response.data.list;
                            self.totalRowCount = response.data.pager.RowsCount;
                        }
                        else {                            
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }//onList

                this.onLoad = function(){  
                    //first load master data type of wastes
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