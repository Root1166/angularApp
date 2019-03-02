angular.module('setting.comp', ['user.api', 'phongban.api', 'role.api', 'common.srv']).
    component('setting', {
        templateUrl: '/app/components/profile/setting.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', '$window', 'userApi', 'commonService', 'phongbanApi',
            function ($routeParams, $scope, $rootScope, $location, $window, userApi, commonService, phongbanApi) {
                var self = this;
                self.profileModel = {};
                self.profileModel.Avatar = "/assets/images/users/Default-avatar.jpg";

                this.onLoad = function () {
                    userApi.get_my_account().then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.profileModel = response.data;
                            phongbanApi.get_by_id(self.profileModel.PhongbanId).then(function (res) {
                                self.DepartmentModel = res.data.data;
                                console.log(self.DepartmentModel);
                            })
                        }
                        else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });

                    userApi.get_my_roles().then(function (res) {
                        if (res.data.result) {
                            self.RoleNames = '';
                            var i = 0;
                            res.data.data.map(function (el) {
                                self.RoleNames += el.RoleName;
                                i++;
                                if (i < res.data.data.length)
                                {
                                    self.RoleNames += ", ";
                                }
                            });
                        }
                    })
                }//onLoad

                this.onSaveSetting = function () {
                    if (self.profileModel.OldPassword == undefined || self.profileModel.OldPassword == '' || self.profileModel.NewPassword == undefined || self.profileModel.NewPassword == '' || self.profileModel.ConfirmPassword == undefined || self.profileModel.ConfirmPassword == '') {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');

                        return;
                    }

                    if (self.profileModel.NewPassword != self.profileModel.ConfirmPassword) {
                        commonService.showWarningMessage('Mật khẩu xác nhận không giống mật khẩu mới');

                        return;
                    }

                    userApi.change_password(self.profileModel.OldPassword, self.profileModel.NewPassword).then(function (response)
                    {
                        var response = response.data;

                        if (response.result) {
                            commonService.showSuccessMessage("Cập nhật thành công!");
                            window.location.href = "/login.html";
                        }
                        else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }//onLoad

                self.onLoad();
            }]
    });