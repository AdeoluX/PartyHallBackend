const cloudinary = require('cloudinary').v2;
const { abortIf } = require('./responder');
const httpStatus = require('http-status');

cloudinary.config({
    cloud_name: 'dsavh0wlc',
    api_key: '565295426515125',
    api_secret: 'U7OS6MyKGVtHnId5qNMsan-hsrE'
});

const cloudinaryUpload = (image) => {
    const upload = cloudinary.uploader
        .upload(image.tempFilePath)
        .then((result) => {
            return result;
        })
        .catch((error) => {
            abortIf(error, httpStatus.BAD_REQUEST, 'Failed to upload');
        });
    return upload;
};

module.exports = {
    cloudinaryUpload
};
