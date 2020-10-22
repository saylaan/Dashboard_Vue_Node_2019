const { Service } = require('../../models')
const _ = require('lodash')

module.exports = {
    async index(req, res) {
        try {
            let services = null
            const search = req.query.search
            if (search) {
                services = await Service.findAll({
                    where: {
                        name: search
                    }
                })
            } else {
                services = await Service.findAll({
                    limit: 100
                })
            }
            res.send(services)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to fetch all the service'
            })
        }
    },
    async getService(req, res) {
        try {
            const service = await Service.findByPk(req.params.serviceId)
            if (!service) {
                return res.status(403).send({
                    error: 'The service does not exist'
                })
            }
            res.send(service)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the service'
            })
        }
    }
}