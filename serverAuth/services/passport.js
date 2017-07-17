import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/user';
import config from '../config';

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Create local strategy
const localOptions = { usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this username and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ email }, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    // compare passwords - is `password` equal to user.password?
    user.comparePassword(password, function (err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});

// Setup options for JWT Startegy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // payload: decoded jwt token(before encoded), done: callback fn
  // See if the user Id in the payload exists in our db
  // If it does, call 'done' with that other
  // otherwise, call done without a user object

  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);