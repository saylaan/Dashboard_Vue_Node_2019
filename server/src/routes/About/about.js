const AboutController = require('../../controllers/About/AboutController');

module.exports = (app) => {
    app.get('/about.json',
        AboutController.getAbout)
}