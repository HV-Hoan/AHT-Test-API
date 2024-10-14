const Post = require("../models/posts");


exports.list = async (req, res) => {
    try {
        const posts = await Post.find();
        res.render('Post/listPost', { post: posts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi server');
    }
};


exports.addPost = async (req, res, next) => {
    try {
        // Kiểm tra xem req.user có tồn tại và có thuộc tính id không
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        if (req.method === "POST") {
            let { title, content, status, image } = req.body;
            console.log("Link ảnh online:", image);
            if (!image) {
                return res.status(400).json({ message: 'Link ảnh không được trống' });
            }
            let objPosts = new Post({
                id_User: req.user._id,
                title: title,
                content: content,
                status: status,
                image: image,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });
            await objPosts.save();
            let msg = 'Đăng bài thành công với id: ' + objPosts._id;
            return res.json(msg);
        }
    } catch (error) {
        console.error('Log error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}



exports.update1 = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render("Post/update", { post });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Lỗi server");
    }
};
exports.update = async (req, res, next) => {
    try {
        const findID = req.params.id;

        const image = req.file ? req.file.filename : undefined; // Lấy đường dẫn của ảnh, nếu có

        const { title, content, status } = req.body;
        const update = await Post.findByIdAndUpdate(
            // mongoose.Types.ObjectId(findID),
            findID,
            {
                image,
                title,
                content,
                status,
                updated_at: new Date().toISOString()
            },
            { new: true, runValidators: true }
        );
        return res.render('Post/update', { post: update });
        // return res.redirect('/api/post/list');
    } catch (error) {
        console.error('Log error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.delete = async (req, res, next) => {
    try {
        const findID = req.params.id;
        const deletePost = await Post.findByIdAndDelete(findID);
        if (!deletePost) {
            return res.status(404).json({ message: " Bài đăng không tồn tại" });
        };
        return res.redirect('/api/post/list');
    } catch (error) {
        console.error('Log error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
