const PartyLink = require('../../Models/Posts');
const findLinkById = async (id) => {
    const link = await PartyLink.findOne({ _id: id })
        .populate('creator', ['-password', '-partylink', '-createdAt'])
        .populate('pictures.contributor', [
            '-password',
            '-email',
            '-partylink'
        ]);
    console.log(link);
    return link;
};

// const findLinkByCreator = async(id) =>{
//     const link = await PartyLink.findOne({ creator:})
// }
module.exports = {
    findLinkById
};
