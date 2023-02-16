function Validation() {
  this.renderNotify = function (spanId, mess, displayStyle) {
    getEle(spanId).style.display = displayStyle;
    getEle(spanId).innerHTML = mess;
  };
  this.checkEmpty = function (value, spanId, mess) {
    if (value === "") {
      this.renderNotify(spanId, mess, "block");
      return false;
    }
    this.renderNotify(spanId, "", "none");
    return true;
  };
  this.checkMaNhanVien = function (maNV, spanId, mess) {
    var number = /^[0-9]+$/;
    if (maNV.match(number) && maNV.length >= 4 && maNV.length <= 6) {
      this.renderNotify(spanId, "", "none");

      return true;
    }
    this.renderNotify(spanId, mess, "block");
    return false;
  };

  this.checkTenNhanVien = function (tenNV, spanId, mess) {
    var text =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (tenNV.match(text)) {
      this.renderNotify(spanId, "", "none");
      return true;
    }
    this.renderNotify(spanId, mess, "block");
    return false;
  };

  this.checkLuongCoBan = function (luongNV, spanId, mess) {
    var luongCoBan = luongNV * 1;
    var number = /^[0-9]+$/;
    if (
      luongNV.match(number) &&
      luongCoBan >= 1000000 &&
      luongCoBan <= 20000000
    ) {
      this.renderNotify(spanId, "", "none");
      return true;
    }
    this.renderNotify(spanId, mess, "block");
    return false;
  };

  this.checkThoiGianLamViec = function (time, spanId, mess) {
    var thoiGianLamViec = time * 1;
    var number = /^[0-9]+$/;
    if (time.match(number) && thoiGianLamViec >= 50 && thoiGianLamViec <= 150) {
      this.renderNotify(spanId, "", "none");
      return true;
    }
    this.renderNotify(spanId, mess, "block");
    return false;
  };
  this.kiemTraChucVu = function (idSelect, spanId, message) {
    if (getEle(idSelect).selectedIndex < 0) {
      getEle(spanId).style.display = "block";
      getEle(spanId).innerHTML = message;
      return false;
    }
    getEle(spanId).style.display = "none";
    getEle(spanId).innerHTML = "";
    return true;
  };
}
