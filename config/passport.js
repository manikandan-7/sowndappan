const mongoose = require("mongoose"),
  JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt,
  { findUser } = require("../model/user.model");
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
        let user = await findUser(payload.email);
        if (user) return next(null, user);
        return next(null, false);
      } catch (e) {
        console.log(e);
      }
    })
  );
};
