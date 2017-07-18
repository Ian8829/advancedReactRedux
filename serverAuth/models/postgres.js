const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');

const db = new Sequelize('usermodel', null, null, {
  host: 'localhost',
  dialect: 'postgres'
});

db
  .authenticate()
  .then(() => console.log('connect success'))
  .catch(err => console.error('connect failure', err));

// Create the model class
const userSchema = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    lowercase: true
  },
  password: {
    type: Sequelize.STRING
  },
}, {
  instanceMethods: {
    comparePassword: function (candidatePassword, callback) {
      return bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) { return callback(err); }

        callback(null, isMatch);
      })
    }
  }
});

// on Save Hook, encrypt password
// Before saving a model, run this function
userSchema.beforeSave('save', function(next) {
  // get access to the user model
  const user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next (err); }

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }

      // overwrite plain text password with encrypt password
      user.password = hash;
      next();
    })
  });
});


// Export the model

