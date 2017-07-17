import User from '../models/user';

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // See if a user with the given email exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email,
      password
    });

    user.save(err => {
      if (err) { return next(err); }

      // Respond to request indicating the user was created
      res.json({ success: true });
    });
  });
};