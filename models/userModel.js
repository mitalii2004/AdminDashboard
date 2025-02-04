module.exports = (Sequelize, sequelize, DataTypes) => {
    return sequelize.define(
        "users",
        {
            ...require("./cors")(Sequelize, DataTypes),
            image: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },
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
            password: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },
            role:{
                type:DataTypes.INTEGER,
                defaultValue:1 // 1 for user and 0 for admin
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
            tableName: "users",
        }
    );
};
