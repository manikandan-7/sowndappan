module.exports = (sequelize, DataTypes) => {
  const users_info = sequelize.define("users_info", {
    travels_name: DataTypes.STRING,
    date: DataTypes.STRING,
    from_city: DataTypes.STRING,
    to_city: DataTypes.STRING,
    travels_id: DataTypes.INTEGER,
    seats: DataTypes.ARRAY(DataTypes.INTEGER),
    passengers_info: DataTypes.ARRAY(DataTypes.JSON),
    price: DataTypes.INTEGER
  });
  users_info.associate = function(models) {
    users_info.belongsTo(models.users, {
      foreignKey: "users_id",
      onDelete: "CASCADE"
    });
  };
  return users_info;
};
