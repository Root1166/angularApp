angular.module('sidebar.comp', ['user.api', 'common.srv']).
    component('sidebar', {
        templateUrl: '/app/shared/components/sidebar/sidebar.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', '$window', 'userApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, $window, userApi, commonService) {
                var self = this;
                self.profileModel = {};
                self.listCustomerBySale = "D/S KH đã chuyển sale";

                this.onCheckPermission = function () {
                    if (self.profileModel.Roles != undefined &&
                        self.profileModel.Roles.indexOf(";" + SYSTEM_ROLES.Administrators + ";") >= 0) {
                        self.hasPermissionManageMarket = true;
                        self.hasPermissionManageSaleProgram = true;
                        self.hasPermissionManageSalesManagement = true;
                        self.hasPermissionManageTechnician = true;
                        self.hasPermissionManageProduct = true;
                        self.hasPermissionManageStatic = true;
                        self.hasPermissionManageDistributor = true;
                        self.hasPermissionManageSystem = true;
                        self.hasSalesManagement = false;
                    }

                    if (self.profileModel.Roles != undefined &&
                        self.profileModel.Roles.indexOf(";" + SYSTEM_ROLES.Marketers + ";") >= 0) {
                        self.hasPermissionManageMarket = true;
                        self.hasPermissionManageSalesManagement = true;
                        self.hasPermissionManageSaleProgram = false;
                        self.hasPermissionManageTechnician = false;
                        self.hasPermissionManageProduct = false;
                        self.hasPermissionManageStatic = false;
                        self.hasPermissionManageDistributor = false;
                        self.hasPermissionManageSystem = false;
                        self.hasSalesManagement = false;
                    }

                    if (self.profileModel.Roles != undefined &&
                        self.profileModel.Roles.indexOf(";" + SYSTEM_ROLES.Salers + ";") >= 0) {
                        self.hasPermissionManageMarket = false;
                        self.hasPermissionManageSaleProgram = true;
                        self.hasPermissionManageSalesManagement = false;
                        self.hasPermissionManageTechnician = false;
                        self.hasPermissionManageProduct = false;
                        self.hasPermissionManageStatic = false;
                        self.hasPermissionManageDistributor = false;
                        self.hasPermissionManageSystem = false;
                        self.hasSalesManagement = true;
                        self.listCustomerBySale = "D/S khách hàng";
                    }
                    if (self.profileModel.Roles != undefined &&
                        self.profileModel.Roles.indexOf(";" + SYSTEM_ROLES.Technician + ";") >= 0) {
                        self.hasPermissionManageMarket = false;
                        self.hasPermissionManageSaleProgram = false;
                        self.hasPermissionManageTechnician = true;
                        self.hasPermissionManageProduct = false;
                        self.hasPermissionManageStatic = false;
                        self.hasPermissionManageDistributor = false;
                        self.hasPermissionManageSystem = false;
                        self.hasSalesManagement = false;
                    }
                    if (self.profileModel.Roles != undefined &&
                        self.profileModel.Roles.indexOf(";" + SYSTEM_ROLES.SalesManagement + ";") >= 0) {
                        self.hasPermissionManageMarket = false;
                        self.hasPermissionManageSaleProgram = true;
                        self.hasPermissionManageSalesManagement = true;
                        self.hasPermissionManageTechnician = false;
                        self.hasPermissionManageProduct = false;
                        self.hasPermissionManageStatic = false;
                        self.hasPermissionManageDistributor = false;
                        self.hasPermissionManageSystem = false;
                        self.hasSalesManagement = true;
                    }

                    if (self.profileModel.Roles != undefined &&
                        self.profileModel.Roles.indexOf(";" + SYSTEM_ROLES.MarketingManager + ";") >= 0) {
                        self.hasPermissionManageMarket = true;
                        self.hasPermissionManageSaleProgram = true;
                        self.hasPermissionManageSalesManagement = true;
                        self.hasPermissionManageTechnician = true;
                        self.hasPermissionManageProduct = true;
                        self.hasPermissionManageStatic = true;
                        self.hasPermissionManageDistributor = true;
                        self.hasPermissionManageSystem = true;
                        self.hasSalesManagement = true;
                    }
                }
                this.onLoad = function () {
                    userApi.get_my_account().then(function (response) {
                        var response = response.data;
                        if (response.result) {
                            self.profileModel = response.data;
                            self.onCheckPermission();
                        }
                        else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                self.onLoad();
            }]
    });
