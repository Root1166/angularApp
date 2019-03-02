
angular.module('sale-list.comp', ['common.srv']).
    component('saleList', {
        templateUrl: '/app/components/sale/list.tpl.html',
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
                    SoHD: "09123123",
                    LoaiHD: "Mua phế liệu",
                    Ngayky: "12/2/2017",
                    Ngayhethan: "12/2/2018",
                    Ngaygiahan: "",
                    Khaithac: "Nguyễn Văn A",
                    CSKH: "Trần thị B",

                    MaKH: "KH234234",
                    TenKH: "Công ty cổ phần ABC",
                    Diachi: "Khu công nghiệp Tiên Sơn",
                    Khuvuc: "Hà Nội",
                    Xephang: "KH Vàng",

                    Ghichu: "",
                    Ngaytao: "12/3/2018",
                    Nguoitao: "Lê Văn Tình",
                    Ngaycapnhat: "",
                    Nguoicapnhat:""
                }, {
                    SoHD: "09123123",
                    LoaiHD: "Mua phế liệu",
                    Ngayky: "12/2/2017",
                    Ngayhethan: "12/2/2018",
                    Ngaygiahan: "",
                    Khaithac: "Nguyễn Văn A",
                    CSKH: "Trần thị B",

                    MaKH: "KH234234",
                    TenKH: "Công ty cổ phần ABC",
                    Diachi: "Khu công nghiệp Tiên Sơn",
                    Khuvuc: "Hà Nội",
                    Xephang: "KH Vàng",

                    Ghichu: "",
                    Ngaytao: "12/3/2018",
                    Nguoitao: "Lê Văn Tình",
                    Ngaycapnhat: "",
                    Nguoicapnhat: ""
                    }, {
                        SoHD: "09123123",
                        LoaiHD: "Mua phế liệu",
                        Ngayky: "12/2/2017",
                        Ngayhethan: "12/2/2018",
                        Ngaygiahan: "",
                        Khaithac: "Nguyễn Văn A",
                        CSKH: "Trần thị B",

                        MaKH: "KH234234",
                        TenKH: "Công ty cổ phần ABC",
                        Diachi: "Khu công nghiệp Tiên Sơn",
                        Khuvuc: "Hà Nội",
                        Xephang: "KH Vàng",

                        Ghichu: "",
                        Ngaytao: "12/3/2018",
                        Nguoitao: "Lê Văn Tình",
                        Ngaycapnhat: "",
                        Nguoicapnhat: ""
                }, {
                    SoHD: "09123123",
                    LoaiHD: "Mua phế liệu",
                    Ngayky: "12/2/2017",
                    Ngayhethan: "12/2/2018",
                    Ngaygiahan: "",
                    Khaithac: "Nguyễn Văn A",
                    CSKH: "Trần thị B",

                    MaKH: "KH234234",
                    TenKH: "Công ty cổ phần ABC",
                    Diachi: "Khu công nghiệp Tiên Sơn",
                    Khuvuc: "Hà Nội",
                    Xephang: "KH Vàng",

                    Ghichu: "",
                    Ngaytao: "12/3/2018",
                    Nguoitao: "Lê Văn Tình",
                    Ngaycapnhat: "",
                    Nguoicapnhat: ""
                }];
            }
        ]
    });