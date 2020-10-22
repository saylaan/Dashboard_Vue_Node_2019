const UsersController = require('../../controllers/User/UsersController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/users',
        isAuthenticated,
        UsersController.index)
    app.get('/users/:userId',
        isAuthenticated,
        UsersController.getUser)
    app.post('/users',
        isAuthenticated,
        UsersController.post)
    app.delete('/users/:userId',
        isAuthenticated,
        UsersController.delete)
    app.put('/users/:userId',
        isAuthenticated,
        UsersController.put)
}