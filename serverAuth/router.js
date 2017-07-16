import Authentication from './controllers/authentication';

module.exports = app => {
  app.post('/signup', Authentication.signup);
};