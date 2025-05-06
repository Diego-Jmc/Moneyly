import express from 'express';
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
const Router = require('./routes/Router');

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || '8000');

app.use(session({
  secret: 'tu_secreto_seguro',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: any, done: Function) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done: Function) => {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: 'http://localhost:8080/auth/google/callback'
}, (accessToken: string, refreshToken: string, profile: any, done: Function) => {
  return done(null, profile);
}));

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('<a href="/auth/google">Iniciar sesión con Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req: express.Request, res: express.Response) => {
    res.send('Autenticado correctamente');
  }
);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
