const passport = require('passport')
const AuthenticationController = require('../../controllers/Authen/AuthenticationController')
const AuthenticationControllerPolicy = require('../../policies/AuthenticationControllerPolicy')
const jwt = require('jsonwebtoken') // for token authen
const config = require('../../config/config')
const winston = require('winston')

const jwtSignUser = (user) => {
    const ONE_MONTHS = 60 * 60 * 24 * 31
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_MONTHS
    })
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'Api-Imgur/Google' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
})

module.exports = (app) => {
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)
    app.post('/signin',
        AuthenticationController.signin)
    app.get('/auth/imgur',
        passport.authenticate('imgur')
    )
    app.get('/auth/imgur/callback', passport.authenticate('imgur', {
        failureRedirect: '/settings'
    }), (req, res) => {
        logger.info('Trying to fetch token IMGUR.....')
        logger.info("SUCCESS, TOKEN SAVE TO THE DATABASE")
        return (res
            .status(200)
            .cookie('jwtImgur', jwtSignUser(req.user))
            .redirect('http://localhost:8081/settings')
        )
    })
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar']
        }))
    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), (req, res) => {
        logger.info('Trying to fetch token GOOGLE.....')
        logger.info("SUCCESS, TOKEN SAVE TO THE DATABASE")
        return (res
            .status(200)
            .cookie('google', jwtSignUser(req.user))
            .redirect('http://localhost:8081/dashboard')
        )
    })
}