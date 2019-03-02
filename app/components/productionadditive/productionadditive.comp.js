
angular.module('productionadditive.comp', ['productionadditive.api', 'common.srv']).
    component('productionadditive', {
        templateUrl: '/app/components/productionadditive/productionadditive.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'productionadditiveApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, productionadditiveApi, commonService) {
                var self = this;
                self.productionadditiveModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentProductionAdditiveModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.onRemoves = function (productionadditive) {
                    
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function(isConfirm){
                        if(isConfirm)
                        {
                            var selectedProductionAdditives = [];
                            angular.forEach(self.productionadditiveModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedProductionAdditives.push(itm.AdditiveId);
                                }
                            });

                            if (selectedProductionAdditives.length == 0) {
                                commonService.showWarningMessage('Chưa chọn productionadditive cần xóa');
                                return;
                            }

                            //remove
                            productionadditiveApi.delete(selectedProductionAdditives).then(function (response) {
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
                    angular.forEach(self.productionadditiveModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentProductionAdditiveModel = {};
                }

                this.onEdit = function (productionadditive) {
                    self.currentProductionAdditiveModel = productionadditive;
                }

                this.onSaveProductionAdditiveModel = function () {
				                   
				   if (
                    self.currentProductionAdditiveModel.Code == undefined || 
					self.currentProductionAdditiveModel.Code == ''  || 										self.currentProductionAdditiveModel.Name == undefined || 
					self.currentProductionAdditiveModel.Name == ''										
					) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    //save productionadditive
                    var onSave = undefined;
                    if (self.currentProductionAdditiveModel.AdditiveId == undefined || self.currentProductionAdditiveModel.AdditiveId == 0)
                        onSave = productionadditiveApi.add;
                    else
                        onSave = productionadditiveApi.update;

                    onSave(self.currentProductionAdditiveModel).then(function (response) {
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

                this.onRemove = function (productionadditive) {                   

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function(isConfirm){
                        if(isConfirm)
                        {
                            //remove
                            productionadditiveApi.delete([productionadditive.AdditiveId]).then(function (response) {
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
                    productionadditiveApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.productionadditiveModels = response.data;
                        }
                        else {                            
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }//onList

                this.onLoad = function(){  
                    //first load data from list
                    self.onList(self.filter);
                }
                
                this.onLoad();
            }
        ]
    });