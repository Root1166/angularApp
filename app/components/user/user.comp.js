angular.module('user.comp', ['user.api', 'phongban.api', 'role.api', 'common.srv']).
    component('user', {
        templateUrl: '/app/components/user/user.tpl.html?v=' + APP_VERSION,
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'userApi', 'phongbanApi', 'roleApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, userApi, phongbanApi, roleApi, commonService) {
                var self = this;
                self.profileModel = {};
                self.userModels = [];
                self.departmentModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentUserModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };
                this.onRemoves = function (user) {
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            var selectedUsers = [];
                            angular.forEach(self.userModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedUsers.push(itm.TaikhoanId);
                                }
                            });

                            if (selectedUsers.length == 0) {
                                commonService.showWarningMessage('Chưa chọn user cần xóa');
                                return;
                            }

                            //remove
                            userApi.delete(selectedUsers).then(function (response) {
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
                    angular.forEach(self.userModels, function (itm) { itm.selected = toggleStatus; });
                }
                this.onAdd = function () {
                    self.currentUserModel = {};
                }
                this.onEdit = function (user) {
                    self.currentUserModel = user;

                    self.departmentModels.map(function (el) {
                        if (user.PhongbanId == el.PhongbanId)
                            self.currentUserModel.DepartmentModel = el;
                    });
                    var roles = []
                    self.roleModels.map(function (el) {
                        if (self.currentUserModel.Roles.indexOf(";" + el.RoleId + ";") >= 0)
                            roles.push(el);
                    });
                    self.currentUserModel.RoleModels = roles;
                }
                this.onSaveUserModel = function () {

                    if (self.currentUserModel.Hovaten == undefined || self.currentUserModel.Hovaten == '' || self.currentUserModel.Email == undefined || self.currentUserModel.Email == '' || self.currentUserModel.Mobile == undefined || self.currentUserModel.Mobile == '') {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    if (self.currentUserModel.TaikhoanId == undefined && (self.currentUserModel.Matkhau == undefined || self.currentUserModel.Matkhau == '')) {
                        commonService.showWarningMessage('Chưa nhập mật khẩu');
                        return;
                    }

                    if (self.currentUserModel.DepartmentModel == undefined) {
                        commonService.showWarningMessage('Chưa chọn phòng ban/bộ phận');
                        return;
                    }

                    if (self.currentUserModel.RoleModels == undefined) {
                        commonService.showWarningMessage('Chưa chọn vai trò');
                        return;
                    }

                    self.currentUserModel.PhongbanId = self.currentUserModel.DepartmentModel.PhongbanId;

                    self.currentUserModel.Roles = ";";
                    self.currentUserModel.RoleModels.map(function (el) {
                        self.currentUserModel.Roles += el.RoleId + ";";
                    })

                    //save user
                    var onSave = undefined;
                    if (self.currentUserModel.TaikhoanId == undefined || self.currentUserModel.TaikhoanId == 0)
                        onSave = userApi.add;
                    else
                        onSave = userApi.update;

                    onSave(self.currentUserModel).then(function (response) {
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
                this.onResetPass = function (user) {
                    self.changePassUserModel = user;
                }
                this.onSavePass = function () {
                    if (self.changePassUserModel == undefined) {
                        commonService.showWarningMessage('Chưa chọn user đổi mật khẩu');
                        return;
                    }

                    if (self.changePassUserModel.Password == '' ||
                        self.changePassUserModel.Password == undefined ||
                        self.changePassUserModel.ConfirmPassword == '' ||
                        self.changePassUserModel.ConfirmPassword == undefined) {
                        commonService.showWarningMessage('Mật khẩu không được để trống');
                        return;
                    }

                    if (self.changePassUserModel.Password != self.changePassUserModel.ConfirmPassword) {
                        commonService.showWarningMessage('Mật khẩu và xác nhận mật khẩu không trùng nhau');
                        return;
                    }

                    //reset password
                    userApi.reset_password(self.changePassUserModel.TaikhoanId, self.changePassUserModel.Password).then(function (response) {
                        var response = response.data;
                        if (response.result) {
                            self.filter.Paging.CurrentPage = 1;
                            self.filter.Paging.PageSize = self.pageSize;
                            self.onList(self.filter);

                            $scope.dismiss();

                            //show message
                            commonService.showSuccessMessage('Reset mật khẩu thành công!');
                        }
                        else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onRemove = function (user) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            userApi.delete([user.TaikhoanId]).then(function (response) {
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

                this.onLock = function (user) {
                    //remove
                    userApi.lock(user.TaikhoanId).then(function (response) {
                        var response = response.data;
                        if (response.result) {
                            self.filter.Paging.CurrentPage = 1;
                            self.filter.Paging.PageSize = self.pageSize;
                            self.onList(self.filter);

                            //show message
                            commonService.showSuccessMessage('Khóa tài khoản thành công!');
                        }
                        else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onPageChanged = function (pageIndex) {
                    self.filter.Paging.CurrentPage = pageIndex;
                    self.filter.Paging.PageSize = self.pageSize;
                    self.onList(self.filter);
                }

                this.filterChanged = function () {
                    if (self.departmentModel != undefined)
                        self.filter.PhongbanId = self.departmentModel;
                    else
                        self.filter.PhongbanId = null;

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
                    userApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.userModels = response.data.list;
                            self.totalRowCount = response.data.pager.RowsCount;

                            //binding
                            for (i = 0; i < self.userModels.length; i++) {
                                self.departmentModels.map(function (el) {
                                    if (el.PhongbanId == self.userModels[i].PhongbanId) {
                                        self.userModels[i].DepartmentName = el.TenPhongban;
                                    }
                                });
                            }//for

                            if (self.profileModel.Roles === ';' + SYSTEM_ROLES.MarketingManager + ';') {
                                self.userModels.forEach(user => {
                                    user.Mobile = '**********';
                                    user.Email = '**********';
                                });
                            }
                        }
                        else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }//onList

                this.onLoad = function () {

                    //first load master data departments
                    phongbanApi.list({ Paging: { PageSize: 100, CurrentPage: 1 } }).then(function (response) {
                        if (response.data.result) {
                            self.departmentModels = response.data.data.list;
                            self.onList(self.filter);
                        }//if
                    }, function (error) {
                        commonService.handlError(error.data);
                    });

                    roleApi.list().then(function (response) {
                        if (response.data.result) {
                            self.roleModels = response.data.data;
                        }//if
                    }, function (error) {
                        commonService.handlError(error.data);
                    });

                    userApi.get_my_account().then(function (response) {
                        var response = response.data;
                        if (response.result) {
                            self.profileModel = response.data;
                            console.log(self.profileModel);
                            self.onList();
                        }
                        else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onLoad();
            }
        ]
    });