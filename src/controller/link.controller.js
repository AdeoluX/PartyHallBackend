const catchAsync = require('../utils/catchAsync');
const { joinLink, uploadPicture } = require('../services/link.service');
const { successResponse } = require('../utils/responder');

const join = catchAsync(async (req, res, next) => {
    const id = res.locals.user_id;
    console.log(id, req.body.link_id);
    const link = req.body.link_id;
    const proceed = joinLink(id, link);
    return successResponse(res, proceed);
});

const upload = catchAsync(async (req, res, next) => {
    const id = res.locals.user_id;
    const partyLinkId = req.params.party_link_id;
    const image = req.files.image;
    console.log(image, 'TEST', partyLinkId, id);
    const _upload = await uploadPicture(partyLinkId, id, image);
    return successResponse(res, _upload);
});

module.exports = {
    join,
    upload
};
