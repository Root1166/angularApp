
angular.module('product-edit.comp', ['nhacungcap.api', 'common.srv']).
component('productEdit', {
    templateUrl: '/app/components/product/edit.tpl.html',
    controller: ['$routeParams', '$scope', 'productApi', '$rootScope', '$location', 'commonService', 'nhomsanphamApi',
        'nhacungcapApi', 'hangsanxuatApi', 'nhucaugiaApi',
        function($routeParams, $scope, productApi, $rootScope, $location, commonService,
            nhomsanphamApi, nhacungcapApi, hangsanxuatApi, nhucaugiaApi) {
            var self = this;
            self.status = false;
            self.id = $routeParams.id;
            self.currentPage = 1;
            self.pageSize = '50';
            self.totalRowCount = 0;
            self.productModel = {};
            self.filter = {
                "Search": ' ',
                "Paging": {
                    "PageSize": self.pageSize,
                    "CurrentPage": self.currentPage,
                }
            };

            self.Giabans = [];
            this.onAddItem = function() {
                var item = {
                    "Gia": "",
                    "NhucaugiaId": ""
                }
                self.Giabans.push(item);
            }
            this.onRemoveItem = function(item) {
                console.log(item);
                self.Giabans.splice(item, 1);

            }
            this.searchNhomsp = function(searchText) {
                self.filter.Search = searchText;
                return nhomsanphamApi.list(self.filter).then(function(response) {
                    return response.data.data.list
                });
            }
            this.onSelectNhomsp = function(item) {
               if (typeof item == 'object'){
                    self.productModel.NhomsanphamId = item.Id;
               }
                else{
                    self.productModel.NhomsanphamId = self.productModel.NhomsanphamId;
                }

            }
            this.searchNhacungcap = function(searchText) {
                self.filter.Search = searchText;
                return nhacungcapApi.list(self.filter).then(function(response){
                    return response.data.data.list
                });
            }
            this.onSelectNhacungcap = function(item){
                if (typeof item == 'object')
                self.productModel.NhacungcapId = item.Id;
                else
                self.productModel.NhacungcapId = self.productModel.NhacungcapId;
            }
            this.onChangeImage = function(file) {
                var reader = new FileReader();
                reader.addEventListener("load", function() {
                    self.productModel.AnhSanpham = reader.result;
                }, false);

                if (file) {
                    reader.readAsDataURL(file);
                }
            }
            this.searchHangsanxuat = function(searchText) {
                self.filter.Search = searchText;
                return hangsanxuatApi.list(self.filter).then(function(response){
                    return response.data.data.list
                });
            }
            this.onSelectHangsanxuat = function(item){
                if (typeof item == 'object')
                self.productModel.HangsanxuatId = item.Id;
                else self.productModel.HangsanxuatId = self.productModel.HangsanxuatId;
            }
            this.searchNhucaugia = function(searchText) {
                self.filter.Search = searchText;
                return nhucaugiaApi.list(self.filter).then(function(response){
                    console.log(response.data.data,"response.data.data");
                    return response.data.data.list
                });
            }
            this.onSelectNhucaugia = function(item,index){
                console.log(item);
                console.log(index);
                if (typeof item == 'object'){
                    self.Giabans[index].NhucaugiaId = item.NhucauId;
                    self.Giabans[index].Nhucau = item.TenNhucau;
                    console.log(self.Giabans[index]);
                }

                else self.Giabans[index].NhucaugiaId = self.Giabans[index].NhucaugiaId ;
            }
            //edit
            this.onLoadSanpham = function() {
                if (self.id) {
                    productApi.get_by_id($routeParams.id).then(function(rs) {
                        var productModel=[];
                        var rs = rs.data;
                        if (rs.result) {
                            productModel = rs.data;
                            console.log(productModel);
                                nhacungcapApi.get_by_id(productModel.NhacungcapId).then(function(response) {
                                    if (response.data.result) {
                                        productModel.TenNhacungcap = response.data.data.TenNhacungcap;
                                    } else {
                                        commonService.showWarningMessage(response.data.message);
                                    }
                                });
                                nhomsanphamApi.get_by_id(productModel.NhomsanphamId).then(function(response) {
                                    if (response.data.result) {
                                        productModel.TenNhomsanpham = response.data.data.TenNhomsanpham;
                                    } else {
                                        commonService.showWarningMessage(response.data.message);
                                    }
                                });
                                hangsanxuatApi.get_by_id(productModel.HangsanxuatId).then(function(response) {
                                    if (response.data.result) {
                                        productModel.TenHangsanxuat = response.data.data.TenHangsanxuat;
                                    } else {
                                        commonService.showWarningMessage(response.data.message);
                                    }
                                });

                            self.productModel = productModel;
                            self.Giabans = rs.data.Giabans;
                        } else {
                            commonService.showWarningMessage(rs.message);
                        }
                        console.log(productModel,'productModel');
                    }, function(error) {
                        commonService.handlError(error.data);
                    });
                } else {
                    self.productModel = {
                        "Giabans": []
                    };
                }
                console.log(self.productModel);
            }
            self.onLoadSanpham();
            self.onSaveproductModel = function() {
                self.productModel.Giabans = self.Giabans;
                var onSave = undefined;
                if (!self.id) {
                    onSave = productApi.add;
                } else {
                    onSave = productApi.update;
                }
                onSave(self.productModel).then(function(rs) {
                    console.log(self.productModel);
                    var rs = rs.data;
                    if (rs.result) {
                        if (onSave == productApi.add){
                            if (self.status) {
                                $location.path('/product/list');
                            }
                            self.productModel={};
                            self.Giabans ={}
                             commonService.showSuccessMessage('Thêm sản phẩm thành công !');
                        }
                        else {
                            if (self.status) {
                                $location.path('/product/list');
                            }
                            self.productModel={};
                            self.Giabans ={}
                            commonService.showSuccessMessage('Cập nhật thành công !');
                        }
                    } else {
                        commonService.showWarningMessage(rs.message);
                    }
                }, function(error) {
                    commonService.handlError(error.data);
                });

            }
        }
    ]
});
