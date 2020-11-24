module.exports = (sequelize, DataTypes) => sequelize.define('Message', {
  socketId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
},
{
  timestamps: false,
  // timestamps are automatically created
  // remove this option if you would like to have them
});
