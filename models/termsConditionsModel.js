module.exports = (Sequelize, sequelize, DataTypes) => {
    return sequelize.define(
        "termsConditions",
        {
            ...require("./cors")(Sequelize, DataTypes),
            title: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
                defaultValue: null,
            },
            type: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: null,
            },
        },
        {
            tableName: "termsConditions",
        }
    );
};
