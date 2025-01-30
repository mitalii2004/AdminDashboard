module.exports = (Sequelize, sequelize, DataTypes) => {
    return sequelize.define(
        "contactUs",
        {
            ...require("./cors")(Sequelize, DataTypes),
            name: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },
            nickName: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },
            message: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },
            date: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },

            status: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },
            action: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultvalue: null,
            }
        },
        {
            tableName: "contactUs",
        }
    );
};
