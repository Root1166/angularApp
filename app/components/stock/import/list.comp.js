
angular.module('stock-import-list.comp', ['common.srv']).
    component('stockImportList', {
        templateUrl: '/app/components/stock/import/list.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'contracttypeApi', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, contracttypeApi, commonService) {

                switch ($routeParams.status) {
                    case 'expired':
                        this.pageTitle = 'DANH SÁCH HỢP ĐỒNG HẾT HẠN';

                        break;
                    case 'preparative_expired':
                        this.pageTitle = 'DANH SÁCH HỢP ĐỒNG CHUẨN BỊ HẾT HẠN';

                        break;
                    case 'still_limited':
                        this.pageTitle = 'DANH SÁCH HỢP ĐỒNG CÒN HẠN';

                        break;
                    default:
                        this.pageTitle = 'DANH SÁCH PHIẾU BÁN HÀNG';
                        break;
                }

                this.listContracts = [{
                    Mahang: "02.03.04",
                    Tenhang: "Bùn thải có các TPNH từ quá trình xử lý nước thải",
                    TongKL: "350 kg",
                    Kho: "CT",
                    Vitri: "X5.1",
                    Ngaynhapkho: "12/2/2017",
                },
                {
                    Mahang: "02.03.04",
                    Tenhang: "Bùn thải có các TPNH từ quá trình xử lý nước thải",
                    TongKL: "350 kg",
                    Kho: "CT",
                    Vitri: "X5.1",
                    Ngaynhapkho: "12/2/2017",
                },
                {
                    Mahang: "02.03.04",
                    Tenhang: "Bùn thải có các TPNH từ quá trình xử lý nước thải",
                    TongKL: "350 kg",
                    Kho: "CT",
                    Vitri: "X5.1",
                    Ngaynhapkho: "12/2/2017",
                },
                {
                    Mahang: "02.03.04",
                    Tenhang: "Bùn thải có các TPNH từ quá trình xử lý nước thải",
                    TongKL: "350 kg",
                    Kho: "CT",
                    Vitri: "X5.1",
                    Ngaynhapkho: "12/2/2017",
                }];
            }
        ]
    });