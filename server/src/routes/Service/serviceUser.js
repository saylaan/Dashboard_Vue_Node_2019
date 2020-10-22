const ServiceUserController = require('../../controllers/Service/ServiceUserController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/serviceuser',
        isAuthenticated,
        ServiceUserController.index)
    app.get(
        '/serviceuser/:serviceId',
        isAuthenticated,
        ServiceUserController.getServiceUser
    )
    app.get(
        '/userservice/:userId',
        isAuthenticated,
        ServiceUserController.getUserService
    )
    app.post('/serviceuser',
        isAuthenticated,
        ServiceUserController.post)
    app.delete(
        '/serviceuser/:serviceUserId',
        isAuthenticated,
        ServiceUserController.delete
    )
    app.put('/serviceuser/:serviceUserId',
        isAuthenticated,
        ServiceUserController.put)
}