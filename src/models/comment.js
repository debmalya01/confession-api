'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init({
    confessionId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Comment content cannot be empty"
        },
        len: {
          args: [10, 200], // reasonable limit
          msg: "Comment must be between 10 and 200 characters"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};