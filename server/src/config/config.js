const path = require('path') // import function of path (__dirname)

module.exports = { // basic config for the server
    portHttp: 8080,
    db: { // maybe i should use mysql instead
        database: process.env.DB_NAME || 'tabtracker', // name of DB
        user: process.env.DB_USER || 'tabtracker',
        password: process.env.DB_PASS || 'tabtracker',
        options: {
            dialect: process.env.DIALECT || 'sqlite', // tell what kind of db we are going to be connect to
            host: process.env.HOST || 'localhost',
            storage: path.resolve(__dirname, '../../tabtracker.sqlite') // give the path to find the .sqlite
        }
    },
    url: {
        callbackGoogle: process.env.CALLBACK_GOOGLE || '/auth/google/callback',
        callbackImgur: process.env.CALLBACK_IMGUR || '/auth/imgur/callback'
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret',
        googleClientId: process.env.GOOGLE_CLIENT_ID || '196579897709-rp0b1meejl9ostod8k3gdr8arb6hj8vv.apps.googleusercontent.com',
        googleSecret: process.env.GOOGLE_SECRET || 'yEM9BuqtS3HOS5D1sGfWob9W',
        imgurClientId: process.env.IMGUR_CLIENT_ID || '38968287e70de92',
        imgurSecret: process.env.IMGUR_SECRET || '38f6d591b43013727f10e399588afef6b3e2f097',
        cookieKey: process.env.COOKIE_KEY || 'secret'
    }
}