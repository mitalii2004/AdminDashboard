const Sequelize = require("sequelize")
const sequelize = require("../dbConnection").sequelize

module.exports = {
    userModel: require("./userModel")(Sequelize, sequelize, Sequelize.DataTypes),
    musicModel: require("./musicModel")(Sequelize, sequelize, Sequelize.DataTypes),

}