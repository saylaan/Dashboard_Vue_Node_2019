const WidgetController = require('../../controllers/Widget/WidgetController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/widgets',
        isAuthenticated,
        WidgetController.index)
    app.get('/widgets/:widgetId',
        isAuthenticated,
        WidgetController.getWidget)
}