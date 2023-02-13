function getEle(id) {
  return document.getElementById(id);
}

var callApi = new CallApi();

function listInfomationEmployee() {
  callApi
    .getInfomationEmployees()
    .then(function (result) {
      renderList(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

listInfomationEmployee();

function renderList(dsnv) {
  var content = "";
  dsnv.forEach((nv) => {
    var tongLuong = nv.heSoChucVu * 1 * nv.luongCoBan * 1;
    content += `
        <tr>
            <td>${nv.maNhanVien}</td>
            <td>${nv.tenNhanVien}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.luongCoBan}</td>
            <td>${tongLuong}</td>
            <td>${nv.soGioLamTrongThang}</td>
            <td class ="d-flex align-content-center">
                <button class="btn btn-info mr-2" data-toggle="modal"
                data-target="#myModal" onclick="editNV('${nv.maNhanVien}')">Edit</button>
                <button class="btn-delete btn btn-danger" onclick="deleteNV('${nv.maNhanVien}')">Delete</button>
            </td>    
        </tr>
   `;
  });
  getEle("tableDanhSach").innerHTML = content;
}
//them nhan vien
getEle("addNV").addEventListener("click", function () {
  var _maNhanVien = getEle("maNV").value;
  var _tenNhanVien = getEle("tenNV").value;
  var _heSoChucVu = getEle("chucvu").value;
  if (_heSoChucVu === "1") {
    var _chucVu = "Nhân viên";
  } else if (_heSoChucVu === "2") {
    var _chucVu = "Quản lý";
  } else {
    var _chucVu = "Giám đốc";
  }
  var _luongCoBan = getEle("luongNV").value;
  var _soGioLamTrongThang = getEle("time").value;

  var nv = new NhanVien(
    _maNhanVien,
    _tenNhanVien,
    _chucVu,
    _heSoChucVu,
    _luongCoBan,
    _soGioLamTrongThang
  );

  callApi
    .addInformation(nv)
    .then(function (result) {
      console.log(result);
    })
    .catch(function (error) {
      console.log(error);
    });
});
