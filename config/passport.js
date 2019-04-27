const passport = require('passport');
const localStrategy = require('passport-local');

User = null;
passport.use(new localStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
  }, (email, password, done) => {
    Users.findOne({ email })
      .then((user) => {
        if(!user || !user.validatePassword(password)) {
          return done(null, false, { errors: { 'email or password': 'is invalid' } });
        }
        return done(null, user);
      }).catch(done);
}));

// TODO  make User module and user.validatePassword(password)