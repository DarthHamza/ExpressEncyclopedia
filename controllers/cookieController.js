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
        console.log(req.body);
        let attributes = req.body.attributes ? req.body.attributes : [];
        let exclude = req.body.exclude ? req.body.exclude : [];
        const cookies = await Cookie.findAll({attributes});
        res.status(200).json(cookies);
    } catch (error) {
        res.status(500).json({message: error.message});
    }  
}

exports.cookieDetail = (req, res) => {
    const cookieID = req.params.id;
    const myCake = cookies.find(cake => cake.id === cookieID);
    res.status(200).json(cake);
}

exports.cookieUpdate = (req, res) => {
    const cookieID = req.params.id;
    const foundCookie = cookies.find(cookie => cookie.id === +cookieID);
    
    if (foundCookie){
        for (let key in req.body) foundCookie[key] = req.body[key];
        res.status(200).json(foundCookie);
    } else {
        res.status(404).json({msg: "Cookie not found"});   
    }
}

exports.cookieDelete = (req, res) => {
    const cookieID = req.params.id;
    const foundCookie = cookies.find(cookie => cookie.id === +cookieID);
    if (foundCookie){
        cookies = cookies.filter(cookie => cookie.id !== +cookieID);
        res.status(204).end();
    } else {
        res.status(404).json({msg: 'Cookie not found'});
    }
}