angular.module('khachhang.api', ['base.api'])
    .factory('khachhangApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var khachhangApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list khachhangs
        khachhangApi.list = function (filter) {
            var urlBase = base_url + '/v1/khachhang/list';
            return $http.post(urlBase, filter, headers);
        };

        //get list khachhangs
        khachhangApi.list_new = function (filter) {
            var urlBase = base_url + '/v1/khachhang/list_new';
            return $http.post(urlBase, filter, headers);
        };

        //get list khachhangs
        khachhangApi.list_send2sale = function (filter) {
            var urlBase = base_url + '/v1/khachhang/list_send2sale';
            return $http.post(urlBase, filter, headers);
        };

        //get list khachhangs
        khachhangApi.list_converted = function (filter) {
            var urlBase = base_url + '/v1/khachhang/list_converted';
            return $http.post(urlBase, filter, headers);
        };

        //get list khachhangs
        khachhangApi.list_not_convertion = function (filter) {
            var urlBase = base_url + '/v1/khachhang/list_not_convertion';
            return $http.post(urlBase, filter, headers);
        };

        //get list khachhangs
        khachhangApi.list_received = function (filter) {
            var urlBase = base_url + '/v1/khachhang/list_received';
            return $http.post(urlBase, filter, headers);
        };

        //add new khachhang
        khachhangApi.add = function (khachhang) {
            var urlBase = base_url + '/v1/khachhang/add';
            return $http.post(urlBase, khachhang, headers);
        };

        //update khachhang
        khachhangApi.update = function (khachhang) {
            var urlBase = base_url + '/v1/khachhang/update';
            return $http.put(urlBase, khachhang, headers);
        };
        //delete khachhang
        khachhangApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/khachhang/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };
        //get by khachhang id
        khachhangApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/khachhang/get_by_id?khachhangId=' + id;
            return $http.get(urlBase, headers);
        };
        //move 2 sale
        khachhangApi.add2sale = function (data) {
            var urlBase = base_url + '/v1/khachhang/move_2_sale';
            return $http.post(urlBase, data, headers);
        };
        //return 2 marketing
        khachhangApi.return_2_marketing = function (customerId) {
            var urlBase = base_url + '/v1/khachhang/return_2_marketing?customerId=' + customerId;
            return $http.post(urlBase, headers);
        };
        //import khach hang
        khachhangApi.import = function (khachhang) {
            var urlBase = base_url + '/v1/khachhang/import';
            return $http.post(urlBase, khachhang, headers);
        };
        //save nhu cau
        khachhangApi.save_nhu_cau = function (d1, d2) {
            var urlBase = base_url + '/v1/khachhang/save_nhu_cau?customerId=' + d1;
            return $http.post(urlBase, d2, headers);
        };
        //save san pham quan tam
        khachhangApi.add_sanpham_quantam = function (d1, d2) {
            var urlBase = base_url + '/v1/khachhang/add_sanpham_quantam?customerId=' + d2;
            return $http.post(urlBase, d1, headers);
        };
        //remove san pham quan tam
        khachhangApi.remove_sanpham_quantam = function (khachhang) {
            var urlBase = base_url + '/v1/khachhang/remove_sanpham_quantam';
            return $http.post(urlBase, khachhang, headers);
        };
        //get san pham quan tam
        khachhangApi.get_sanpham_quantams = function (id) {
            var urlBase = base_url + '/v1/khachhang/get_sanpham_quantams?customerId=' + id;
            return $http.get(urlBase, headers);
        };
        //insert tu van
        khachhangApi.add_tu_van = function (khachhang) {
            var urlBase = base_url + '/v1/khachhang/add_tu_van';
            return $http.post(urlBase, khachhang, headers);
        };
        //update tu van
        khachhangApi.update_tu_van = function (khachhang) {
            var urlBase = base_url + '/v1/khachhang/update_tu_van';
            return $http.put(urlBase, khachhang, headers);
        };
        //delete tu van
        khachhangApi.delete_tu_van = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/khachhang/delete_tu_van',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };
        //get tu van
        khachhangApi.get_tu_vans = function (khachhang) {
            var urlBase = base_url + '/v1/khachhang/get_tu_vans';
            return $http.post(urlBase, khachhang, headers);
        };
        //get bao gia
        khachhangApi.get_bao_gias = function (khachhang) {
            var urlBase = base_url + '/v1/khachhang/get_bao_gias';
            return $http.post(urlBase, khachhang, headers);
        };
        //get bao gia detail
        khachhangApi.get_bao_gia_detail = function (id) {
            var urlBase = base_url + '/v1/khachhang/get_bao_gia_detail?id=' + id;
            return $http.get(urlBase, headers);
        };
        //save bao gia
        khachhangApi.save_bao_gia = function (khachhang) {
            var urlBase = base_url + '/v1/khachhang/save_bao_gia';
            return $http.post(urlBase, khachhang, headers);
        };
        //export data
        khachhangApi.customer_export = function () {
            return urlBase = base_url + '/v1/khachhang/export';
        };
        //export data
        khachhangApi.customer_import = function (d1) {
            var urlBase = base_url + '/v1/khachhang/import?fileKey=' + d1;
            return $http.post(urlBase, '', headers);
        };
        //====================================================
        //list sanpham
        khachhangApi.listSanpham = function (filter) {
            var urlBase = base_url + '/v1/sanpham/list';
            return $http.post(urlBase, filter, headers);
        };
        //====================================================
        //get list loaikhachhangs
        khachhangApi.listLoaiKhachHang = function (filter) {
            var urlBase = base_url + '/v1/loaikhachhang/list';
            return $http.post(urlBase, filter, headers);
        };
        //get list nguonkhachs
        khachhangApi.listNguonKhach = function (filter) {
            var urlBase = base_url + '/v1/nguonkhach/list';
            return $http.post(urlBase, filter, headers);
        };
        //get list quanhuyens
        khachhangApi.listQuanHuyen = function (filter) {
            var urlBase = base_url + '/v1/quanhuyen/list';
            return $http.post(urlBase, filter, headers);
        };
        //get list thanhphos
        khachhangApi.listThanhPho = function (filter) {
            var urlBase = base_url + '/v1/thanhpho/list';
            return $http.post(urlBase, filter, headers);
        };
        //get list users
        khachhangApi.listTaiKhoan = function (filter) {
            var urlBase = base_url + '/v1/taikhoan/list';
            return $http.post(urlBase, filter, headers);
        };
        //get list nhucaugia
        khachhangApi.listNhucaugia = function (id) {
            var urlBase = base_url + '/v1/khachhang/get_nhu_cau_gias?customerId=' + id;
            return $http.get(urlBase, headers);
        };

        //get list hopdongs
        khachhangApi.listHopDong = function (filter) {
            var urlBase = base_url + '/v1/hopdong/list_hop_dongs';
            return $http.post(urlBase, filter, headers);
        };
        //save hopdongs
        khachhangApi.save_hop_dong = function (d1) {
            var urlBase = base_url + '/v1/hopdong/save_hop_dong';
            return $http.post(urlBase, d1, headers);
        };
        //get hop dong by id
        khachhangApi.getItemHopDong = function (id) {
            var urlBase = base_url + '/v1/hopdong/get_by_id?hopdongId=' + id;
            return $http.get(urlBase, headers);
        };

        //Tai khoan
        //get by id
        khachhangApi.get_by_idTK = function (id) {
            var urlBase = base_url + '/v1/taikhoan/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };
        //get by id sanpham
        khachhangApi.get_by_idSP = function (id) {
            var urlBase = base_url + '/v1/sanpham/get_by_id?sanphamId=' + id;
            return $http.get(urlBase, headers);
        };
        //get by id thanhpho
        khachhangApi.get_by_idTP = function (id) {
            var urlBase = base_url + '/v1/thanhpho/get_by_id?thanhphoId=' + id;
            return $http.get(urlBase, headers);
        };
        //get by id quanhuyen
        khachhangApi.get_by_idQH = function (id) {
            var urlBase = base_url + '/v1/quanhuyen/get_by_id?quanhuyenId=' + id;
            return $http.get(urlBase, headers);
        };
        //get by id Khach hang
        khachhangApi.get_by_idKH = function (id) {
            var urlBase = base_url + '/v1/khachhang/get_by_id?khachhangId=' + id;
            return $http.get(urlBase, headers);
        };
        //get by id loai Khach hang
        khachhangApi.get_by_idLKH = function (id) {
            var urlBase = base_url + '/v1/loaikhachhang/get_by_id?loaikhachhangId=' + id;
            return $http.get(urlBase, headers);
        };
        //get by id loai Khach hang
        khachhangApi.get_by_idNK = function (id) {
            var urlBase = base_url + '/v1/nguonkhach/get_by_id?nguonkhachId=' + id;
            return $http.get(urlBase, headers);
        };
        //get by id Nhu Cau Gia
        khachhangApi.get_by_idNCG = function (id) {
            var urlBase = base_url + '/v1/khachhang/get_nhu_cau_gias?customerId=' + id;
            return $http.get(urlBase, headers);
        };
        //get list khachhangs truong phong chuyen cho sale
        khachhangApi.list_send2subsale = function (filter) {
            var urlBase = base_url + '/v1/khachhang/list_send2_subsale';
            return $http.post(urlBase, filter, headers);
        };
        //move 2 sub sale
        khachhangApi.add2subsale = function (data) {
            var urlBase = base_url + '/v1/khachhang/move_2_sub_sale';
            return $http.post(urlBase, data, headers);
        };
        khachhangApi.send_email = function (mail) {
            var urlBase = base_url + '/v1/khachhang/send_email';
            return $http.post(urlBase, mail, headers);
        };
        return khachhangApi;
    }]);
