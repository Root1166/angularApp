
angular.module('stock-card.comp', ['common.srv']).
    component('stockCard', {
        templateUrl: '/app/components/stock/card.tpl.html',
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
                    Sochungtu: "02.03.04",
                    Loaithe: "Nhập",
                    Ma: "PNNL2017312312",
                    Tendoituong: "Công ty ABC",
                    Loaidoithuong: "Khách hàng",
                    Soluong: "200 kg",
                    Ngay: "21/01/2018",
                    Nguoi: "Nguyễn Thị A",
                    Kho: "CT",
                    Vitri:"X5-1"
                },
                {
                    Sochungtu: "02.03.04",
                    Loaithe: "Nhập",
                    Ma: "PNNL2017312312",
                    Tendoituong: "Công ty ABC",
                    Loaidoithuong: "Khách hàng",
                    Soluong: "200 kg",
                    Ngay: "21/01/2018",
                    Nguoi: "Nguyễn Thị A",
                    Kho: "CT",
                    Vitri: "X5-1"
                },
                {
                    Sochungtu: "02.03.04",
                    Loaithe: "Nhập",
                    Ma: "PNNL2017312312",
                    Tendoituong: "Công ty ABC",
                    Loaidoithuong: "Khách hàng",
                    Soluong: "200 kg",
                    Ngay: "21/01/2018",
                    Nguoi: "Nguyễn Thị A",
                    Kho: "CT",
                    Vitri: "X5-1"
                },
                {
                    Sochungtu: "02.03.04",
                    Loaithe: "Nhập",
                    Ma: "PNNL2017312312",
                    Tendoituong: "Công ty ABC",
                    Loaidoithuong: "Khách hàng",
                    Soluong: "200 kg",
                    Ngay: "21/01/2018",
                    Nguoi: "Nguyễn Thị A",
                    Kho: "CT",
                    Vitri: "X5-1"
                }];
            }
        ]
    });