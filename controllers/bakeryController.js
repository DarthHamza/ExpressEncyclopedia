const slugify = require('slugify');
const { Bakery, Cookie } = require('../db/models');

exports.bakeryCreate = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.image = `${req.protocol}://${req.get('host')}/media/${req.file.filename}`;
        }
        const newBakery = await Bakery.create(req.body);
        res.status(201).json(newBakery);
    } catch (error) {
        next(error);
    }
}

exports.bakeryList = async (req, res, next) => {
    try {
        let attributes = req.body.attributes ? req.body.attributes : [];
        const bakeries = await Bakery.findAll({attributes});
        res.status(200).json(bakeries);
    } catch (error) {
        next(error);
    }
}


exports.fetchBakery = async (bakeryID, next) => {
    try{
        const bakery = await Bakery.findByPk(bakeryID);
        return bakery;
    } catch (error){
        next(error);
    }
}

exports.bakeryDetail = async (req, res, next) => {
    try {
        res.status(200).json(req.bakery);
    } catch(error) {
        next(error);
    }
}

exports.bakeryUpdate = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.image = `${req.protocol}://${req.get('host')}/media/${req.file.filename}`;
        }
        await req.bakery.update(req.body);
        res.status(200).json(req.bakery);
    } catch(error) {
        next(error);
    }
}

exports.bakeryDelete = async (req, res, next) => {
    try {
        await req.bakery.destroy();
        res.status(204).end();
    } catch(error) {
        next(error);
    }
}

exports.cookieCreate = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.image = `${req.protocol}://${req.get('host')}/media/${req.file.filename}`;
        }
        req.body.bakeryId = req.bakery.id;
        const newCookie = await Cookie.create(req.body);
        res.status(201).json(newCookie);
    } catch (error) {
        next(error);
    }
}