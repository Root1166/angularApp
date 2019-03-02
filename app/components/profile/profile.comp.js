angular.module('profile.comp', ['user.api', 'phongban.api', 'role.api', 'common.srv']).
    component('profile', {
        templateUrl: '/app/components/profile/profile.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', '$window', 'userApi', 'commonService', 'phongbanApi',
            function ($routeParams, $scope, $rootScope, $location, $window, userApi, commonService, phongbanApi) {
                var self = this;
                self.profileModel = {};
                self.profileModel.Avatar = "/assets/images/users/Default-avatar.jpg";

                this.onChangeAvatar = function (file) {
                    var reader = new FileReader();

                    reader.addEventListener("load", function () {
                        self.profileModel.Avatar = reader.result;
                    }, false);

                    if (file) {
                        reader.readAsDataURL(file);
                    }
                }

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

                this.onSaveProfile = function () {
                    userApi.save_my_account(self.profileModel).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            // self.profileModel = response.data;
                            //window.location.reload();
                            commonService.showSuccessMessage("Cập nhật hồ sơ thành công!");
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