const httpStatus = require('http-status');
const User = require('../../Models/User');
const PartyLink = require('../../Models/Posts');
const { generateToken } = require('../utils/tokenManagement');
const { abortIf } = require('../utils/responder');
const mongoose = require('mongoose');
const { findLinkById } = require('./getLinks');
const { getUserById } = require('./getuser');

const createUser = async (data) => {
    let create;
    create = await new User(data).save();
    const token = generateToken({ id: create.id });
    abortIf(create == null, httpStatus.BAD_REQUEST, 'Unable to SignUp');
    const { first_name, last_name, email, subject, class_ } = create;
    return { first_name, last_name, email, ...token };
};

const login = async (data) => {
    const { email, password } = data;
    abortIf(
        !email || !password,
        httpStatus.BAD_REQUEST,
        'Please provide an email or a password'
    );
    const user = await User.findOne({ email }).select('+password');
    abortIf(!user, httpStatus.BAD_REQUEST, 'Invalid Credentials');
    const isMatch = await user.matchPassword(password);
    abortIf(!isMatch, httpStatus.BAD_REQUEST, 'Invalid Credentials');
    const token = generateToken({ id: user.id });
    return { user, ...token };
    console.log(':gh');
};

const updateUser = () => {};

const getAllUsers = () => {};

const createPartyLink = async (id, data) => {
    const saveData = { creator: id, name: data.name };
    const partylink = await new PartyLink(saveData).save();
    const user = await getUserById(id);
    console.log(partylink);
    user.partylink.push(partylink.id);
    await user.save();
    return partylink;
};

const getAllPartyLinksByCreator = async (id) => {
    const getLinks = await PartyLink.find({
        creator: mongoose.Types.ObjectId(id)
    })
        .populate('pictures.contributor', ['-password', '-email', '-partylink'])
        .populate('creator', ['-password', '-partylink', '-createdAt']);
    abortIf(!getLinks, httpStatus.NOT_FOUND, 'This PartyLink Does not Exist');
    return getLinks;
};

const getAllpartyLinks = async (id) => {
    const getLinks = await getUserById(id);
    console.log(
        getLinks,
        'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL'
    );
    abortIf(!getLinks, httpStatus.NOT_FOUND, 'This User Does not Exist');
    return getLinks.partylink;
};

const getAllPictures = async (user_id, partyLinkId) => {
    const user = await getUserById(user_id);
    console.log(user, 'USER');
    abortIf(!user, httpStatus.NOT_FOUND, 'User does not exist');
    const partyLink = await findLinkById(partyLinkId);
    console.log(partyLink, 'OKAY');
    abortIf(!partyLink, httpStatus.NOT_FOUND, 'PartyLink does not exist');

    const check = user.partylink.reduce((item) => {
        if (item.id == partyLinkId) {
            return true;
        }
    });
    console.log(check, 'CHECK');
    abortIf(
        !check,
        httpStatus.NOT_FOUND,
        'This user does not belong to this party'
    );
    return { pictures: partyLink.pictures, creator: partyLink.creator };
};

const deleteUser = () => {};

module.exports = {
    createUser,
    createPartyLink,
    updateUser,
    getAllUsers,
    deleteUser,
    login,
    getAllpartyLinks,
    getAllPartyLinksByCreator,
    getAllPictures
};
