const User = require("../models/User");
const config = require('./../config/Config');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports.controller = (app) => {
    // local strategy
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, (email, password, done) => {
        User.getUserByEmail(email, (err, user) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            User.comparePassword(password, user.password, (error, isMatch) => {
                if (isMatch) {
                    return done(null, user);
                }
                return done(null, false);
            });
            return true;
        });
    }));

    app.get('/users/all', (req, res) => {
        User.find({}, 'name email', (error, users) => {
            if (error) { console.log(error); }
            res.json({
                users
            });
        });
    });

    app.get('/users/deleteall', (req, res) => {
        User.deleteMany({}, (error,
        users) => {
            if (error) { console.log(error); }
            res.send({
                users,
            });
        });
    });

    // user login
    app.post('/users/login',
    passport.authenticate('local', { failureRedirect: '/users/login' }),
    (req, res) => {
        res.redirect('/');
    });
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    // register a user
    app.post('/users/register', (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const newUser = new User({
            name,
            email,
            password,
        });
        User.createUser(newUser, (error, user) => {
            if (error) {
                res.status(422).json({
                message: 'Something went wrong. Please try again after some time!',});
            }
            res.send({ user });
        });
    });
};
