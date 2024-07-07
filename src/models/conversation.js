const { DataTypes } = require('sequelize');
const { sequelize } = require('../../utils/database');

const Conversation = sequelize.define('Conversation', {
  history: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '[]'
  }
});

module.exports = Conversation;