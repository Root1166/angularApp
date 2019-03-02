
angular.module('department.comp', ['department.api', 'common.srv']).
    component('department', {
        templateUrl: '/app/components/department/department.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'departmentApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, departmentApi, commonService) {
                var self = this;
                self.departmentModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentDepartmentModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.onRemoves = function (department) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            var selectedDepartments = [];
                            angular.forEach(self.departmentModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedDepartments.push(itm.Id);
                                }
                            });

                            if (selectedDepartments.length == 0) {
                                commonService.showWarningMessage('Chưa chọn department cần xóa');
                                return;
                            }

                            //remove
                            departmentApi.delete(selectedDepartments).then(function (response) {
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
                    angular.forEach(self.departmentModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentDepartmentModel = {};
                }

                this.onEdit = function (department) {
                    self.currentDepartmentModel = department;
                }

                this.onSaveDepartmentModel = function () {

                    if (
                        self.currentDepartmentModel.Name == undefined ||
                        self.currentDepartmentModel.Name == '' || self.currentDepartmentModel.Description == undefined ||
                        self.currentDepartmentModel.Description == ''
                    ) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    //save department
                    var onSave = undefined;
                    if (self.currentDepartmentModel.Id == undefined || self.currentDepartmentModel.Id == 0)
                        onSave = departmentApi.add;
                    else
                        onSave = departmentApi.update;

                    onSave(self.currentDepartmentModel).then(function (response) {
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

                this.onRemove = function (department) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            departmentApi.delete([department.Id]).then(function (response) {
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
                    departmentApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.departmentModels = response.data;
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