import passport from 'passport';
import Authentication from './controllers/authentication';
import passportService from './services/passport';

const requireAuth = passport.authenticate('jwt', {session: false});

module.exports = app => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ hi: 'there' });
  });
  app.post('/signup', Authentication.signup);
};