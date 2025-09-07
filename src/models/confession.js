'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Confession extends Model {
    static associate(models) {
      // A confession belongs to a user
      Confession.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });

      // A confession can have many comments, likes, etc.
      // Confession.hasMany(models.Comment, { foreignKey: 'confessionId' });
      // Confession.hasMany(models.Like, { foreignKey: 'confessionId' });
    }
  }

  Confession.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "User ID is required"
        },
        isInt: {
          msg: "User ID must be an integer"
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Confession content cannot be empty"
        },
        len: {
          args: [10, 500], // reasonable limit
          msg: "Confession must be between 10 and 500 characters"
        }
      }
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: "Confession content cannot be empty"
        },
        len: {
          args: [0, 50],
          msg: "Topic cannot be longer than 50 characters"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Confession',
  });

  return Confession;
};
