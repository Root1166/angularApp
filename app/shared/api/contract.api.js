angular.module('hopdong.api', ['base.api'])
    .factory('hopdongApi', ['$http', 'baseApi', function ($http, baseApi) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var hopdongApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

        //get list hopdongs
        hopdongApi.list = function (filter) {
            var urlBase = base_url + '/v1/hopdong/list_hop_dongs';
            return $http.post(urlBase, filter, headers);
        };

        //add va update new hopdong
        hopdongApi.save = function (hopdong) {
            var urlBase = base_url + '/v1/hopdong/save_hop_dong';
            return $http.post(urlBase, hopdong, headers);
        };
        //update hopdong
        hopdongApi.update = function (hopdong) {
            var urlBase = base_url + '/v1/hopdong/save_hop_dong';
            return $http.post(urlBase, hopdong, headers);
        };
        //delete hopdong
        hopdongApi.delete = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/hopdong/delete',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };
        //get by hopdong id
        hopdongApi.get_by_id = function (id) {
            var urlBase = base_url + '/v1/hopdong/get_by_id?hopdongId=' + id;
            return $http.get(urlBase, headers);
        };
        //get by khachhang id
        hopdongApi.get_by_idKH = function (id) {
            var urlBase = base_url + '/v1/khachhang/get_by_id?khachhangId=' + id;
            return $http.get(urlBase, headers);
        };
        //post list save_hop_dong
        hopdongApi.save_hop_dong = function (filter) {
            var urlBase = base_url + '/v1/hopdong/save_hop_dong';
            return $http.post(urlBase, filter, headers);
        };
        //post list list_kehoachs
        hopdongApi.list_kehoachs = function (filter) {
            var urlBase = base_url + '/v1/hopdong/list_kehoachs';
            return $http.post(urlBase, filter, headers);
        };
        //post list list_kehoachs
        hopdongApi.add_kehoach = function (filter) {
            var urlBase = base_url + '/v1/hopdong/add_kehoach';
            return $http.post(urlBase, filter, headers);
        };
        //post list list_kehoachs
        hopdongApi.update_kehoach = function (filter) {
            var urlBase = base_url + '/v1/hopdong/update_kehoach';
            return $http.put(urlBase, filter, headers);
        };
        //delete list list_kehoachs
        hopdongApi.remove_kehoach = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/hopdong/remove_kehoach',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };
        // get ke hoach by id
        hopdongApi.get_ke_hoach_by_id = function(id) {
            var urlBase = base_url + '/v1/hopdong/get_ke_hoach_by_id?Id='+id;
            return $http.get(urlBase, headers);
        }
        //post list list_nhansus
        hopdongApi.list_nhansus = function (filter) {
            var urlBase = base_url + '/v1/hopdong/list_nhansus';
            return $http.post(urlBase, filter, headers);
        };
        //post list add_nhansu
        hopdongApi.add_nhansu = function (filter) {
            var urlBase = base_url + '/v1/hopdong/add_nhansu';
            return $http.post(urlBase, filter, headers);
        };
        //put list list_kehoachs
        hopdongApi.update_nhansu = function (filter) {
            var urlBase = base_url + '/v1/hopdong/update_nhansu';
            return $http.put(urlBase, filter, headers);
        };
        //delete list remove_nhansu
        hopdongApi.remove_nhansu = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/hopdong/remove_nhansu',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };
        //post list list_giaoviecs
        hopdongApi.list_giaoviecs = function (filter) {
            var urlBase = base_url + '/v1/hopdong/list_giaoviecs';
            return $http.post(urlBase, filter, headers);
        };
        //post list add_giaoviec
        hopdongApi.add_giaoviec = function (filter) {
            var urlBase = base_url + '/v1/hopdong/add_giaoviec';
            return $http.post(urlBase, filter, headers);
        };
        //put list update_giaoviec
        hopdongApi.update_giaoviec = function (filter) {
            var urlBase = base_url + '/v1/hopdong/update_giaoviec';
            return $http.put(urlBase, filter, headers);
        };
        //delete list remove_giaoviec
        hopdongApi.remove_giaoviec = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/hopdong/remove_giaoviec',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };
        //post list list_nhat_ky_thi_congs
        hopdongApi.list_nhat_ky_thi_congs = function (filter) {
            var urlBase = base_url + '/v1/hopdong/list_nhat_ky_thi_congs';
            return $http.post(urlBase, filter, headers);
        };
        //post list add_nhat_ky_thi_cong
        hopdongApi.add_nhat_ky_thi_cong = function (filter) {
            var urlBase = base_url + '/v1/hopdong/add_nhat_ky_thi_cong';
            return $http.post(urlBase, filter, headers);
        };
        //put list update_nhat_ky_thi_cong
        hopdongApi.update_nhat_ky_thi_cong = function (filter) {
            var urlBase = base_url + '/v1/hopdong/update_nhat_ky_thi_cong';
            return $http.put(urlBase, filter, headers);
        };
        //delete list remove_nhat_ky_thi_cong
        hopdongApi.remove_nhat_ky_thi_cong = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/hopdong/remove_nhat_ky_thi_cong',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };
        //post list list_thanhtoans
        hopdongApi.list_thanhtoans = function (filter) {
            var urlBase = base_url + '/v1/hopdong/list_thanhtoans';
            return $http.post(urlBase, filter, headers);
        };
        //post list add_thanhtoan
        hopdongApi.add_thanhtoan = function (filter) {
            var urlBase = base_url + '/v1/hopdong/add_thanhtoan';
            return $http.post(urlBase, filter, headers);
        };
        //put list update_thanhtoan
        hopdongApi.update_thanhtoan = function (filter) {
            var urlBase = base_url + '/v1/hopdong/update_thanhtoan';
            return $http.put(urlBase, filter, headers);
        };
        //delete list remove_thanhtoan
        hopdongApi.remove_thanhtoan = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/hopdong/remove_thanhtoan',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };
        //post list list_dukienthus
        hopdongApi.list_dukienthus = function (filter) {
            var urlBase = base_url + '/v1/hopdong/list_dukienthus';
            return $http.post(urlBase, filter, headers);
        };
        //post list add_dukienthu
        hopdongApi.add_dukienthu = function (filter) {
            var urlBase = base_url + '/v1/hopdong/add_dukienthu';
            return $http.post(urlBase, filter, headers);
        };
        //put list update_dukienthu
        hopdongApi.update_dukienthu = function (filter) {
            var urlBase = base_url + '/v1/hopdong/update_dukienthu';
            return $http.put(urlBase, filter, headers);
        };
        //delete list remove_dukienthu
        hopdongApi.remove_dukienthu = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/hopdong/remove_dukienthu',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };
        //post list list_dukienchis
        hopdongApi.list_dukienchis = function (filter) {
            var urlBase = base_url + '/v1/hopdong/list_dukienchis';
            return $http.post(urlBase, filter, headers);
        };
        //post list add_dukienchi
        hopdongApi.add_dukienchi = function (filter) {
            var urlBase = base_url + '/v1/hopdong/add_dukienchi';
            return $http.post(urlBase, filter, headers);
        };
        //put list update_dukienchi
        hopdongApi.update_dukienchi = function (filter) {
            var urlBase = base_url + '/v1/hopdong/update_dukienchi';
            return $http.put(urlBase, filter, headers);
        };
        //delete list remove_dukienchi
        hopdongApi.remove_dukienchi = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/hopdong/remove_dukienchi',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };
        //post list list_dukienhang_canthiets
        hopdongApi.list_dukienhang_canthiets = function (filter) {
            var urlBase = base_url + '/v1/hopdong/list_dukienhang_canthiets';
            return $http.post(urlBase, filter, headers);
        };
        //post list add_dukienhang_canthiet
        hopdongApi.add_dukienhang_canthiet = function (filter) {
            var urlBase = base_url + '/v1/hopdong/add_dukienhang_canthiet';
            return $http.post(urlBase, filter, headers);
        };
        //put list update_dukienhang_canthiet
        hopdongApi.update_dukienhang_canthiet = function (filter) {
            var urlBase = base_url + '/v1/hopdong/update_dukienhang_canthiet';
            return $http.put(urlBase, filter, headers);
        };
        //delete list remove_dukienhang_canthiet
        hopdongApi.remove_dukienhang_canthiet = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/hopdong/remove_dukienhang_canthiet',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        // bao cao loi nhuan
        hopdongApi.bao_cao_loi_nhuan = function (id) {
            var urlBase = base_url + '/v1/hopdong/bao_cao_loi_nhuan?hopdongId='+id;
            return $http.get(urlBase, headers);
        };
        //post list list_vattus
        hopdongApi.list_vattus = function (filter) {
            var urlBase = base_url + '/v1/hopdong/list_vattus';
            return $http.post(urlBase, filter, headers);
        };
        //post list add_vattu
        hopdongApi.add_vattu = function (filter) {
            var urlBase = base_url + '/v1/hopdong/add_vattu';
            return $http.post(urlBase, filter, headers);
        };
        //put list update_vattu
        hopdongApi.update_vattu = function (filter) {
            var urlBase = base_url + '/v1/hopdong/update_vattu';
            return $http.put(urlBase, filter, headers);
        };
        //delete list remove_vattu
        hopdongApi.remove_vattu = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/hopdong/remove_vattu',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };
        //post list list_sucos
        hopdongApi.list_sucos = function (filter) {
            var urlBase = base_url + '/v1/hopdong/list_sucos';
            return $http.post(urlBase, filter, headers);
        };
        //post list add_suco
        hopdongApi.add_suco = function (filter) {
            var urlBase = base_url + '/v1/hopdong/add_suco';
            return $http.post(urlBase, filter, headers);
        };
        //put list update_suco
        hopdongApi.update_suco = function (filter) {
            var urlBase = base_url + '/v1/hopdong/update_suco';
            return $http.put(urlBase, filter, headers);
        };
        //delete list remove_suco
        hopdongApi.remove_suco = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/hopdong/remove_suco',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };
        //post list list_tamungs
        hopdongApi.list_tamungs = function (filter) {
            var urlBase = base_url + '/v1/hopdong/list_tamungs';
            return $http.post(urlBase, filter, headers);
        };
        //post list add_tamung
        hopdongApi.add_tamung = function (filter) {
            var urlBase = base_url + '/v1/hopdong/add_tamung';
            return $http.post(urlBase, filter, headers);
        };
        //put list update_tamung
        hopdongApi.update_tamung = function (filter) {
            var urlBase = base_url + '/v1/hopdong/update_tamung';
            return $http.put(urlBase, filter, headers);
        };
        //delete list remove_tamung
        hopdongApi.remove_tamung = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/hopdong/remove_tamung',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        // tạm ứng chậm quyết toán
        hopdongApi.get_tamung_cham_quyet_toans = function(id) {
            var urlBase = base_url + '/v1/hopdong/get_tamung_cham_quyet_toans?hopdongId='+id;
            return $http.post(urlBase, headers);
        }

        //post list list_quyettoans
        hopdongApi.list_quyettoans = function (filter) {
            var urlBase = base_url + '/v1/hopdong/list_quyettoans';
            return $http.post(urlBase, filter, headers);
        };
        //post list add_quyettoan
        hopdongApi.add_quyettoan = function (filter) {
            var urlBase = base_url + '/v1/hopdong/add_quyettoan';
            return $http.post(urlBase, filter, headers);
        };
        //put list update_quyettoan
        hopdongApi.update_quyettoan = function (filter) {
            var urlBase = base_url + '/v1/hopdong/update_quyettoan';
            return $http.put(urlBase, filter, headers);
        };
        //delete list remove_quyettoan
        hopdongApi.remove_quyettoan = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/hopdong/remove_quyettoan',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };
        // tam ung by nguoi quyet toan id
        hopdongApi.get_tamung_by_nguoi_quyettoanId = function(hopdongId,nguoiQuyettoanId) {
            var urlBase = base_url + '/v1/hopdong/get_tamung_by_nguoi_quyettoanId?hopdongId='+hopdongId+"&nguoiQuyettoanId="+nguoiQuyettoanId;
            return $http.post(urlBase, headers);
        }
        //post list list_tailieu_dinhkems
        hopdongApi.list_tailieu_dinhkems = function (filter) {
            var urlBase = base_url + '/v1/hopdong/list_tailieu_dinhkems';
            return $http.post(urlBase, filter, headers);
        };
        //post list add_tailieu_dinhkem
        hopdongApi.add_tailieu_dinhkem = function (filter) {
            var urlBase = base_url + '/v1/hopdong/add_tailieu_dinhkem';
            return $http.post(urlBase, filter, headers);
        };
        //put list update_tailieu_dinhkem
        hopdongApi.update_tailieu_dinhkem = function (filter) {
            var urlBase = base_url + '/v1/hopdong/update_tailieu_dinhkem';
            return $http.put(urlBase, filter, headers);
        };
        //delete list remove_tailieu_dinhkem
        hopdongApi.remove_tailieu_dinhkem = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/hopdong/remove_tailieu_dinhkem',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };
        //post list list_phanhois
        hopdongApi.list_phanhois = function (filter) {
            var urlBase = base_url + '/v1/hopdong/list_phanhois';
            return $http.post(urlBase, filter, headers);
        };
        //post list add_phanhoi
        hopdongApi.add_phanhoi = function (filter) {
            var urlBase = base_url + '/v1/hopdong/add_phanhoi';
            return $http.post(urlBase, filter, headers);
        };
        //put list update_phanhoi
        hopdongApi.update_phanhoi = function (filter) {
            var urlBase = base_url + '/v1/hopdong/update_phanhoi';
            return $http.put(urlBase, filter, headers);
        };
        //delete list remove_phanhoi
        hopdongApi.remove_phanhoi = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/hopdong/remove_phanhoi',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };
        //post list list_danhgia_noibos
        hopdongApi.list_danhgia_noibos = function (filter) {
            var urlBase = base_url + '/v1/hopdong/list_danhgia_noibos';
            return $http.post(urlBase, filter, headers);
        };
        //post list add_danhgia_noibo
        hopdongApi.add_danhgia_noibo = function (filter) {
            var urlBase = base_url + '/v1/hopdong/add_danhgia_noibo';
            return $http.post(urlBase, filter, headers);
        };
        //put list update_danhgia_noibo
        hopdongApi.update_danhgia_noibo = function (filter) {
            var urlBase = base_url + '/v1/hopdong/update_danhgia_noibo';
            return $http.put(urlBase, filter, headers);
        };
        //delete list remove_danhgia_noibo
        hopdongApi.remove_danhgia_noibo = function (ids) {
            return $http({
                method: 'DELETE',
                url: base_url + '/v1/hopdong/remove_danhgia_noibo',
                data: ids,
                headers: { 'Content-Type': 'application/json' }
            });
        };
        //Tai khoan
        //get by id
        hopdongApi.get_by_idTK = function (id) {
            var urlBase = base_url + '/v1/taikhoan/get_by_id?Id=' + id;
            return $http.get(urlBase, headers);
        };
        //get by id sanpham
        hopdongApi.get_by_idSP = function (id) {
            var urlBase = base_url + '/v1/sanpham/get_by_id?sanphamId=' + id;
            return $http.get(urlBase, headers);
        };
        //get by id thanhpho
        hopdongApi.get_by_idTP = function (id) {
            var urlBase = base_url + '/v1/thanhpho/get_by_id?thanhphoId=' + id;
            return $http.get(urlBase, headers);
        };
        //get by id quanhuyen
        hopdongApi.get_by_idQH = function (id) {
            var urlBase = base_url + '/v1/quanhuyen/get_by_id?quanhuyenId=' + id;
            return $http.get(urlBase, headers);
        };
        //get list users
        hopdongApi.listTaiKhoan = function (filter) {
            var urlBase = base_url + '/v1/taikhoan/list';
            return $http.post(urlBase, filter, headers);
        };
        //filter
        //get list liThanhphos
        hopdongApi.liThanhphos = function (filter) {
            var urlBase = base_url + '/v1/thanhpho/list';
            return $http.post(urlBase, filter, headers);
        };

        //get list liQuanhuyens
        hopdongApi.liQuanhuyens = function (filter) {
            var urlBase = base_url + '/v1/quanhuyen/list';
            return $http.post(urlBase, filter, headers);
        };

        //get list liNhucaugias
        hopdongApi.liNhucaugias = function (filter) {
            var urlBase = base_url + '/v1/nhucaugia/list';
            return $http.post(urlBase, filter, headers);
        };

        //get list liSanphamquantams
        hopdongApi.liSanphamquantams = function (filter) {
            var urlBase = base_url + '/v1/sanpham/list';
            return $http.post(urlBase, filter, headers);
        };

        //get list liNguoixulys
        hopdongApi.liNguoixulys = function (filter) {
            var urlBase = base_url + '/v1/taikhoan/list';
            return $http.post(urlBase, filter, headers);
        };

        //get list liLoaikhachs
        hopdongApi.liLoaikhachs = function (filter) {
            var urlBase = base_url + '/v1/loaikhachhang/list';
            return $http.post(urlBase, filter, headers);
        };

        //get list liNhomSPs
        hopdongApi.liNhomSPs = function (filter) {
            var urlBase = base_url + '/v1/nhomsanpham/list';
            return $http.post(urlBase, filter, headers);
        };
        //get list liNhomSPs
        hopdongApi.liNguonkhachs = function (filter) {
            var urlBase = base_url + '/v1/nguonkhach/list';
            return $http.post(urlBase, filter, headers);
        };
        //add contract
        //get list liCustomer
        hopdongApi.liKhachhangs = function (filter) {
            var urlBase = base_url + '/v1/khachhang/list';
            return $http.post(urlBase, filter, headers);
        };
        //get list liSanphamquantams
        hopdongApi.liSanphamadds = function (filter) {
            var urlBase = base_url + '/v1/sanpham/list';
            return $http.post(urlBase, filter, headers);
        };

        //copy from customer to contract
        //list sanpham
        hopdongApi.listSanpham = function (filter) {
            var urlBase = base_url + '/v1/sanpham/list';
            return $http.post(urlBase, filter, headers);
        };
        //====================================================
        //get list loaikhachhangs
        hopdongApi.listLoaiKhachHang = function (filter) {
            var urlBase = base_url + '/v1/loaikhachhang/list';
            return $http.post(urlBase, filter, headers);
        };
        //get list nguonkhachs
        hopdongApi.listNguonKhach = function (filter) {
            var urlBase = base_url + '/v1/nguonkhach/list';
            return $http.post(urlBase, filter, headers);
        };
        //get list quanhuyens
        hopdongApi.listQuanHuyen = function (filter) {
            var urlBase = base_url + '/v1/quanhuyen/list';
            return $http.post(urlBase, filter, headers);
        };
        //get list thanhphos
        hopdongApi.listThanhPho = function (filter) {
            var urlBase = base_url + '/v1/thanhpho/list';
            return $http.post(urlBase, filter, headers);
        };
        //get list users
        hopdongApi.listTaiKhoan = function (filter) {
            var urlBase = base_url + '/v1/taikhoan/list';
            return $http.post(urlBase, filter, headers);
        };
        //get list nhucaugia
        hopdongApi.listNhucaugia = function (filter) {
            var urlBase = base_url + '/v1/nhucaugia/list';
            return $http.post(urlBase, filter, headers);
        };
        //======================================================
        //get item
        //get by id Khach hang
        hopdongApi.get_by_idKH = function (id) {
            var urlBase = base_url + '/v1/khachhang/get_by_id?khachhangId=' + id;
            return $http.get(urlBase, headers);
        };

        hopdongApi.get_san_pham_by_hop_dong_id = function (id) {
            var urlBase = base_url + '/v1/hopdong/get_san_pham_by_hop_dong_id?hopdongId=' + id;
            return $http.get(urlBase, headers);
        };

        hopdongApi.move_2_tech = function (id) {
            var urlBase = base_url + '/v1/hopdong/move_2_tech?contractId=' + id;
            return $http.post(urlBase, headers);
        };
        hopdongApi.xem_tien_do = function (filter) {
            var urlBase = base_url + '/v1/hopdong/xem_tien_do';
            return $http.post(urlBase, filter, headers);
        };


        return hopdongApi;

    }]);
