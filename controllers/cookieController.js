const slugify = require('slugify');
const { Cookie } = require('../db/models');


exports.cookieCreate = async (req, res) => {
    try {
        const newCookie = await Cookie.create(req.body);
        res.status(201).json(newCookie);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.cookieList = async (req, res) => {
    try {
        let attributes = req.body.attributes ? req.body.attributes : [];
        let exclude = req.body.exclude ? req.body.exclude : [];
        const cookies = await Cookie.findAll({attributes});
        res.status(200).json(cookies);
    } catch (error) {
        res.status(500).json({message: error.message});
    }  
}

exports.cookieDetail = async (req, res) => {
    const { id:cookieID } = req.params;
    try {
        const foundCookie = await Cookie.findByPk(cookieID);
        if(foundCookie){
            res.status(200).json(foundCookie);
        } else {
            res.status(404).json({message: "Cookie not found"});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.cookieUpdate = async (req, res) => {
    const { id:cookieID } = req.params;

    try {
        const foundCookie = await Cookie.findByPk(cookieID);
        if(foundCookie){
            await foundCookie.update(req.body);
            res.status(200).json(foundCookie);
        } else {
            res.status(404).json({message: "Cookie not found"});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.cookieDelete = async (req, res) => {
    const { id:cookieID } = req.params;

    try {
        const foundCookie = await Cookie.findByPk(cookieID);
        if(foundCookie){
            await foundCookie.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({message: "Cookie not found"});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
