const httpStatus = require('http-status');
const User = require('../../Models/User');
const getUserById = async (id) => {
    const user = await User.findOne({ _id: id })
        .populate('partylink', '-password')
        .populate({
            path: 'partylink',
            populate: {
                path: 'creator',
                select: ['-password', '-partylink', , '-createdAt']
            }
        })
        .populate({
            path: 'partylink',
            populate: {
                path: 'pictures',
                populate: {
                    path: 'contributor',
                    select: ['-password', '-partylink', '-createdAt']
                }
            }
        });
    console.log(user);
    return user;
};
const getUserByEmail = async (email) => {
    const check = await User.findOne({ email }).exec();
    return check;
};
module.exports = {
    getUserById,
    getUserByEmail
};
