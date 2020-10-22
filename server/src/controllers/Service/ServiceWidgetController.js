const { ServiceWidget, Service, Widget } = require('../../models')
const _ = require('lodash')

module.exports = {
    async index(req, res) {
        try {
            const serviceWidgets = await ServiceWidget.findAll({
                    include: [{
                            model: Service,
                        },
                        {
                            model: Widget,
                        },
                    ],
                })
                .map((serviceWidget) => serviceWidget.toJSON())
                .map((serviceWidget) =>
                    _.extend({}, serviceWidget.Widget, serviceWidget)
                )
            res.send(serviceWidgets)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the services widgets',
            })
        }
    },
    async getServiceWidget(req, res) {
        try {
            const serviceWidgets = await ServiceWidget.findAll({
                    where: {
                        ServiceId: req.params.serviceId,
                    },
                    include: [{
                            model: Service,
                        },
                        {
                            model: Widget,
                        },
                    ],
                })
                .map((serviceWidget) => serviceWidget.toJSON())
                .map((serviceWidget) =>
                    _.extend({}, serviceWidget.Widget, serviceWidget)
                )
            res.send(
                _.uniqBy(serviceWidgets, (serviceWidget) => serviceWidget.ServiceId)
            )
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the service widgets',
            })
        }
    },
    async getWidgetService(req, res) {
        try {
            const widgetServices = await ServiceWidget.findAll({
                    where: {
                        WidgetId: req.params.widgetId,
                    },
                    include: [{
                        model: Widget,
                    }, {
                        model: Service,
                    }],
                })
                .map((widgetService) => widgetService.toJSON())
                .map((widgetService) =>
                    _.extend({}, widgetService.Widget, widgetService)
                )
            res.send(widgetServices)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the widget services',
            })
        }
    }
}