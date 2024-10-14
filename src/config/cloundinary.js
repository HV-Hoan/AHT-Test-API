const cloudinary = require('cloudinary').v2;


// Configuration
cloudinary.config({
    cloud_name: 'dxb712htb',
    api_key: '598918782339496',
    api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
});
exports.module = cloudinary;