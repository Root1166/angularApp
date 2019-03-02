angular.module('notification.comp', ['notify.api', 'common.srv']).
    component('notification', {
        templateUrl: '/app/components/notification/notification.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'notifyApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, notifyApi, commonService) {
                var self = this;
                self.notifyModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.getResourceLink = function (notify) {
                    if (notify.ResourceType == 1) {//ke hoach san xuat
                        return "home.production.edit({ id: " + notify.ObjectId + " })";
                    }
                    else {//hop dong
                        return "home.contract.edit({ id: " + notify.ObjectId + " })";
                    }
                }

                this.onRemoves = function (notify) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            var selectedUsers = [];
                            angular.forEach(self.notifyModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedUsers.push(itm.Id);
                                }
                            });

                            if (selectedUsers.length == 0) {
                                commonService.showWarningMessage('Chưa chọn notify cần xóa');
                                return;
                            }

                            //remove
                            notifyApi.delete(selectedUsers).then(function (response) {
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
                    angular.forEach(self.notifyModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onPreview = function (notify, link) {
                    console.log(link);

                    notifyApi.preview([notify.Id]).then(function (response) {
                        var response = response.data;
                        if (response.result) {
                            if (notify.ResourceType==1)
                                $location.path('/production/edit/' + notify.Id);
                            else
                                $location.path('/contract/edit/' + notify.Id);
                        }
                        else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });                
                }

                this.onRemove = function (notify) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            notifyApi.delete([notify.Id]).then(function (response) {
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
                    notifyApi.get_my_notifications(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.notifyModels = response.data.list;
                            self.totalRowCount = response.data.pager.RowsCount;
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
                    self.onList(self.filter);
                }

                this.onLoad();
            }
        ]
    });