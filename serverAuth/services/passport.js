import passport from 'passport';
import User from '../models/user';
import config from '../config';

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup options for JWT Startegy
const jwtOptions = {};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // payload: decoded jwt token(before encoded), done: callback fn
  // See if the user Id in the payload exists in our db
  // If it does, call 'done' with that other
  // otherwise, call done without a user object

  User.findById(payload.sub, (err, user) => {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy