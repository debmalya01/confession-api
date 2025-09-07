'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [3, 100],
          msg: "Username must be between 3 and 100 characters"
        },
        is: {
          args: /^[a-zA-Z0-9_]+$/, // only alphanumeric and underscores
          msg: "Username can only contain letters, numbers, and underscores"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        msg: "Must be a valid email address"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 20],
        msg: "Password must be between 6 and 20 characters"
      }
    },
    contact: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Contact cannot be empty"
        },
        is: {
          args: /^[0-9]+$/,   // only digits
          msg: "Contact must contain only numbers"
        },
        len: {
          args: [10, 15],     // min 10, max 15 digits
          msg: "Contact must be between 10 and 15 digits"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};