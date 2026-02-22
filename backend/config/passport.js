const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/user')

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, Profile, done) => {
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profileName.firstName,
            lastName: profileName.lastName,
            email: profile.emails?.[0].value || null,
            image: profile.photos[0].value || null
        }

        try {
            let user = await User.findOne({ googleId: profile.id })
        
            if (user) {
                done(null, user)
            } else {
                user = await User.create(newUser)
                done(null, user)
            }
        } catch (err) {
            console.error(err)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, function(err, user) {
            done(err, user);
        })
    })
};