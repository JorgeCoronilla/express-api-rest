import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
dotenv.config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    // function (accessToken, refreshToken, profile, cb) {
    //    DATABASE
    //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //     return cb(err, user);
    //   });
    // }
    function (accessToken, refreshToken, profile, done) {
      const user = {
        username: profile.displayName,
        avatar: profile.photos[0],
      };
      console.log('Authenticated user:', user); // Add logging here
      console.log(user, profile);
      console.log(accessToken, refreshToken);
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
