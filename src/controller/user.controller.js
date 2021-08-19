const catchAsync = require('../utils/catchAsync');
const {
    createUser,
    login,
    createPartyLink,
    getAllpartyLinks,
    getAllPartyLinksByCreator,
    getAllPictures
} = require('../services/user.service');
const { successResponse } = require('../utils/responder');

const signUp = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const create = await createUser(req.body);
    return successResponse(res, create);
});

const logIn = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const log_in = await login(req.body);
    return successResponse(res, log_in);
});

const createpartyLink = catchAsync(async (req, res, next) => {
    const id = res.locals.user_id;
    const link = await createPartyLink(id, req.body);
    console.log(link);
    return successResponse(res, link);
});

const getAllpartyLinksByCreator = catchAsync(async (req, res, next) => {
    const id = res.locals.user_id;
    const links = await getAllPartyLinksByCreator(id);
    console.log(links);
    return successResponse(res, links);
});
const getPartyLinks = catchAsync(async (req, res, next) => {
    const id = res.locals.user_id;
    const links = await getAllpartyLinks(id);
    return successResponse(res, links);
});
const getAllpics = catchAsync(async (req, res, next) => {
    const id = res.locals.user_id;
    const links = await getAllPictures(id, req.params.partyLink);
    return successResponse(res, links);
});

module.exports = {
    signUp,
    logIn,
    createpartyLink,
    getPartyLinks,
    getAllpartyLinksByCreator,
    getAllpics
};
