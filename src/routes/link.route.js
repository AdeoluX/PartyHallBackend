const express = require('express');
const { join, upload } = require('../controller/link.controller');
const router = express.Router();
const { verify } = require('../middleware/verifyToken');

router.post('/join-link', verify, join);
router.post('/:party_link_id/upload-picture', verify, upload);
// router.get('/:link/picture', verify, getAllpartyLinksByCreator);

module.exports = router;
