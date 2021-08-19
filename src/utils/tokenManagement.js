require('dotenv').config();
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { abortIf } = require('./responder');

const generateToken = (data) => {
    const access_token = jwt.sign(data, process.env.SECRET, {
        expiresIn: '6h'
    });
    const refresh_token = jwt.sign(data, process.env.SECRET, {
        expiresIn: '1d'
    });
    return {
        access_token,
        refresh_token
    };
};

const generateAdminToken = (data) => {
    const access_token = jwt.sign(data, process.env.SECRET, {
        expiresIn: '6h'
    });
    const refresh_token = jwt.sign(data, process.env.SECRET, {
        expiresIn: '1d'
    });
    return {
        access_token,
        refresh_token
    };
};

const verifyToken = (token) => {
    const data = jwt.verify(token, process.env.SECRET);
    console.log(data);
    //abortIf(!data, httpStatus.FORBIDDEN, 'You shall not pass');
    return data;
};

module.exports = {
    generateToken,
    generateAdminToken,
    verifyToken
};
