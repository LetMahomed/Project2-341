const passport = require('passport');

passport.serializeUser((user, done) => {
  done(null, user.id); 
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Owner.findById(id); 
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
