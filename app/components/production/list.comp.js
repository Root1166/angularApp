angular.module('production-list.comp', ['common.srv']).
    component('productionList', {
        templateUrl: '/app/components/production/list.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, commonService) {
                this.status = $routeParams.status;

                switch ($routeParams.status) {
                    case 'pending':
                        this.pageTitle = 'KẾ HOẠCH CHƯA SẢN XUẤT';
                        break;

                    case 'inprogress':
                        this.pageTitle = 'KẾ HOẠCH ĐANG SẢN XUẤT';
                        break;

                    case 'completed':
                        this.pageTitle = 'KẾ HOẠCH HOÀN THÀNH';
                        break;

                    case 'stopped':
                        this.pageTitle = 'KẾ HOẠCH TẠM DỪNG';
                        break;

                    default:
                        this.pageTitle = 'DANH SÁCH KẾ HOẠCH';
                        break;
                }

                this.listContracts = [{
                    MaKH: "09123123",                    
                    TenKH: "Công ty cổ phần ABC",
                    Truongca: "Nguyen Van A",
                    Thoigianbatdau: "11/02/2017",
                    Thoigianketthuc: "11/02/2017",
                    Tinhtrangthietbi: "KH Vàng",
                    Ghichu: "abc",
                    Tinhtrang: "Đang sản xuất",
                }, {
                        MaKH: "09123123",
                        TenKH: "Công ty cổ phần ABC",
                        Truongca: "Nguyen Van A",
                        Thoigianbatdau: "11/02/2017",
                        Thoigianketthuc: "11/02/2017",
                        Tinhtrangthietbi: "KH Vàng",
                        Ghichu: "abc",
                        Tinhtrang: "Đang sản xuất",
                }, {
                        MaKH: "09123123",
                        TenKH: "Công ty cổ phần ABC",
                        Truongca: "Nguyen Van A",
                        Thoigianbatdau: "11/02/2017",
                        Thoigianketthuc: "11/02/2017",
                        Tinhtrangthietbi: "KH Vàng",
                        Ghichu: "abc",
                        Tinhtrang: "Đang sản xuất",
                }, {
                        MaKH: "09123123",
                        TenKH: "Công ty cổ phần ABC",
                        Truongca: "Nguyen Van A",
                        Thoigianbatdau: "11/02/2017",
                        Thoigianketthuc: "11/02/2017",
                        Tinhtrangthietbi: "KH Vàng",
                        Ghichu: "abc",
                        Tinhtrang: "Đang sản xuất",
                }];

            }]
    });