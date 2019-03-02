angular.module('permission.comp', ['role.api', 'common.srv']).
    component('permission', {
        templateUrl: '/app/components/permission/permission.tpl.html',
        controller: ['roleApi', 'commonService', '$q', function (roleApi, commonService, $q) {
            var self = this;

            this.toggleGroup = function (role, group, obj) {
                
                if (obj == true) {//check all
                    for (var i = 0; i < group.Permissions.length; i++) {
                        var permission = group.Permissions[i];

                        if (role.Permissions != null) {
                            role.Permissions += permission.Code + ';';
                        }
                        else {
                            role.Permissions = ';' + permission.Code + ';';
                        }
                    }//for
                }
                else {//uncheck all
                    for (var i = 0; i < group.Permissions.length; i++) {
                        var permission = group.Permissions[i];

                        if (role.Permissions != null) {
                            if (role.Permissions.indexOf(';' + permission.Code + ';') >= 0) {
                                role.Permissions = role.Permissions.replace(';' + permission.Code + ';', ';');
                            }
                        }
                    }//for
                }//if

                roleApi.update(role).then(function (response) {
                    var response = response.data;
                    if (response.result) {
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

            this.togglePermission = function (role, permission) {
                if (role.Permissions != null) {
                    if (role.Permissions.indexOf(';' + permission.Code + ';') >= 0) {
                        role.Permissions = role.Permissions.replace(';' + permission.Code + ';', ';');
                    }
                    else {
                        role.Permissions += permission.Code + ';';
                    }
                }
                else {
                    role.Permissions = ';' + permission.Code + ';';
                }

                roleApi.update(role).then(function (response) {
                    var response = response.data;
                    if (response.result) {
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

            this.isChecked = function (role, permission) {
                if (role.Permissions != null && role.Permissions.indexOf(';' + permission.Code + ';') >= 0) {
                    return true;
                }
                return false;
            }

            this.isGroupChecked = function (role, group) {
                var isChecked = false;

                for (var i = 0; i < group.Permissions.length; i++) {
                    isChecked = self.isChecked(role, group.Permissions[i]);
                    if (isChecked == false)
                        break;
                }//for
                //console.log('role:' + role.RoleName + ', group:' + group.Name + ', checked:' + isChecked)
                return isChecked;
            }

            this.onLoad = function () {
                $q.all({ permissions: roleApi.list_permissions(), roles: roleApi.list() }).then(function (response) {

                    if (response.permissions.data.result && response.roles.data.result) {
                        self.permissionModels = response.permissions.data.data;
                        self.roleModels = response.roles.data.data;
                    }
                    else {
                        commonService.showWarningMessage(response.message);
                    }

                }, function (error) {
                    commonService.handlError(error.data);
                });
            }

            this.onLoad();
        }]
    });