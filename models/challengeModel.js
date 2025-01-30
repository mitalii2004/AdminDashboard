module.exports = (Sequelize, sequelize, DataTypes) => {
    return sequelize.define(
        "challenges",
        {
            ...require("./cors")(Sequelize, DataTypes),
            title: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },
            description: {
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
            tableName: "challenges",
        }
    );
};
