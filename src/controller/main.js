function getEle(id) {
  return document.getElementById(id);
}

var callApi = new CallApi();
var validation = new Validation();

//reset input value
function resetValue() {
  getEle("maNV").value = "";
  getEle("tenNV").value = "";
  getEle("chucvu").value = "";
  getEle("luongNV").value = "";
  getEle("time").value = "";
}

resetValue();

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
    var tongLuong = nv.soGioLamTrongThang * 1 * nv.luongCoBan * 1;
    var loaiNhanVien = "";
    if (nv.soGioLamTrongThang <= 50) {
      loaiNhanVien = "Nhân viên kém";
    } else if (nv.soGioLamTrongThang > 50 && nv.soGioLamTrongThang <= 100) {
      loaiNhanVien = "Nhân viên giỏi";
    } else {
      loaiNhanVien = "Nhân viên xuất săc";
    }
    content += `
        <tr>
            <td>${nv.maNhanVien}</td>
            <td>${nv.tenNhanVien}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.luongCoBan}</td>
            <td>${tongLuong}</td>
            <td>${nv.soGioLamTrongThang}</td>
            <td class ="d-flex align-content-center">
                ${loaiNhanVien}
                <span class="ml-3">
                <button class="btn btn-info mr-2" data-toggle="modal"
                data-target="#myModal" onclick="editNV('${nv.maNhanVien}')">Edit</button>
                <button class="btn-delete btn btn-danger" onclick="deleteNV('${nv.maNhanVien}')">Delete</button>
                </span>
            </td>    
        </tr>
   `;
  });
  getEle("tableDanhSach").innerHTML = content;
}

//them nhan vien
function addNV() {
  var maNhanVien = getEle("maNV").value;
  var tenNhanVien = getEle("tenNV").value;
  var heSoChucVu = getEle("chucvu").value;
  var luongCoBan = getEle("luongNV").value;
  var soGioLamTrongThang = getEle("time").value;
  var isValid = true;
  /**
   * Validation
   * */
  isValid &=
    validation.checkEmpty(
      maNhanVien,
      "tbMaNV",
      "(*)Please enter your ID code"
    ) &&
    validation.checkMaNhanVien(
      maNhanVien,
      "tbMaNV",
      "(*) Your ID code is illegal"
    );

  isValid &=
    validation.checkEmpty(
      tenNhanVien,
      "tbTenNV",
      "(*) Please enter your name"
    ) &&
    validation.checkTenNhanVien(
      tenNhanVien,
      "tbTenNV",
      "(*) Your name is illegal"
    );
  isValid &=
    validation.checkEmpty(
      luongCoBan,
      "tbLuongCB",
      "(*) Please enter your salary"
    ) &&
    validation.checkLuongCoBan(
      luongCoBan,
      "tbLuongCB",
      "(*) Your salary is illegal"
    );

  isValid &=
    validation.checkEmpty(
      soGioLamTrongThang,
      "tbTime",
      "(*) Please enter working time"
    ) &&
    validation.checkThoiGianLamViec(
      soGioLamTrongThang,
      "tbTime",
      "(*) Your input is illegal"
    );

  isValid &= validation.kiemTraChucVu(
    "chucvu",
    "tbChucVu",
    "(*) Please select your role in company"
  );

  if (!isValid) return null;
  var chucVu = getEle("chucvu")[heSoChucVu * 1 - 1].text;

  var nv = new NhanVien(
    maNhanVien,
    tenNhanVien,
    chucVu,
    heSoChucVu,
    luongCoBan,
    soGioLamTrongThang
  );
  callApi
    .addInformation(nv)
    .then(function () {
      listInfomationEmployee();
      resetValue();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// delete

function deleteNV(id) {
  callApi
    .deleteInfomationEmployee(id)
    .then(function () {
      listInfomationEmployee();
    })
    .catch(function (error) {
      console.log(error);
    });
}

//get infor employee and edit the information
function editNV(id) {
  getEle("addNV").style.display = "none";
  var editBtn = `<button id="editBtn" class="btn btn-outline-success" onclick = "updateNV()">Cập nhật thông tin</button>`;
  getEle("form-btn").innerHTML += editBtn;
  callApi
    .getInformationEmployee(id)
    .then(function (result) {
      getEle("maNV").value = result.data.maNhanVien;
      getEle("tenNV").value = result.data.tenNhanVien;
      getEle("chucvu").value = result.data.heSoChucVu;
      getEle("luongNV").value = result.data.luongCoBan;
      getEle("time").value = result.data.soGioLamTrongThang;
      validation.renderNotify("tbMaNV", "", "none");
      validation.renderNotify("tbTenNV", "", "none");
      validation.renderNotify("tbChucVu", "", "none");
      validation.renderNotify("tbLuongCB", "", "none");
      validation.renderNotify("tbTime", "", "none");
    })
    .catch(function (error) {
      console.log(error);
    });
}

function updateNV() {
  var maNhanVien = getEle("maNV").value;
  var tenNhanVien = getEle("tenNV").value;
  var heSoChucVu = getEle("chucvu").value;
  var luongCoBan = getEle("luongNV").value;
  var soGioLamTrongThang = getEle("time").value;

  var isValid = true;
  /**
   * Validation
   * */
  isValid &=
    validation.checkEmpty(
      maNhanVien,
      "tbMaNV",
      "(*)Please enter your ID code"
    ) &&
    validation.checkMaNhanVien(
      maNhanVien,
      "tbMaNV",
      "(*) Your ID code is illegal"
    );

  isValid &=
    validation.checkEmpty(
      tenNhanVien,
      "tbTenNV",
      "(*) Please enter your name"
    ) &&
    validation.checkTenNhanVien(
      tenNhanVien,
      "tbTenNV",
      "(*) Your name is illegal"
    );
  isValid &=
    validation.checkEmpty(
      luongCoBan,
      "tbLuongCB",
      "(*) Please enter your salary"
    ) &&
    validation.checkLuongCoBan(
      luongCoBan,
      "tbLuongCB",
      "(*) Your salary is illegal"
    );

  isValid &=
    validation.checkEmpty(
      soGioLamTrongThang,
      "tbTime",
      "(*) Please enter working time"
    ) &&
    validation.checkThoiGianLamViec(
      soGioLamTrongThang,
      "tbTime",
      "(*) Your input is illegal"
    );

  isValid &= validation.kiemTraChucVu(
    "chucvu",
    "tbChucVu",
    "(*) Please select your role in company"
  );
  if (!isValid) return null;
  var chucVu = getEle("chucvu")[heSoChucVu * 1 - 1].text;
  var nv = new NhanVien(
    maNhanVien,
    tenNhanVien,
    chucVu,
    heSoChucVu,
    luongCoBan,
    soGioLamTrongThang
  );
  callApi
    .updateInfo(nv)
    .then(function () {
      listInfomationEmployee();
      resetValue();
      getEle("addNV").style.display = "block";
      getEle("editBtn").style.display = "none";
      //console.log(getEle("addNV"));
    })
    .catch(function (error) {
      console.log(error);
    });
}
