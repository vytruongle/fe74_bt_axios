function CallApi() {
  this.getInfomationEmployees = function () {
    return axios({
      url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien",
      method: "GET",
    });
  };

  this.deleteInfomationEmployee = function (id) {
    return axios({
      url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${id}`,
      method: "DELETE",
    });
  };

  this.addInformation = function (nv) {
    return axios({
      url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien",
      method: "post",
      data: nv,
    });
  };

  this.getInformationEmployee = function (id) {
    return axios({
      url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${id}`,
      method: "GET",
    });
  };

  this.updateInfo = function (nv) {
    return axios({
      url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nv.maNhanVien}`,
      method: "PUT",
      data: nv,
    });
  };
}
