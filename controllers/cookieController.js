const slugify = require('slugify')
let cookies = require('../cookies')

exports.cookieCreate = (req, res) => {
    const id = cookies[cookies.length - 1].id + 1;
    const slug = slugify(req.body.name, {lower: true});
    const newCookie = { id, slug, ...req.body };

    cookies.push(newCookie);
    res.status(201).json(newCookie);
}

exports.cookieList = (req, res) => {
    res.status(200).json(cookies)
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