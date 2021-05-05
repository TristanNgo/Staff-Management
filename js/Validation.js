function Validation() {
    this.checkRong = function (input, spanID, mess) {
        if (input.trim() == ""  ) { 
            
            getEle(spanID).style.display = "block";
            getEle(spanID).innerHTML = mess;
            return false; // return k cần dùng tới biến isValid
        }
        getEle(spanID).style.display = "none";
        getEle(spanID).innerHTML = mess;
        return true;

    }
    this.kiemTraDoDaiKyTu = function (input, spanID, mess, min, max) {
        if (input.length >= min && input.length <= max) {
            getEle(spanID).style.display = "none";
            getEle(spanID).innerHTML = "";
            return true;
        }
        getEle(spanID).style.display = "block";
        getEle(spanID).innerHTML = mess;
        return false;
    }
    this.kiemTrachuoi = function (input, spanID, mess) {
        // var letters = /^[A-Za-z]+$/;
        var pattern = new RegExp(

            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +

            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +

            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"

        );
        //pattern.test(input): check xem dữ liệu người dùng nhập vào có nằm trong biến pattern hay k        
        if (pattern.test(input)) {
            getEle(spanID).style.display = "none";
            getEle(spanID).innerHTML = "";
            return true;
        }
        getEle(spanID).style.display = "block";
        getEle(spanID).innerHTML = mess;
        return false;
    }
    this.kiemTraEmail = function (input, spanID, mess) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (input.match(mailformat)) {
            getEle(spanID).style.display = "none";
            getEle(spanID).innerHTML = "";
            return true;
        }
        getEle(spanID).style.display = "block";
        getEle(spanID).innerHTML = mess;
        return false;
    }
    this.kiemTraChucVu = function (ele, spanID, mess) {

        if (getEle(ele).selectedIndex != 0) {
            getEle(spanID).style.display = "none";
            getEle(spanID).innerHTML = "";
            return true;
        }
        getEle(spanID).style.display = "block";
        getEle(spanID).innerHTML = mess;
        return false;
    }
    this.checkMaTrung = function (input, spanID, mess, arr) {
        /**
         * Duyệt mảng bằng forEachđể k bị trùng mã 
         * - Kiểm tra nếu input mà truyền vô có trùng vs mã nv trong  từng object
         * -Nếu trùng : báo lỗi , return false
         * Nếu không trùng : trả true , tắt báo lỗi 
         */
        var status = true;
        arr.forEach(function (item) {
            if (item.maNV === input) {
                status = false;

            }                                                                      
        });
        // status = !arr.some(function(item){
        //     return item.maNV === input;
        // })
        if (status) {
            getEle(spanID).style.display = "none";
            getEle(spanID).innerHTML = "";
            return true;
        }
        getEle(spanID).style.display = "block";
        getEle(spanID).innerHTML = mess;
        return false;
    }

}