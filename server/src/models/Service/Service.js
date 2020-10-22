module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', {
        name: DataTypes.STRING,
        token: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: false
    })
    return Service
}