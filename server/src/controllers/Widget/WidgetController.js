const { Widget } = require('../../models')
const _ = require('lodash')

module.exports = {
    async index(req, res) {
        try {
            let widgets = null
            const search = req.query.search
            if (search) {
                widgets = await Widget.findAll({
                    where: {
                        name: search
                    }
                })
            } else {
                widgets = await Widget.findAll({
                    limit: 100
                })
            }
            res.send(widgets)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to fetch all the widget'
            })
        }
    },
    async getWidget(req, res) {
        try {
            const widget = await Widget.findByPk(req.params.widgetId)
            if (!widget) {
                return res.status(403).send({
                    error: 'The widget does not exist'
                })
            }
            res.send(widget)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the widget'
            })
        }
    }
}