module.exports = (Sequelize, sequelize, DataTypes) => {
    return sequelize.define(
        "faq",
        {
            ...require("./cors")(Sequelize, DataTypes),
            question: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },
            answer: {
                type: DataTypes.TEXT,
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
            tableName: "faq",
        }
    );
};
