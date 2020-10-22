const ServiceWidgetController = require('../../controllers/Service/ServiceWidgetController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/servicewidget',
        isAuthenticated,
        ServiceWidgetController.index)
    app.get(
        '/servicewidget/:serviceId',
        isAuthenticated,
        ServiceWidgetController.getServiceWidget
    )
    app.get(
        '/widgetservice/:widgetId',
        isAuthenticated,
        ServiceWidgetController.getWidgetService
    )
}