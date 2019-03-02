angular
    .module('app.routes', [])
    .config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.
                when('/', {
                    template: '<home></home>'
                });

            $routeProvider.
                when('/config', {
                    template: '<config></config>'
                });

            $routeProvider.
                when('/user', {
                    template: '<user></user>'
                });

            //begin create by buixuanha
            //custommer
            $routeProvider.
                when('/customer', {
                    template: '<customer></customer>'
                }).
                when('/customer/add', {
                    template: '<customer-add></customer-add>'
                }).
                when('/customer/edit/:id/:tab', {
                    template: '<customer-add></customer-add>'
                }).
                when('/customer/list/:status', {
                    template: '<customer-list></customer-list>'
                });
            //contract
            $routeProvider.
                when('/contract/deploymentContract/:tab/:id', {
                    template: '<contract-deploymentcontract></contract-deploymentcontract>'
                }).
                when('/contract/add/:khachhangId/:baogiaId', {
                    template: '<contract-add></contract-add>'
                }).
                when('/contract/edit/:status', {
                    template: '<contract-add></contract-add>'
                }).
                when('/contract/track', {
                    template: '<contract-track></contract-track>'
                }).
                when('/contract/list/:status', {
                    template: '<contract-list></contract-list>'
                }).
                when('/contract', {
                    template: '<contract-list></contract-list>'
                }).
                when('/contract/trackexcel/:status', {
                    template: '<contract-trackexcel></contract-trackexcel>'
                });
            //task
            $routeProvider.
                when('/task/add/:id/:status', {
                    template: '<task-add></task-add>'
                }).
                when('/task/list/:status', {
                    template: '<task-list></task-list>'
                });
            //end create by buixuanha

            $routeProvider.
                when('/notification', {
                    template: '<notification></notification>'
                });

            $routeProvider.
                when('/hangsanxuat', {
                    template: '<hangsanxuat></hangsanxuat>'
                });

            $routeProvider.
                when('/loaikhachhang', {
                    template: '<loaikhachhang></loaikhachhang>'
                });

            $routeProvider.
                when('/nguonkhach', {
                    template: '<nguonkhach></nguonkhach>'
                });

            $routeProvider.
                when('/nhacungcap', {
                    template: '<nhacungcap></nhacungcap>'
                });

            $routeProvider.
                when('/nhomsanpham', {
                    template: '<nhomsanpham></nhomsanpham>'
                });

            $routeProvider.
                when('/nhucaugia', {
                    template: '<nhucaugia></nhucaugia>'
                });

            $routeProvider.
                when('/phongban', {
                    template: '<phongban></phongban>'
                });

            $routeProvider.
                when('/quanhuyen', {
                    template: '<quanhuyen></quanhuyen>'
                });

            $routeProvider.
                when('/baohanh', {
                    template: '<baohanh></baohanh>'
                });

            $routeProvider.
                when('/dungcu', {
                    template: '<dungcu></dungcu>'
                });

            $routeProvider.
                when('/production/add', {
                    template: '<production-edit></production-edit>'
                }).
                when('/production/edit/:id', {
                    template: '<production-edit></production-edit>'
                }).
                when('/production/list/:status', {
                    template: '<production-list></production-list>'
                }).
                when('/production', {
                    template: '<production-list></production-list>'
                }).
                when('/production/definition', {
                    template: '<production-definition></production-definition>'
                });

            $routeProvider.
                when('/thanhpho', {
                    template: '<thanhpho></thanhpho>'
                });

            $routeProvider.
                when('/role', {
                    template: '<role></role>'
                });

            $routeProvider.
                when('/permission', {
                    template: '<permission></permission>'
                });

            $routeProvider.
                when('/profile', {
                    template: '<profile></profile>'
                }).
                when('/profile/setting', {
                    template: '<setting></setting>'
                });

            $routeProvider.
                when('/statistic', {
                    template: '<statistic-customer></statistic-customer>'
                }).
                when('/statistic/customer', {
                    template: '<statistic-customer></statistic-customer>'
                }).
                when('/statistic/profit', {
                    template: '<statistic-profit></statistic-profit>'
                }).
                when('/statistic/profit-total', {
                    template: '<statistic-profit-total></statistic-profit-total>'
                }).
                when('/statistic/progress', {
                    template: '<statistic-progress></statistic-progress>'
                }).
                when('/statistic/move2work', {
                    template: '<statistic-move2work></statistic-move2work>'
                }).
                when('/statistic/cost', {
                    template: '<statistic-cost></statistic-cost>'
                }).
                when('/statistic/construction', {
                    template: '<statistic-construction></statistic-construction>'
                });

            $routeProvider.
                when('/customer', {
                    template: '<customer-add></customer-add>'
                }).
                when('/customer/add', {
                    template: '<customer-add></customer-add>'
                });

            $routeProvider.
                when('/product/list', {
                    template: '<product-list></product-list>'
                }).
                when('/product/add', {
                    template: '<product-edit></product-edit>'
                }).
                when('/product/edit/:id', {
                    template: '<product-edit></product-edit>'
                });
        }
    ]);
