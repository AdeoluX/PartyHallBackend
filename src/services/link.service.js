const httpStatus = require('http-status');
const User = require('../../Models/User');
const PartyLink = require('../../Models/Posts');
const { generateToken } = require('../utils/tokenManagement');
const { cloudinaryUpload } = require('../utils/cloudinary');
const { getUserById } = require('./getuser');
const { findLinkById } = require('./getLinks');
const { abortIf } = require('../utils/responder');
const mongoose = require('mongoose');

// async function getUserById(id) {
//     console.log(id, 'AAAAAAAAAAAAAAAAAAAAAAA');
//     const user = await User.findOne({ _id: id }).populate('partylink');
//     return user;
// }

const joinLink = async (id, link) => {
    console.log(id, link);
    try {
        const user = getUserById(id);
        const link_ = await findLinkById(link);
        abortIf(
            user == null || link_ == null,
            httpStatus.BAD_REQUEST,
            'User or Link Does not exist'
        );
        console.log(user);
        user.partylink.push(link);
        await user.save();
        return user;
    } catch (err) {
        console.log(err.message);
    }
};

const uploadPicture = async (partyLinkId, id, image) => {
    const link = await findLinkById(partyLinkId);
    abortIf(!link, httpStatus.NOT_FOUND, 'Link cannot be found');
    const user = await getUserById(id);
    abortIf(!user, httpStatus.NOT_FOUND, 'User Does not Exist');
    const up = await cloudinaryUpload(image);
    const data = { contributor: id, url: up.secure_url };
    link.pictures.push(data);
    link.save();
    return link;
};


module.exports = {
    joinLink,
    uploadPicture,
};
