const { ServiceUser, Service, User } = require('../../models')
const _ = require('lodash')

module.exports = {
    async index(req, res) {
        try {
            const serviceUsers = await ServiceUser.findAll({
                    include: [{
                            model: Service,
                        },
                        {
                            model: User,
                        },
                    ],
                })
                .map((serviceUser) => serviceUser.toJSON())
                .map((serviceUser) =>
                    _.extend({}, serviceUser.User, serviceUser)
                )
            res.send(serviceUsers)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the services users',
            })
        }
    },
    async getServiceUser(req, res) {
        try {
            const serviceUsers = await ServiceUser.findAll({
                    where: {
                        ServiceId: req.params.serviceId,
                    },
                    include: [{
                            model: Service,
                        },
                        {
                            model: User,
                        },
                    ],
                })
                .map((serviceUser) => serviceUser.toJSON())
                .map((serviceUser) =>
                    _.extend({}, serviceUser.User, serviceUser)
                )
            res.send(
                _.uniqBy(serviceUsers, (serviceUser) => serviceUser.ServiceId)
            )
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the service users',
            })
        }
    },
    async getUserService(req, res) {
        try {
            const userServices = await ServiceUser.findAll({
                    where: {
                        UserId: req.params.userId,
                    },
                    include: [{
                        model: User,
                    }, {
                        model: Service,
                    }],
                })
                .map((userService) => userService.toJSON())
                .map((userService) =>
                    _.extend({}, userService.User, userService)
                )
            res.send(userServices)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the user services',
            })
        }
    },
    async post(req, res) {
        try {
            const { ServiceId, UserId } = req.body
            const serviceUser = await ServiceUser.create({
                ServiceId: ServiceId,
                UserId: UserId,
            })
            res.send(serviceUser)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to create the service for the user',
            })
        }
    },
    async delete(req, res) {
        try {
            const { serviceUserId } = req.params

            const serviceUser = await ServiceUser.findOne({
                where: {
                    id: serviceUserId,
                },
            })
            if (!serviceUser) {
                return res.status(403).send({
                    error: 'you do not have access to this channel user',
                })
            }
            await serviceUser.destroy()
            res.send(serviceUser)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to delete the service user',
            })
        }
    },
    async put(req, res) {
        try {
            const serviceUser = await ServiceUser.update(req.body, {
                where: {
                    id: req.params.serviceUserId
                }
            })
            res.send(serviceUser)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to update the service user'
            })
        }
    }
}