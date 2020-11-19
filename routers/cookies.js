const express = require('express');
const slugify = require('slugify')

let cookies = require('./cookies')
const router = express.Router();


router.post("/", (req, res) => {
    const id = cookies[cookies.length - 1].id + 1;
    const slug = slugify(req.body.name, {lower: true});
    const newCookie = { id, slug, ...req.body };

    cookies.push(newCookie);
    res.status(201).json(newCookie);
});

router.get("/", (req, res) => {
    res.status(200).json(cookies)
});

router.get("/:id", (req, res) => {
    const cookieID = req.params.id;
    const myCake = cookies.find(cake => cake.id === cookieID);
    res.status(200).json(cake);
});

router.put("/:id", (req, res) => {
    const cookieID = req.params.id;
    const foundCookie = cookies.find(cookie => cookie.id === +cookieID);
    
    if (foundCookie){
        console.log("hi");
        for (let key in req.body) foundCookie[key] = req.body[key];
        res.status(200).json(foundCookie);
    } else {
        res.status(404).json({msg: "Cookie not found"});   
    }
});

router.delete("/:id", (req, res) => {
    const cookieID = req.params.id;
    const foundCookie = cookies.find(cookie => cookie.id === +cookieID);
    if (foundCookie){
        cookies = cookies.filter(cookie => cookie.id !== +cookieID);
        res.status(204).end();
    } else {
        res.status(404).json({msg: 'Cookie not found'});
    }
});

module.exports = router;