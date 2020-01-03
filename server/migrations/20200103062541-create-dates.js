module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("dates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      seats: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      travels_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "travels",
          key: "id",
          as: "travels_id"
        }
      }
    }),
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("dates");
  }
};
