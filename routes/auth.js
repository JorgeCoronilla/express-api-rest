import { Router } from 'express';
import passport from 'passport';

const authRouter = Router();

authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  })
);

authRouter.get('/login/failed', (req, res) => {
  res.status(401).json({
    succes: false,
    message: 'login failed',
  });
});

authRouter.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('http://localhost:5173/');
  });
});

authRouter.get('/login/success', (req, res) => {
  res.status(200).json({
    succes: true,
    message: 'successful',
    user: req.user,
    //cookies: req.cookies,
    //jwt: ... });
  });
  console.log('login success - redirected');
});
authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/',
    failureRedirect: '/login/failed',
  })
);
export default authRouter;
