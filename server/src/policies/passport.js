const { User } = require('../models')

const ImgurStrategy = require('passport-imgur').Strategy
const GoogleStrategy = require('passport-google-oauth20')
const passport = require('passport')
const crypto = require('crypto')
const config = require('../config/config')
const jwt = require('jsonwebtoken') // for token authen
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser(async(user, done) => {
    await User.findOne({
        where: {
            username: user.user.username
        }
    }).then((user) => {
        done(null, user);
    })
});

const jwtSignUser = (user) => { // Override the function who sign a user obj using jwt library to get back a token
    const ONE_MONTHS = 60 * 60 * 24 * 31
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_MONTHS
    })
}

passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.authentication.jwtSecret
    }, async function(jwtPayload, done) {
        try {
            const user = await User.findOne({
                where: {
                    id: jwtPayload.id
                }
            })
            if (!user) {
                return done(new Error(), false)
            }
            return done(null, user)
        } catch (err) {
            return done(new Error(), false)
        }
    })
)

passport.use(
    new GoogleStrategy({
        clientID: config.authentication.googleClientId,
        clientSecret: config.authentication.googleSecret,
        callbackURL: config.url.callbackGoogle
    }, async(accessToken, refreshToken, profile, done) => {
        await User.findOne({
            where: {
                username: profile.displayName
            }
        }).then(async(user) => {
            if (user) {
                return done(null, {
                    user: user.toJSON(),
                    accessTokenGoogle: accessToken,
                    refreshTokenGoogle: refreshToken,
                    token: jwtSignUser(user.toJSON())
                })
            } else {
                const salt = crypto.randomBytes(16).toString(`hex`)
                const active_hash = crypto.pbkdf2Sync("ChangeMe123", salt,
                    1000, 64, `sha512`).toString(`hex`)
                const newUser = {
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    admin: false,
                    salt: salt,
                    active_hash: active_hash
                }
                const createUser = await User.create(newUser)
                return done(null, {
                    user: createUser.toJSON(),
                    accessTokenGoogle: accessToken,
                    refreshTokenGoogle: refreshToken,
                    token: jwtSignUser(createUser.toJSON())
                })
            }
        })
    })
)

passport.use(
    new ImgurStrategy({
        clientID: config.authentication.imgurClientId,
        clientSecret: config.authentication.imgurSecret,
        callbackURL: config.url.callbackImgur
    }, async(accessToken, refreshToken, profile, done) => {
        await User.findOne({
            where: {
                username: profile.url
            }
        }).then(async(user) => {
            if (user) {
                return done(null, {
                    user: user.toJSON(),
                    accessTokenImgur: accessToken,
                    refreshTokenImgur: refreshToken,
                    token: jwtSignUser(user.toJSON())
                })
            } else {
                const salt = crypto.randomBytes(16).toString(`hex`)
                const active_hash = crypto.pbkdf2Sync("ChangeMe123", salt,
                    1000, 64, `sha512`).toString(`hex`)
                const newUser = {
                    username: profile.url,
                    email: profile.email.value,
                    admin: false,
                    salt: salt,
                    active_hash: active_hash
                }
                const createUser = await User.create(newUser)
                return done(null, {
                    user: createUser.toJSON(),
                    accessTokenImgur: accessToken,
                    refreshTokenImgur: refreshToken,
                    token: jwtSignUser(createUser.toJSON())
                })
            }
        })
    })
)

module.exports = null