const _ = require('lodash')
const serviceabouts = require('../../object/serviceabouts.json')

module.exports = {
    async getAbout(req, res) {
        try {
            const about = {
                customer: {
                    host: req.connection.remoteAddress
                },
                server: {
                    current_time: Math.round(new Date().getTime() / 1000),
                    services: serviceabouts
                }
            }
            res.send(about)
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the channels users',
            })
        }
    }
}