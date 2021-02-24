import Sequelize from "sequelize";

export default class Hashtag extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                title: {
                    type: Sequelize.STRING(15),
                    allowNull: false,
                    unique: true,
                },
            },
            {
                sequelize,
                underscored: false,
                modelName: "Hashtag",
                tableName: "Hashtags",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {}
}
