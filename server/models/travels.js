module.exports = (sequelize, DataTypes) => {
  const travels = sequelize.define("travels", {
    travels_name: DataTypes.STRING,
    from_city: DataTypes.STRING,
    to_city: DataTypes.STRING,
    no_of_seats: DataTypes.INTEGER,
    time: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  });
  travels.associate = function(models) {
    travels.hasMany(models.dates, {
      foreignKey: "travels_id",
      as: "dates"
    });
  };
  return travels;
};
