const bcrypt = require('bcrypt');
const { JWT_SECRET } = require('../config/keys');
const { User } = require('../db/models');
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const { fromAuthHeaderAsBearerToken } = require('passport-jwt').ExtractJwt;

exports.localStrategy = new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({
                where: { username },
            });

            const passwordsMatch = user ? await bcrypt.compare(password, user.password) : false;
            return passwordsMatch ? done(null, user) : done(null, false);
        } catch (error) {
            done(error);
        }
    }
)

exports.jwtStrategy = new JWTStrategy(
    {
        jwtFromRequest: fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET,
    },
    async (jwtPayload, done) => {
        if (Date.now() > jwtPayload.expires){
            return done(null, false);
        }
        try {
            const user = await User.findByPk(jwtPayload.id);
            done(null, user);
        } catch (error){
            done(error);
        }
    }
);