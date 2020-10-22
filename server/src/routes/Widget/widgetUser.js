const WidgetUserController = require('../../controllers/Widget/WidgetUserController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/widgetuser',
        isAuthenticated,
        WidgetUserController.index)
    app.get(
        '/widgetuser/:widgetId',
        isAuthenticated,
        WidgetUserController.getWidgetUser
    )
    app.get(
        '/userwidget/:userId',
        isAuthenticated,
        WidgetUserController.getUserWidget
    )
    app.post('/widgetuser',
        isAuthenticated,
        WidgetUserController.post)
    app.delete(
        '/widgetuser/:widgetUserId',
        isAuthenticated,
        WidgetUserController.delete
    )
    app.put('/widgetuser/:widgetUserId',
        isAuthenticated,
        WidgetUserController.put)
}