const Post = require("../models/posts");

exports.addPost = async (req, res, next) => {
    try {
        // Kiểm tra xem req.user có tồn tại và có thuộc tính id không
        console.log(req.user);

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        if (req.method === "POST") {
            let { title, content, status } = req.body;
            let objPosts = new Post({
                id_User: req.user._id,
                title: title,
                content: content,
                status: status,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });
            await objPosts.save();
            let msg = 'Thêm thành công phòng mới với id: ' + objPosts._id;
            return res.json(msg);
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.update = async (req, res, next) => {
    try {
        const findID = req.params.id;
        const { title, content, status } = req.body;
        const update = await Post.findByIdAndUpdate(
            findID,
            { title, content, status, updated_at: new Date().toISOString() },
            { new: true, runValidators: true }
        );
        if (!update) {
            return res.status(404).json({ message: 'Không tìm thấy bài đăng' });
        }
        return res.status(200).json({ message: 'Cập nhật thành công', product: update });
    } catch (error) {

    }
}