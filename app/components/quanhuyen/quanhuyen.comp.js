
angular.module('quanhuyen.comp', ['quanhuyen.api', 'thanhpho.api', 'common.srv']).
    component('quanhuyen', {
        templateUrl: '/app/components/quanhuyen/quanhuyen.tpl.html',
        controller: ['$routeParams', '$q', '$scope', '$rootScope', '$location', 'quanhuyenApi', 'thanhphoApi', 'commonService',
            function ($routeParams, $q, $scope, $rootScope, $location, quanhuyenApi, thanhphoApi, commonService) {
                var self = this;
                self.quanhuyenModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentQuanHuyenModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.onRemoves = function (quanhuyen) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            var selectedQuanHuyens = [];
                            angular.forEach(self.quanhuyenModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedQuanHuyens.push(itm.Id);
                                }
                            });

                            if (selectedQuanHuyens.length == 0) {
                                commonService.showWarningMessage('Chưa chọn quanhuyen cần xóa');
                                return;
                            }

                            //remove
                            quanhuyenApi.delete(selectedQuanHuyens).then(function (response) {
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
                    angular.forEach(self.quanhuyenModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentQuanHuyenModel = {};
                }

                this.onEdit = function (quanhuyen) {
                    self.currentQuanHuyenModel = quanhuyen;

                    self.thanhphoModels.map(function (el) {
                        if (quanhuyen.ThanhphoId == el.Id)
                            self.currentQuanHuyenModel.ThanhphoModel = el;
                    });
                }

                this.onSaveQuanHuyenModel = function () {

                    if (
                        self.currentQuanHuyenModel.Title == undefined ||
                        self.currentQuanHuyenModel.Title == '' 
                    ) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    if (self.currentQuanHuyenModel.ThanhphoModel == undefined) {
                        commonService.showWarningMessage('Chưa chọn thành phố');
                        return;
                    }
                    self.currentQuanHuyenModel.ThanhphoId = self.currentQuanHuyenModel.ThanhphoModel.Id;


                    //save quanhuyen
                    var onSave = undefined;
                    if (self.currentQuanHuyenModel.Id == undefined || self.currentQuanHuyenModel.Id == 0)
                        onSave = quanhuyenApi.add;
                    else
                        onSave = quanhuyenApi.update;

                    onSave(self.currentQuanHuyenModel).then(function (response) {
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

                this.onRemove = function (quanhuyen) {

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            //remove
                            quanhuyenApi.delete([quanhuyen.Id]).then(function (response) {
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

                this.filterChanged = function () {
                    if (self.thanhphoModel != undefined)
                        self.filter.ThanhphoId = self.thanhphoModel.Id;
                    else
                        self.filter.ThanhphoId = null;

                    self.filter.Paging.CurrentPage = 1;
                    self.filter.Paging.PageSize = self.pageSize;
                    self.onList(self.filter);
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

                    quanhuyenApi.list(filter)
                    .then(function (response) {
                        var quanhuyen = response.data;

                        if (quanhuyen.result) {
                            self.quanhuyenModels = quanhuyen.data.list;
                            self.totalRowCount = quanhuyen.data.pager.RowsCount;

                            //mapping
                            quanhuyen.data.list.map(function (qh) {
                                self.thanhphoModels.map(function (tp) {
                                    if (qh.ThanhphoId == tp.Id)
                                    {
                                        qh.ThanhphoModel = tp;
                                    }
                                });
                            });
                        }
                        else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }//onList

                this.onLoad = function () {
                    //load master data
                    thanhphoApi.list({
                        Paging: { PageSize: "100", CurrentPage: 1 }
                    })
                    .then(function (response) {
                        var thanhpho = response.data;

                        if (thanhpho.result) {                            
                            self.thanhphoModels = thanhpho.data.list;

                            //first load data from list
                            self.onList(self.filter);
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