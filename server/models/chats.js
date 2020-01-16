module.exports = (sequelize, DataTypes) => {
  const chats = sequelize.define("chats", {
    sender: DataTypes.STRING,
    reciever: DataTypes.STRING,
    time: DataTypes.STRING,
    message: DataTypes.STRING
  });
  chats.associate = function(models) {
    // associations can be defined here
  };
  return chats;
};
