function DanhSachNhanVien(){
    //Tạo mảng 
    this.arr = [];
    //Hàm thêm nhân viên 
    this.themNhanVien = function(NhanVien){
        this.arr.push(NhanVien);
    }
    //Hàm tìm vị trí
    this.timViTri = function(maNV){
        // Cách 1 
        // var index = -1;// khong tìm thấy 
        // this.arr.forEach(function(intem, i) {
        //     if(item.maNV === maNV ){
        //         index = i;
        //     }
        // });
        // return index;

        // Cách 2
        return this.arr.findIndex(function(item){
            return item.maNV === maNV;
        })
    }
    //Hàm xoá nhân viên
    this.xoaNhanVien =function(maNV){
        var index = this.timViTri(maNV);
        if(index !== -1){
            //tìm thấy
            this.arr.splice(index, 1)
        }
        
    }
    //Hàm Edit Infor
    this.layThongTinNhanVien = function(maNV){
        // var nhanVien;
        // this.arr.forEach(function(item) {
        //     if(item.maNV === maNV){
        //         nhanVien = item;
        //     }
        // });
        // return nhanVien;
        return this.arr.find(function(item){
            return item.maNV === maNV;
        })
    }
    this.capNhatNhanVien = function(nhanVien){
        /**
         * 0. Tìm vị trí nhanVien cần cập nhật
         * 1. Cập nhật nhanVien vào mảng thứ vị trí tìm thấy
         */
         var index = this.timViTri(nhanVien.maNV);
        if(index !== -1){
            this.arr[index]= nhanVien;
        }
         return index;

    }
    
}

DanhSachNhanVien.prototype.timKiemNhanVien = function(keyword){
    /**
     *      Tạo ra 1 mảng tìm kiếm []
     * 0. Duyệt mảng arr
     * 1. Kiểm tra keyword có tồn tại từng tenNV trong object k ?
     * 2. Nếu tìm dc,
     * 3. Trả mảng tìm kiếm
     * 
     */
    //var TimKiem = [];
    // this.arr.forEach(function(item){
    //     if(item.tenNV.toLowerCase().indexOf(keyword.toLowerCase()) !== -1){
    //         TimKiem.push(item);
    //     }
    // })
    //return TimKiem;
    return this.arr.filter(function(item){
        return item.tenNV.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    })
}