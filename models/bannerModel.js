module.exports = (Sequelize, sequelize, DataTypes) => {
    return sequelize.define(
        "banner",
        {
            ...require("./cors")(Sequelize, DataTypes),
            bannerImage: {
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
            tableName: "banner",
        }
    );
};
