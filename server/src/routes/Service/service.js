const ServiceController = require('../../controllers/Service/ServiceController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/services',
        isAuthenticated,
        ServiceController.index)
    app.get(
        '/services/:serviceId',
        isAuthenticated,
        ServiceController.getService
    )
}