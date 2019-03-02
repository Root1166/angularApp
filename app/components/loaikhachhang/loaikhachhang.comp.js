
angular.module('loaikhachhang.comp', ['loaikhachhang.api', 'common.srv']).
    component('loaikhachhang', {
        templateUrl: '/app/components/loaikhachhang/loaikhachhang.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'loaikhachhangApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, loaikhachhangApi, commonService) {
                var self = this;
                self.loaikhachhangModels = [];
                self.currentPage = 1;
                self.pageSize = '50';
                self.totalRowCount = 0;
                self.currentLoaiKhachhangModel = {};
                self.filter = {
                    "Search": self.search,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };

                this.onRemoves = function (loaikhachhang) {
                    
                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function(isConfirm){
                        if(isConfirm)
                        {
                            var selectedLoaiKhachhangs = [];
                            angular.forEach(self.loaikhachhangModels, function (itm) {
                                if (itm.selected == true) {
                                    selectedLoaiKhachhangs.push(itm.LoaiKhachhangId);
                                }
                            });

                            if (selectedLoaiKhachhangs.length == 0) {
                                commonService.showWarningMessage('Chưa chọn loaikhachhang cần xóa');
                                return;
                            }

                            //remove
                            loaikhachhangApi.delete(selectedLoaiKhachhangs).then(function (response) {
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
                    angular.forEach(self.loaikhachhangModels, function (itm) { itm.selected = toggleStatus; });
                }

                this.onAdd = function () {
                    self.currentLoaiKhachhangModel = {};
                }

                this.onEdit = function (loaikhachhang) {
                    self.currentLoaiKhachhangModel = loaikhachhang;
                }

                this.onSaveLoaiKhachhangModel = function () {
				                   
				   if (
                      self.currentLoaiKhachhangModel.TenLoai == undefined || 
					  self.currentLoaiKhachhangModel.TenLoai == '' 
					) {
                        commonService.showWarningMessage('Yêu cầu nhập đầy đủ thông tin');
                        return;
                    }

                    //save loaikhachhang
                    var onSave = undefined;
                    if (self.currentLoaiKhachhangModel.LoaiKhachhangId == undefined || self.currentLoaiKhachhangModel.LoaiKhachhangId == 0)
                        onSave = loaikhachhangApi.add;
                    else
                        onSave = loaikhachhangApi.update;

                    onSave(self.currentLoaiKhachhangModel).then(function (response) {
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

                this.onRemove = function (loaikhachhang) {                   

                    commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function(isConfirm){
                        if(isConfirm)
                        {
                            //remove
                            loaikhachhangApi.delete([loaikhachhang.LoaiKhachhangId]).then(function (response) {
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
                    loaikhachhangApi.list(filter).then(function (response) {
                        var response = response.data;

                        if (response.result) {
                            self.loaikhachhangModels = response.data.list;
                            self.totalRowCount = response.data.pager.RowsCount;
                        }
                        else {                            
                            commonService.showWarningMessage(response.message);
                        }
                    }, function (error) {
                        commonService.handlError(error.data);
                    });
                }//onList

                this.onLoad = function(){  
                    //first load data from list
                    self.onList(self.filter);
                }
                
                this.onLoad();
            }
        ]
    });