function CallApi() {
  this.getInfomationEmployees = function () {
    return axios({
      url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien",
      method: "GET",
    });
  };

  this.deleteInfomationEmployee = function (id) {
    return axios({
      url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${id}`,
      method: "DELETE",
    });
  };

  this.addInformation = function (nv) {
    return axios({
      url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien",
      method: "POST",
      data: nv,
    });
  };
}
