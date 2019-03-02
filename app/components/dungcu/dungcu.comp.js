angular.module('dungcu.comp', ['dungcu.api', 'common.srv'])
    .component('dungcu', {
        templateUrl: '/app/components/dungcu/dungcu.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'dungcuApi', 'commonService', 'userApi',
            function($routeParams, $scope, $rootScope, $location, dungcuApi, commonService, userApi) {
                var self = this;
                self.show = false;
                self.dungcuModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.liTaikhoan = [];
                self.currentDungcuModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };
                this.onAdd = function() {
                    self.show = !self.show;
                }
                this.searchUser = function(searchText) {
                    var filter = {
                        "Search": searchText,
                        "Paging": {
                            "PageSize": self.pageSize,
                            "CurrentPage": self.currentPage,
                        }
                    };
                    return userApi.list(filter).then(function(response) {
                        console.log(response.data.data.list);
                        return response.data.data.list

                    });

                }
                this.onSelectNguoimua = function(item) {
                    if (typeof item == 'object')
                        self.currentDungcuModel.NguoimuaId = item.TaikhoanId;
                    else
                        self.currentDungcuModel.NguoimuaId = self.currentDungcuModel.NguoimuaId;
                }
                this.onSelectNguoigiao = function(item) {
                    if (typeof item == 'object'){
                        self.currentDungcuModel.NguoigiaoId = item.TaikhoanId;
                        self.currentDungcuModel.Nguoigiao = item.Hovaten;
                    }
                    else
                        self.currentDungcuModel.NguoigiaoId = self.currentDungcuModel.NguoigiaoId;
                }
                this.onSelectNguoinhan = function(item) {
                    if (typeof item == 'object')
                        self.currentDungcuModel.NguoinhanId = item.TaikhoanId;
                    else
                        self.currentDungcuModel.NguoinhanId = self.currentDungcuModel.NguoinhanId;
                }

                self.onPageChanged = function (pageIndex) {
                    self.filter.Paging.CurrentPage = pageIndex;
                    self.filter.Paging.PageSize = self.pageSize;
                    self.onList(self.filter);
                }
                self.onRemove = function (dungcu) {
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function (isConfirm) {
                        if (isConfirm) {
                            dungcuApi.delete([dungcu.Id]).then(function (response) {
                                var response = response.data;
                                if (response.result) {
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
                this.onEdit = function(dungcu) {
                    self.currentDungcuModel = angular.copy(dungcu);
                }
                this.onCanel = function() {
                    self.currentDungcuModel = {};
                }
                this.onSearch = function($event) {
                    if ($event.keyCode == 13) {
                        self.filter.Search = self.search;
                        self.onList(self.filter);
                    }
                }
                self.onSaveDungcuModel = function () {
                    if (
                        self.currentDungcuModel.Ghichu == '' || self.currentDungcuModel.Ngaygiao == undefined ||
                        self.currentDungcuModel.TenDungcu == '' || self.currentDungcuModel.Ngaygiao == ''
                        || self.currentDungcuModel.Ngaynhan == ''|| self.currentDungcuModel.Ngaynhan == undefined
                    ) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }
                    var onSave = undefined;
                    if (self.currentDungcuModel.Id == undefined || self.currentDungcuModel.Id == 0)
                        onSave = dungcuApi.add;
                    else
                        onSave = dungcuApi.update;
                    onSave(self.currentDungcuModel).then(function (response) {
                        var response = response.data;
                        if (response.result) {
                            self.filter.Paging.CurrentPage = 1;
                            self.filter.Paging.PageSize = self.pageSize;
                            self.onList(self.filter);
                            self.currentDungcuModel = {};
                            if(onSave == dungcuApi.update){
                                commonService.showSuccessMessage('Thêm thành công!');
                            }
                            else
                            commonService.showSuccessMessage('Cập nhật thành công!');
                        }
                        else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.getNguoinhan = function (NguoinhanId,dungcu) {
                    userApi.get_by_id(NguoinhanId).then(function(response) {
                        if (response.data.result) {
                            dungcu.Nguoinhan = response.data.data.Hovaten;
                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }
                this.getNguoimua = function (NguoimuaId,dungcu) {
                    if(NguoimuaId==0){
                        dungcu.Nguoimua = null;
                    }
                    else{
                        userApi.get_by_id(NguoimuaId).then(function(response) {
                            if (response.data.result) {
                                dungcu.Nguoimua = response.data.data.Hovaten;
                            } else {
                                commonService.showWarningMessage(response.data.message);
                            }
                        }, function (error) {
                            commonService.handlError(error.data);
                        });
                    }

                }
                this.getNguoigiao = function (NguoigiaoId,dungcu) {
                    userApi.get_by_id(NguoigiaoId).then(function(response) {
                        if (response.data.result) {
                            dungcu.Nguoigiao = response.data.data.Hovaten;
                        } else {
                            commonService.showWarningMessage(response.data.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }

                this.onList = function(filter) {
                    dungcuApi.list(filter).then(function(response) {
                        var response = response.data;
                        if (response.result) {
                            self.dungcuModels = response.data.list;
                            self.totalRowCount = response.data.pager.RowsCount;
                            self.dungcuModels.forEach(function (dungcu) {
                                self.getNguoimua(dungcu.NguoimuaId,dungcu);
                                self.getNguoinhan(dungcu.NguoinhanId,dungcu);
                                self.getNguoigiao(dungcu.NguoigiaoId,dungcu);
                            })
                            console.log(self.dungcuModels);

                        } else {
                            commonService.showWarningMessage(response.message);
                        }
                    }, function(error) {
                        commonService.handlError(error.data);
                    });
                } //onList
                self.onLoad = function() {
                    self.onList(self.filter);
                }
                self.onLoad();

            }
        ]
    });
