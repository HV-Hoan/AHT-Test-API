const { json } = require("express");
const Product = require("../models/products");


exports.XemDanhSachSanPham = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm' });
    }
};


exports.xemchitiet = async (req, res, next) => {
    try {
        const showID = req.params.id
        const ShowProducts = await Product.findOne({ _id: showID });

        if (!ShowProducts) {
            return res.status(404).json({ message: "Không tìm thấy đối tượng" });
        }
        msg = " Đã tìm thấy dối tượng"
        return res.status(200).json({ message: msg, product: ShowProducts });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



exports.ThemSanPham = async (req, res, next) => {
    try {
        if (req.method === "POST") {
            let { name, price } = req.body;

            let objProduct = new Product({
                name: name,
                price: Number(price)
            });

            await objProduct.save();

            let msg = 'Thêm thành công id mới = ' + objProduct._id;
            //return res.redirect('/api/danhsach');
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.sua = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const { name, price } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, price },
            { new: true, runValidators: true } // new: true để trả về đối tượng cập nhật, runValidators: true để chạy các validators
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
        return res.status(200).json({ message: 'Cập nhật thành công', product: updatedProduct });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.xoa = async (req, res, next) => {
    try {
        const productID = req.params.id
        const xoaSP = await Product.findByIdAndDelete(productID);

        if (!xoaSP) {
            return res.status(404).json({ message: " Không có đối tượng" });
        }

        msg = "Xóa sản phẩm thành công";
        //return res.redirect('/api/danhsach');
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


