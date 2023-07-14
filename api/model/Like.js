const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db-connection");

class Like extends Model {}

Like.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "user",
        key: "id",
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "post",
        key: "user_id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "like",
  }
);

module.exports = Like;
