
angular.module('contracttype.comp', ['contracttype.api', 'common.srv']).
    component('contracttype', {
        templateUrl: '/app/components/contracttype/contracttype.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'contracttypeApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, contracttypeApi, commonService) {
                var self = this;
                self.contracttypeModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentContractTypeModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.onRemoves = function (contracttype) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            var selectedContractTypes = [];
                            angular.forEach(self.contracttypeModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedContractTypes.push(itm.Id);
                                }
                            });

                            if (selectedContractTypes.length == 0) {
                                commonService.showWarningMessage('Chưa chọn contracttype cần xóa');
                                return;
                            }

                            //remove
                            contracttypeApi.delete(selectedContractTypes).then(function (response) {
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
                    angular.forEach(self.contracttypeModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentContractTypeModel = {};
                }

                this.onEdit = function (contracttype) {
                    self.currentContractTypeModel = contracttype;
                }

                this.onSaveContractTypeModel = function () {

                    if (
                        self.currentContractTypeModel.Name == undefined ||
                        self.currentContractTypeModel.Name == '' 
                    ) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    //save contracttype
                    var onSave = undefined;
                    if (self.currentContractTypeModel.Id == undefined || self.currentContractTypeModel.Id == 0)
                        onSave = contracttypeApi.add;
                    else
                        onSave = contracttypeApi.update;

                    onSave(self.currentContractTypeModel).then(function (response) {
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

                this.onRemove = function (contracttype) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            contracttypeApi.delete([contracttype.Id]).then(function (response) {
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
                    contracttypeApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.contracttypeModels = response.data;
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