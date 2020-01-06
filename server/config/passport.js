const mongoose = require("mongoose"),
  JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt,
  users = require("../models").users;
//model

//config
const { jwtVal } = require("./keys.config");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtVal.secretKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (payload, next) => {
      try {
        let dataValues = await users.findOne({ where: { email: payload.email } });
        if (dataValues) return next(null, dataValues);
        return next(null, false);
      } catch (e) {
        console.log(e);
        window.location.href = "/login";
      }
    })
  );
};
