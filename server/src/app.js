/* Import package */
const passport = require('passport')
const imports = require('./config/imports') // all import for the app
const { sequelize, Service } = require('./models') // models folder with index.js file who return a sequelize obj
const passportConf = require('./policies/passport')
const cookieSession = require('cookie-session');
const winston = require('winston')
const axios = require('axios');

console.log(`Server working... ${imports.config.portHttp}`)
    /* build an express app */
const app = imports.express() //link express to app
    /* enable packages */
app.use(imports.morgan('combined')) // morgan doc -> print out log;
app.use(imports.bodyParser.json()) // node middleware for handling encoded form data
app.use(imports.cors()) // server hosted on different depend --> CARE (need good security)
app.use(passport.initialize()) // init passport
app.use(passport.session())
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [imports.config.authentication.cookieKey]
}))
require('./routes')(app) // attach all the different endpoint to the apps

const delay = (time, callback) => {
    setInterval(callback, time * 1000)
}

const amadeus_client = "GSbRAP8gs52o0Z4fVY3G05m8A97e1Skf",
    amadeus_secret = "FHBeLbBayHN5TpLk";

const getTokenAmadeus = async() => { // 1800seconde : 1000 * 1800
    delay(3, async() => {
        await Service.findOne({
            where: {
                id: 4
            }
        }).then(async(data) => {
            let TOKEN_AMADEUS = "";
            logger.info('TRYING TO FETCH TOKEN AMADEUS.....')
            axios.post(
                'https://test.api.amadeus.com/v1/security/oauth2/token',
                "grant_type=client_credentials&client_id=GSbRAP8gs52o0Z4fVY3G05m8A97e1Skf&client_secret=FHBeLbBayHN5TpLk", { headers: { 'Content-Type': "application/x-www-form-urlencoded" } }
            ).then((response) => {
                TOKEN_AMADEUS = response.data.access_token;
                if (TOKEN_AMADEUS != "") {
                    logger.info("SUCCESS, TOKEN SAVE TO THE DATABASE ===> ")
                    logger.info(TOKEN_AMADEUS)
                    data.token = TOKEN_AMADEUS
                    data.save()
                }
            }).catch((error) => console.log(error))
        }).catch(error => console.log(error))
    })
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'Api-Amadeus' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
})

sequelize.sync() // sync sequelize with the server {force : true} = deleting all data
    .then(async() => getTokenAmadeus())
    .then(() => {
        app.listen(imports.config.portHttp)
        console.log('####################### END INIT DB #######################\n\n')
        console.log(`Server started on port ${imports.config.portHttp}... let's start working...`)
    })