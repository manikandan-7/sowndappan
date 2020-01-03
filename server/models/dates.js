module.exports = (sequelize, DataTypes) => {
  const dates = sequelize.define("dates", {
    date: DataTypes.STRING,
    seats: DataTypes.ARRAY(DataTypes.STRING)
  });
  dates.associate = function(models) {
    dates.belongsTo(models.travels, {
      foreignKey: "travels_id",
      onDelete: "CASCADE"
    });
  };
  return dates;
};
