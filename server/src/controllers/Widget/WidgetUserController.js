const { WidgetUser, Widget, User } = require('../../models')
const _ = require('lodash')

module.exports = {
    async index(req, res) {
        try {
            const widgetUsers = await WidgetUser.findAll({
                    include: [{
                            model: User,
                        },
                        {
                            model: Widget,
                        },
                    ],
                })
                .map((widgetUser) => widgetUser.toJSON())
                .map((widgetUser) =>
                    _.extend({}, widgetUser.Widget, widgetUser)
                )
            res.send(widgetUsers)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the widgets users',
            })
        }
    },
    async getWidgetUser(req, res) {
        try {
            const widgetUsers = await WidgetUser.findAll({
                    where: {
                        WidgetId: req.params.widgetId,
                    },
                    include: [{
                            model: User,
                        },
                        {
                            model: Widget,
                        },
                    ],
                })
                .map((widgetUser) => widgetUser.toJSON())
                .map((widgetUser) =>
                    _.extend({}, widgetUser.Widget, widgetUser)
                )
            res.send(
                _.uniqBy(widgetUsers, (widgetUser) => widgetUser.WidgetId)
            )
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the widget users',
            })
        }
    },
    async getUserWidget(req, res) {
        try {
            const userWidgets = await WidgetUser.findAll({
                    where: {
                        UserId: req.params.userId,
                    },
                    include: [{
                        model: User,
                    }, {
                        model: Widget,
                    }, ],
                })
                .map((widgetUser) => widgetUser.toJSON())
                .map((widgetUser) =>
                    _.extend({}, widgetUser.Widget, widgetUser)
                )
            res.send(userWidgets)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the user widgets',
            })
        }
    },
    async post(req, res) {
        try {
            const { WidgetId, UserId } = req.body
            const widgetUser = await WidgetUser.create({
                WidgetId: WidgetId,
                UserId: UserId,
            })
            res.send(widgetUser)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to create the channel for the widget user',
            })
        }
    },
    async delete(req, res) {
        try {
            const { widgetUserId } = req.params

            const widgetUser = await WidgetUser.findOne({
                where: {
                    id: widgetUserId,
                },
            })
            if (!widgetUser) {
                return res.status(403).send({
                    error: 'you do not have access to this widget user',
                })
            }
            await widgetUser.destroy()
            res.send(widgetUser)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to delete the widget user',
            })
        }
    },
    async put(req, res) {
        try {
            const widgetUser = await WidgetUser.update(req.body, {
                where: {
                    id: req.params.widgetUserId
                }
            })
            res.send(widgetUser)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to update the service user'
            })
        }
    }
}