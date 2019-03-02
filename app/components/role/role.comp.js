
angular.module('role.comp', ['role.api', 'common.srv']).
    component('role', {
        templateUrl: '/app/components/role/role.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'roleApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, roleApi, commonService) {
                var self = this;
                self.roleModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentRoleModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.onRemoves = function (role) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            var selectedRoles = [];
                            angular.forEach(self.roleModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedRoles.push(itm.RoleId);
                                }
                            });

                            if (selectedRoles.length == 0) {
                                commonService.showWarningMessage('Chưa chọn role cần xóa');
                                return;
                            }

                            //remove
                            roleApi.delete(selectedRoles).then(function (response) {
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
                    angular.forEach(self.roleModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentRoleModel = {};
                }

                this.onEdit = function (role) {
                    self.currentRoleModel = role;
                }

                this.onSaveRoleModel = function () {

                    if (
                        self.currentRoleModel.RoleName == undefined ||
                        self.currentRoleModel.RoleName == '' || self.currentRoleModel.Title == undefined ||
                        self.currentRoleModel.Title == ''
                    ) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    //save role
                    var onSave = undefined;
                    if (self.currentRoleModel.RoleId == undefined || self.currentRoleModel.RoleId == 0)
                        onSave = roleApi.add;
                    else
                        onSave = roleApi.update;

                    onSave(self.currentRoleModel).then(function (response) {
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

                this.onRemove = function (role) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            roleApi.delete([role.RoleId]).then(function (response) {
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
                    roleApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.roleModels = response.data;
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