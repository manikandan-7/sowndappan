"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users_infos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      travels_name: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      from_city: {
        type: Sequelize.STRING
      },
      to_city: {
        type: Sequelize.STRING
      },
      travels_id: {
        type: Sequelize.INTEGER
      },
      seats: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      passengers_info: {
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      users_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id",
          as: "users_id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users_infos");
  }
};
