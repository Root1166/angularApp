/// <summary>
/// Các vai trò hệ thống không được phép xóa
/// </summary>
var SYSTEM_ROLES = {
    /// <summary>
    /// Quản trị hệ thống
    /// </summary>
    Administrators: 1011,

    /// <summary>
    /// Nhân viên marketing
    /// </summary>
    Marketers: 1012,

    /// <summary>
    /// Nhân viên kinh doanh
    /// </summary>
    Salers: 1013,

    /// <summary>
    /// Nhân viên kỹ thuật
    /// </summary>
    Technician: 1014,

    /// <summary>
    /// Quản lý kinh doanh
    /// </summary>
    SalesManagement: 1015,

    /// <summary>
    /// Quản lý kinh doanh
    /// </summary>
    MarketingManager: 1016,
}

/// <summary>
/// Loại báo cáo công việc
/// </summary>
var BAO_CAO_CONG_VIEC = {
    /// <summary>
    /// Thời gian đi xe
    /// </summary>
    Thoi_gian_di_xe: 1,

    /// <summary>
    /// Thời gian chờ vật tư
    /// </summary>
    Thoi_gian_cho_vat_tu: 2,

    /// <summary>
    /// Thời gian chuẩn bị vật tư
    /// </summary>
    Thoi_gian_chuan_bi_vat_tu: 3,

    /// <summary>
    /// Thời gian thi công
    /// </summary>
    Thoi_gian_thi_cong: 4,

    /// <summary>
    /// Đi tỉnh
    /// </summary>
    Di_tinh: 5,

    /// <summary>
    /// Khác
    /// </summary>
    Khac: 6,
}
var SU_CO = {
    /// <summary>
    ///Do khách hàng
    /// </summary>
    Do_khach_hang: 1,

    /// <summary>
    /// Do kỹ thuật
    /// </summary>
    Do_ky_thuat: 2,

    /// <summary>
    /// Do khách hàng
    /// </summary>
    Khach_quan: 3,
}
var TRANG_THAI_CONG_VIEC = {
    /// <summary>
    ///Chờ xử lý
    /// </summary>
    CHO_XU_LY: 1,

    /// <summary>
    /// đang xử lý
    /// </summary>
    DANG_XU_LY: 2,

    /// <summary>
    /// Hoàn thành
    /// </summary>
    HOAN_THANH: 3,
}
var CUSTOMERSTATUS = {
    /// <summary>
    /// Khách hàng mới
    /// </summary>
    NEW: 0,

    /// <summary>
    /// Đã chuyển sale
    /// </summary>
    MOVE2SALE: 1,

    /// <summary>
    /// Đã chuyển đổi
    /// </summary>
    CONVERTED: 2,

    /// <summary>
    /// Chưa chuyển đổi
    /// </summary>
    NOTCONVERRSION: 3,

    /// <summary>
    /// Khách hàng mới tiếp nhận
    /// </summary>
    RECEIVED: 4,
    /// <summary>
    /// Chuyển cho sale
    /// </summary>
    MOVE2SUBSALE: 5
}

var LOAI_HOP_DONG = {
    HopdongDichvu: 1,
    Donhang: 2
}

var LOAI_CONG_VIEC = {
    Thoi_gian_di_xe: 1,
    Thoi_gian_cho_vat_tu: 2,
    Thoi_gian_chuan_bi_vat_tu: 3,
    Thoi_gian_thi_cong: 4,
    Di_tinh: 5,
    Khac: 6
}

var LOAI_CHI_PHI = {
    Nhan_cong: 0,
    Di_lai: 1,
    An_uong: 2,
    Nha_nghi: 3,
    Khac: 4
}

var TRANG_THAI_HOP_DONG = {
    /// <summary>
    /// Chờ xử lý
    /// </summary>
    Pending: 0,
    /// <summary>
    /// Đang xử lý
    /// </summary>
    InProgress: 1,
    /// <summary>
    /// Hoàn tất
    /// </summary>
    Completed: 2,
    /// <summary>
    /// Hợp đồng sale mới tạo
    /// </summary>
    New: 3
}

var CUSTOMER_TYPE = {
    /// <summary>
    /// cty
    /// </summary>
    Company: 1,
    /// <summary>
    /// Person
    /// </summary>
    Person: 2,

}
