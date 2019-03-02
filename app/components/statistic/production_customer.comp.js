
angular.module('statistic-production-customer.comp', ['common.srv']).
    component('statisticProductionCustomer', {
        templateUrl: '/app/components/statistic/production_customer.tpl.html',
        controller: ['$routeParams', '$scope', '$rootScope', '$location', 'commonService',
            function ($routeParams, $scope, $rootScope, $location, commonService) {
                this.stockCardModels = [{
                    Ngayve: "01/01/2017",
                    NgayHT: "02/02/2018",
                    Ten: "Công ty TNHH SamSung Electronics Vietnam Thái nguyên",
                    MaQL: "19.000176.T",
                    Diachi: "KCN Yên Bình, Phổ Yên, Thái Nguyên",
                    MaCT: "BĐK",
                    TenCT: "Bóng đèn huỳnh quang",
                    Soluong: "2,501,241,100",
                    Hethong: "BĐK"
                },
                {
                    Ngayve: "01/01/2017",
                    NgayHT: "02/02/2018",
                    Ten: "Công ty TNHH SamSung Electronics Vietnam Thái nguyên",
                    MaQL: "19.000176.T",
                    Diachi: "KCN Yên Bình, Phổ Yên, Thái Nguyên",
                    MaCT: "BĐK",
                    TenCT: "Bóng đèn huỳnh quang",
                    Soluong: "2,501,241,100",
                    Hethong: "BĐK"
                },
                {
                    Ngayve: "01/01/2017",
                    NgayHT: "02/02/2018",
                    Ten: "Công ty TNHH SamSung Electronics Vietnam Thái nguyên",
                    MaQL: "19.000176.T",
                    Diachi: "KCN Yên Bình, Phổ Yên, Thái Nguyên",
                    MaCT: "BĐK",
                    TenCT: "Bóng đèn huỳnh quang",
                    Soluong: "2,501,241,100",
                    Hethong: "BĐK"
                },
                {
                    Ngayve: "01/01/2017",
                    NgayHT: "02/02/2018",
                    Ten: "Công ty TNHH SamSung Electronics Vietnam Thái nguyên",
                    MaQL: "19.000176.T",
                    Diachi: "KCN Yên Bình, Phổ Yên, Thái Nguyên",
                    MaCT: "BĐK",
                    TenCT: "Bóng đèn huỳnh quang",
                    Soluong: "2,501,241,100",
                    Hethong: "BĐK"
                }];
            }
        ]
    });