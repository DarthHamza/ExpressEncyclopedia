const bcrypt = require("bcrypt");
const { Router } = require("express");
const { User } = require("../db/models");
const jwt = require('jsonwebtoken');
const { 
    JWT_SECRET, 
    JWT_EXPIRATION_MS
} = require('../config/keys');


exports.signup = async (req, res, next) => {
    const { password } = req.body;
    // 10 is the recommended amount of salt rounds
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        req.body.password = hashedPassword;
        const newUser = await User.create(req.body);
        res.status(201).json({ message: "User created successfully"});
    } catch (error){
        next(error);
    }
};

exports.signin = async (req, res, next) => {
    const { user } = req;
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        expires: Date.now() + parseInt(JWT_EXPIRATION_MS),
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(200).json({token});
};
