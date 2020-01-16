"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("travels", {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      travels_name: { type: Sequelize.STRING },
      from_city: { type: Sequelize.STRING },
      to_city: { type: Sequelize.STRING },
      no_of_seats: { type: Sequelize.INTEGER },
      time: { type: Sequelize.INTEGER },
      price: { type: Sequelize.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("travels");
  }
};
