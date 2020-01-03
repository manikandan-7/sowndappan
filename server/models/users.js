module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    googleid: DataTypes.STRING,
    password: DataTypes.STRING
  });
  users.associate = function(models) {
    users.hasMany(models.users_info, {
      foreignKey: "users_id",
      as: "users_info"
    });
  };
  return users;
};
