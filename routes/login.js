const passport = require("passport");
const passportFacebook = require("passport-facebook");
const router = require("express").Router();

passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK
    },
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({facebookId: profile.id}, function (err, user) {
            return cb(err, user);
        });
    }
));

router.get("/facebook", passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    function (req, res) {
        res.redirect('/');
    });