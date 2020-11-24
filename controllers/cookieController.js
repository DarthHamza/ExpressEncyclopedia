const slugify = require('slugify');
const { Cookie } = require('../db/models');


exports.cookieCreate = async (req, res, next) => {
    try {
        const newCookie = await Cookie.create(req.body);
        res.status(201).json(newCookie);
    } catch (error) {
        next(error);
    }
}

exports.cookieList = async (req, res, next) => {
    try {
        let attributes = req.body.attributes ? req.body.attributes : [];
        const cookies = await Cookie.findAll({attributes});
        res.status(200).json(cookies);
    } catch (error) {
        next(error);
    }
}


exports.fetchCookie = async (cookieID, next) => {
    try{
        const cookie = await Cookie.findByPk(cookieID);
        return cookie;
    } catch (error){
        next(error);
    }
}

exports.cookieDetail = async (req, res, next) => {
    try {
        res.status(200).json(req.cookie);
    } catch(error) {
        next(error);
    }
}

exports.cookieUpdate = async (req, res, next) => {
    try {
        await req.cookie.update(req.body);
        res.status(200).json(req.cookie);
    } catch(error) {
        next(error);
    }
}

exports.cookieDelete = async (req, res, next) => {
    try {
        await req.cookie.destroy();
        res.status(204).end();
    } catch(error) {
        next(error);
    }
}
