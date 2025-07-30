// models/scheduleModel.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Schedule = sequelize.define(
    "Horario",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      inicio: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      fim: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at",
      },
    },
    {
      tableName: "horarios",
      timestamps: true,
      underscored: true,
      validate: {
        startBeforeEnd() {
          if (this.inicio >= this.fim) {
            throw new Error(
              "O horário de início deve ser anterior ao horário de término."
            );
          }
        },
      },
    }
  );

  return Schedule;
};
