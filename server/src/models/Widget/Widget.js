module.exports = (sequelize, DataTypes) => {
    const Widget = sequelize.define('Widget', {
        name: DataTypes.STRING,
        description: DataTypes.STRING
    }, {
        timestamps: false
    })
    return Widget
}