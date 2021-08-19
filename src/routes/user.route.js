const express = require('express');
const {
    signUp,
    logIn,
    createpartyLink,
    getAllpartyLinksByCreator,
    getPartyLinks,
    getAllpics
} = require('../controller/user.controller');
const router = express.Router();
const { verify } = require('../middleware/verifyToken');

router.post('/sign-up', signUp);
router.post('/login', logIn);
router.post('/create-partylink', verify, createpartyLink);
router.get('/all-party-links-created', verify, getAllpartyLinksByCreator);
router.get('/all-party-links', verify, getPartyLinks);
router.get('/:partyLink/all-pictures', verify, getAllpics);

module.exports = router;
