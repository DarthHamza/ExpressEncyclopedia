const { User } = require("../db/models");

exports.signup = async (req, res, next) => {
    console.log(req.body);
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (error){
        next(error);
    }
};