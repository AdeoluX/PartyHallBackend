const httpStatus = require('http-status');
const { abortIf } = require('../utils/responder');
const { verifyToken } = require('../utils/tokenManagement');

const verify = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    abortIf(!token || token == '', httpStatus.FORBIDDEN, 'You shall not pass');
    const data = verifyToken(token);
    console.log(data);
    abortIf(!data, httpStatus.FORBIDDEN, 'You shall not pass');
    const id = data.id;
    res.locals.user_id = id;
    next();
};

module.exports = {
    verify
};
