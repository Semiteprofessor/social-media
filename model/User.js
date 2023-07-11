const { Model, DataTypes } = require("sequelize");

const bcrypt = require("bcrypt");
const sequelize = require("../config/db-connection");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        maxLength: [18],
      },
    },
    image: {
      type: DataTypes.STRING,
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    about_me: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updateUserData) => {
        if (updateUserData.password) {
          updateUserData.password = await bcrypt.hash(
            updateUserData.password,
            10
          );
        }
        return updateUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
