'use strict';
angular.module('app.components', [
    'shared.profile.comp',
    'shared.notify.comp',
    'angularFileUpload',
    'angularUtils.directives.dirPagination',
    'angularUtils.directives.uiBreadcrumbs',
    'ngToast',
    'ngMap',
    'home.comp',
    'config.comp',
    'user.comp',
    'thanhpho.comp',
    'role.comp',
    'permission.comp',
    'profile.comp',
    'setting.comp',
    'notification.comp',
    'hangsanxuat.comp',
    'loaikhachhang.comp',
    'nguonkhach.comp',
    'nhacungcap.comp',
    'nhomsanpham.comp',
    'nhucaugia.comp',
    'phongban.comp',
    'quanhuyen.comp',
    'baohanh.comp',
    'dungcu.comp',
    'deployment-detail-attachments.comp',
    'deployment-detail-constructiondiary.comp',
    'deployment-detail-contenttask.comp',
    'deployment-detail-contractdeploy.comp',
    'deployment-detail-costomerjoin.comp',
    'deployment-detail-error.comp',
    'deployment-detail-feedback.comp',
    'deployment-detail-finance.comp',
    'deployment-detail-makeshift.comp',
    'deployment-detail-plandeploy.comp',
    'deployment-detail-supplies.comp',
    'deployment-detail-technical.comp',
    'doployment-detail-result.comp',
    'sidebar.comp',

    //begin create by buixuxnha
    'customer.comp',
    'customer-list.comp',
    'customer-add.comp',
    'contract.comp',
    'contract-list.comp',
    'contract-add.comp',
    'contract-track.comp',
    'contract-trackexcel.comp',
    'contract-deploymentcontract.comp',
    'task-list.comp',
    'task-add.comp',
    //end create by buixuxnha

    'product-edit.comp',
    'product-list.comp',
    'statistic-customer.comp',
    'statistic-profit-total.comp',
    'statistic-progress.comp',
    'statistic-move2work.comp',
    'statistic-cost.comp',
    'statistic-construction.comp',
    'statistic-profit.comp',
]).config(function (paginationTemplateProvider) {
    paginationTemplateProvider.setPath('/app/shared/components/pagination/dirPagination.tpl.html');
}).config(function ($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            data: {
                displayName: 'Home',
            }
        })
        .state('home.hangsanxuat', {
            url: 'hangsanxuat/',
            data: {
                displayName: 'Hãng sản xuất',
            }
        })
        .state('home.loaikhachhang', {
            url: 'loaikhachhang/',
            data: {
                displayName: 'Loại khách hàng',
            }
        })
        //begin create by buixuxnha
        //customer
        .state('home.customer', {
            url: 'customer/',
            data: {
                displayName: 'Khách hàng',
            }
        })
        .state('home.customer.add', {
            url: 'add/',
            data: {
                displayName: 'Thêm khách hàng',
            }
        })
        .state('home.customer.edit', {
            url: 'edit/:id/:tab',
            data: {
                displayName: 'Sửa khách hàng',
            }
        })
        .state('home.customer.list', {
            url: 'list/:status',
            data: {
                displayName: 'D/s Khách hàng',
            }
        })
        //contract
        .state('home.contract', {
            url: 'contract/',
            data: {
                displayName: 'D/s hợp đồng',
            }
        })
        .state('home.contract.deploymentContract', {
            url: 'deploymentContract/:tab/:id',
            data: {
                displayName: 'Triển khai hợp đồng',
            }
        })
        .state('home.contract.list', {
            url: 'list/:status',
            data: {
                displayName: 'D/s hợp đồng',
            }
        })
        .state('home.contract.edit', {
            url: 'edit/:status',
            data: {
                displayName: 'Sửa hợp đồng',
            }
        })
        .state('home.contract.add', {
            url: 'add/:khachhangId/:baogiaId',
            data: {
                displayName: 'Thêm mới hợp đồng',
            }
        })
        .state('home.contract.track', {
            url: 'track/',
            data: {
                displayName: 'Theo dõi hợp đồng',
            }
        })
        .state('home.contract.trackexcel', {
            url: 'trackexcel/:status',
            data: {
                displayName: 'Xuất ra excel',
            }
        })
        //task
        .state('home.task', {
            url: 'task/',
            data: {
                displayName: 'D/s công việc',
            }
        })
        .state('home.task.list', {
            url: 'list/:status',
            data: {
                displayName: 'D/s công việc',
            }
        })
        .state('home.task.add', {
            url: 'add/:id/:status',
            data: {
                displayName: 'Thêm công việc',
            }
        })
        //end create by buixuxnha
        .state('home.nguonkhach', {
            url: 'nguonkhach/',
            data: {
                displayName: 'Nguồn khách hàng',
            }
        })
        .state('home.nhacungcap', {
            url: 'nhacungcap/',
            data: {
                displayName: 'Nhà cung cấp',
            }
        })
        .state('home.nhomsanpham', {
            url: 'nhomsanpham/',
            data: {
                displayName: 'Nhóm sản phẩm',
            }
        })
        .state('home.nhucaugia', {
            url: 'nhucaugia/',
            data: {
                displayName: 'Nhu cầu giá',
            }
        })
        .state('home.phongban', {
            url: 'phongban/',
            data: {
                displayName: 'Phòng ban',
            }
        })
        .state('home.quanhuyen', {
            url: 'quanhuyen/',
            data: {
                displayName: 'Quận huyện',
            }
        })
        .state('home.baohanh', {
            url: 'baohanh/',
            data: {
                displayName: 'Bảo hành',
            }
        })
        .state('home.dungcu', {
            url: 'dungcu/',
            data: {
                displayName: 'Dụng cụ',
            }
        })
        .state('home.notification', {
            url: 'notification/',
            data: {
                displayName: 'Thông báo',
            }
        })
        .state('home.thanhpho', {
            url: 'thanhpho',
            data: {
                displayName: 'Danh mục khu vực',
            }
        })
        .state('home.role', {
            url: 'role',
            data: {
                displayName: 'Vai trò',
            }
        })
        .state('home.user', {
            url: 'user',
            data: {
                displayName: 'Quản lý user',
            }
        })
        .state('home.permission', {
            url: 'permission',
            data: {
                displayName: 'Phân quyền',
            }
        })
        .state('home.config', {
            url: 'config',
            data: {
                displayName: 'Cấu hình chung',
            }
        })
        .state('home.profile', {
            url: 'profile/',
            data: {
                displayName: 'Hồ sơ cá nhân',
            }
        })
        .state('home.profile.setting', {
            url: 'setting',
            data: {
                displayName: 'Cài đặt tài khoản',
            }
        })
        .state('home.statistic', {
            url: 'statistic/',
            data: {
                displayName: 'Báo cáo',
            }
        })
        .state('home.statistic.customer', {
            url: 'customer',
            data: {
                displayName: 'Báo cáo khách hàng',
            }
        })
        .state('home.statistic.profit', {
            url: 'profit',
            data: {
                displayName: 'Báo cáo lợi nhuận chi tiết',
            }
        })
        .state('home.statistic.progress', {
            url: 'progress',
            data: {
                displayName: 'Báo cáo tiến độ',
            }
        })
        .state('home.statistic.move2work', {
            url: 'move2work',
            data: {
                displayName: 'Báo cáo khu vực',
            }
        })
        .state('home.statistic.cost', {
            url: 'cost',
            data: {
                displayName: 'Báo cáo chi phí',
            }
        })
        .state('home.statistic.construction', {
            url: 'construction',
            data: {
                displayName: 'Báo cáo thời gian thi công',
            }
        })
        .state('home.statistic.profit-total', {
            url: 'profit-total',
            data: {
                displayName: 'Báo cáo lợi nhuận tổng hợp',
            }
        })
        .state('home.product', {
            url: 'product/',
            data: {
                displayName: 'Danh sách sản phẩm',
            }
        })
        .state('home.product.list', {
            url: 'list',
            data: {
                displayName: 'Danh sách sản phẩm',
            }
        })
        .state('home.product.add', {
            url: 'add',
            data: {
                displayName: 'Thêm sản phẩm mới',
            }
        })
        .state('home.product.edit', {
            url: 'edit/:id',
            data: {
                displayName: 'Cập nhật sản phẩm',
            }
        });
    });
