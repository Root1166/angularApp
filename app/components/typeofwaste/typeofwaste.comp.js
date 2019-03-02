
angular.module('typeofwaste.comp', ['typeofwaste.api', 'common.srv']).
    component('typeofwaste', {
        templateUrl: '/app/components/typeofwaste/typeofwaste.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'typeofwasteApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, typeofwasteApi, commonService) {
                var self = this;
                self.typeofwasteModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentTypeOfWasteModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.onRemoves = function (typeofwaste) {
                    
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function(isConfirm){
                        if(isConfirm)
                        {
                            var selectedTypeOfWastes = [];
                            angular.forEach(self.typeofwasteModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedTypeOfWastes.push(itm.TypeId);
                                }
                            });

                            if (selectedTypeOfWastes.length == 0) {
                                commonService.showWarningMessage('Chưa chọn typeofwaste cần xóa');
                                return;
                            }

                            //remove
                            typeofwasteApi.delete(selectedTypeOfWastes).then(function (response) {
                                var response = response.data;
                                if (response.result) {
                                    self.onList();

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
                    angular.forEach(self.typeofwasteModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentTypeOfWasteModel = {};
                }

                this.onEdit = function (typeofwaste) {
                    self.currentTypeOfWasteModel = typeofwaste;
                }

                this.onSaveTypeOfWasteModel = function () {
				                   
				   if (
                    self.currentTypeOfWasteModel.TypeName == undefined || 
                    self.currentTypeOfWasteModel.TypeName == '' 
					) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    //save typeofwaste
                    var onSave = undefined;
                    if (self.currentTypeOfWasteModel.TypeId == undefined || self.currentTypeOfWasteModel.TypeId == 0)
                        onSave = typeofwasteApi.add;
                    else
                        onSave = typeofwasteApi.update;

                    onSave(self.currentTypeOfWasteModel).then(function (response) {
                        var response = response.data;
                        if (response.result) {
                            self.onList();

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

                this.onRemove = function (typeofwaste) {                   

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function(isConfirm){
                        if(isConfirm)
                        {
                            //remove
                            typeofwasteApi.delete([typeofwaste.TypeId]).then(function (response) {
                                var response = response.data;
                                if (response.result) {
                                    self.onList();

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
                    self.onList();
                }
				
                this.onSearch = function ($event) {
                    if ($event.charCode == 13) {
                        self.onList();
                    }
                }

                this.onList = function () {
                    typeofwasteApi.list().then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.typeofwasteModels = response.data;
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
                    self.onList();
                }
                
                this.onLoad();
            }
        ]
    });