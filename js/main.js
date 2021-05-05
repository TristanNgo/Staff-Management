var dsnv = new DanhSachNhanVien();
var validation = new Validation();
getLocalStorage(); // Nên đặt ở global để khibắt đầu lại web thì nó sẽ lấydữ liệu
getEle("btnThem").addEventListener("click", function () {
    //Dom tới nút cập nhật cho nó ẩn 
    getEle("btnCapNhat").style.display = "none";
    getEle("btnThemNV").style.display = "block";
    getEle("msnv").removeAttribute("disabled")

    
})

/** 
 * Thêm nhân viên =>> làm ẩn nút cập nhật 
*/
getEle("btnThemNV").addEventListener("click", function () {
    
    //Dom tới 6 ô input lấy value
    var maNV = getEle("msnv").value;
    var tenNV = getEle("name").value;
    var email = getEle("email").value;
    var password = getEle("password").value;
    var date = getEle("datepicker").value;
    var chucVu = getEle("chucvu").value;
    var isValid = true;
    //.trim() : chỉ lấy chuỗi người dùng nhập vào , k tính chuỗi từ nút space 
    isValid &= validation.checkRong(maNV, "tbMaNV", "*Ma NV k đc rỗng ")
        && validation.kiemTraDoDaiKyTu(maNV, "tbMaNV", "Độ dài ký tự từ 4 - 10", 4, 10)
        && validation.checkMaTrung(maNV, "tbMaNV", "Mã NV đã có vui lòng nhập mã khác", dsnv.arr);
    isValid &= validation.checkRong(tenNV, "tbTen", "(*) Ten NV k dc rong")
        && validation.kiemTrachuoi(tenNV, "tbTen", "Chỉ nhập chữ thường , chữ hoa , không nhập số");
    isValid &= validation.checkRong(email, "tbEmail", "* Email không dc để rỗng")
        && validation.kiemTraEmail(email, "tbEmail", "Dữ liệu email không phù hợp");
    isValid &= validation.checkRong(password, "tbMatKhau", "* PassWord không được rỗng ");
    // && validation.kiemTraDoDaiKyTu(maNV, "tbMaNV", "Độ dài ký tự từ 4 - 10", 4, 10);
    isValid &= validation.checkRong(date, "tbNgay", "* Dữ liệu bắt buộc ");
    // && validation.kiemTraDoDaiKyTu(maNV, "tbMaNV", "Độ dài ký tự từ 4 - 10", 4, 10);
    isValid &= validation.kiemTraChucVu("chucvu", "tbChucVu", "Vui lòng chọn chức vụ");

    if (!isValid) return; // Nếu isvalid là false thì phủ định = true => return dừng program
    console.log("Thêm thành công");
    var nhanVien = new NhanVien(maNV, tenNV, email, password, date, chucVu);
    dsnv.themNhanVien(nhanVien);
    
    taoBang(dsnv.arr);
    setLocalStorage();
})
getEle("btnCapNhat").addEventListener("click", function(){
    //Dom tới 6 ô input lấy value mới 
    var maNV = getEle("msnv").value;
    var tenNV = getEle("name").value;
    var email = getEle("email").value;
    var password = getEle("password").value;
    var date = getEle("datepicker").value;
    var chucVu = getEle("chucvu").value;
    
    var nhanVien = new NhanVien(maNV, tenNV, email,password, date, chucVu);
    dsnv.capNhatNhanVien(nhanVien);
    taoBang(dsnv.arr);
    setLocalStorage();
    getEle("btnDong").click();// Khi người dùng cập nhật xog thì chỗ này giúp tự động đóng màn hình lun
    
})
//Tìm kiếm 
getEle("searchName").addEventListener("keyup", function(){
    var keyword = getEle("searchName").value;
    var mangTimKiem = dsnv.timKiemNhanVien(keyword);
    taoBang(mangTimKiem);
    setLocalStorage();

})
function getEle(id) {
    return document.getElementById(id);
}
function taoBang(arr){
    var contentHTML = "";
    arr.forEach(function (item){
       contentHTML += `
       <tr>
           <td>${item.maNV}</td>
           <td>${item.tenNV}</td>
           <td>${item.email}</td>
           <td>${item.date}</td>
           <td>${item.chucVu}</td>
           <td>
                <button class = "btn btn-info" data-target="#myModal" data-toggle="modal" onclick="suaNhanVien('${item.maNV}')">Edit</button>
                <button class ="btn btn-danger" onclick="xoaNhanVien('${item.maNV}')">Delete</button>
           </td>   
       </tr>  
       `;
    });
    getEle("tableDanhSach").innerHTML = contentHTML;
}
/**
 * Lưu Mảng dsnv.arr xuống LocalStorage
 * Chuyển data sang kiểu  string
 */
function setLocalStorage(){
    localStorage.setItem("DSNV", JSON.stringify(dsnv.arr))

}
/**
 * Lấy mảng dsnv từ localStorage
 * Chuyển qua kiểu JSON
 */
function getLocalStorage(){
    if(localStorage.getItem("DSNV")){
        var arr = localStorage.getItem("DSNV");
        dsnv.arr = JSON.parse(arr);
        taoBang(dsnv.arr);
    }
    // //Lấy mảng từ LocalStorage gán vào biến arr
    // var arr = localStorage.getItem("DSNV");
    // //Chuyển arr thành kiểu JSON sau đó gán vào dsnv.arr
    // dsnv.arr = JSON.parse(arr);
    //dsnv.arr = JSON.parse(localStorage.getItem("DSNV")) ;
    

}
function xoaNhanVien(maNV){
    dsnv.xoaNhanVien(maNV);
    taoBang(dsnv.arr);
    setLocalStorage();

}
function suaNhanVien(maNV){
    getEle("btnThemNV").style.display = "none";
    getEle("btnCapNhat").style.display ="block";
    var nv = dsnv.layThongTinNhanVien(maNV);

    getEle("msnv").value = nv.maNV;
    getEle("msnv").setAttribute("disabled", true);
    getEle("name").value =nv.tenNV ;
    getEle("email").value =nv.email;
    getEle("password").value =nv.password;
    getEle("datepicker").value =nv.date;
    getEle("chucvu").value =nv.chucVu;
    
    /**
     * dom tới 6 ô input gán value từ đối tượng nv
     */
}
// function taoBang() {
//     //reset lại tbody
//     getEle("tableDanhSach").innerHTML = "";
//     for (var i = 0; i < dsnv.arr.length; i++) {
//         var tagTR = document.createElement("tr"); //tao dong

//         var tagTD_maNV = document.createElement("td");
//         var tagTD_tenNV = document.createElement("td");
//         var tagTD_email = document.createElement("td");
//         var tagTD_date = document.createElement("td");
//         var tagTD_chucVu = document.createElement("td"); //tao cot

//         //Tạo nội dung cho cột 
//         tagTD_maNV.innerHTML = dsnv.arr[i].maNV;
//         tagTD_tenNV.innerHTML = dsnv.arr[i].tenNV;
//         tagTD_email.innerHTML = dsnv.arr[i].email;
//         tagTD_date.innerHTML = dsnv.arr[i].date;
//         tagTD_chucVu.innerHTML = dsnv.arr[i].chucVu;

//         //Gán nội dung của cột vừa tạo vào dòng 
//         tagTR.appendChild(tagTD_maNV);
//         tagTR.appendChild(tagTD_tenNV);
//         tagTR.appendChild(tagTD_email);
//         tagTR.appendChild(tagTD_date);
//         tagTR.appendChild(tagTD_chucVu);

//         // Gán dòng vừa dc (gán) vào tbody
//         getEle("tableDanhSach").appendChild(tagTR);
//     }

// }
