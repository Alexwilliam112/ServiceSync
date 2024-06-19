'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Case extends Model {
    
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Case.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    autoreply: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Case',
  });
  return Case;
};