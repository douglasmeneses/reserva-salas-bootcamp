// models/reservationModel.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Reservation = sequelize.define(
    "Reserva",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      data: {
        type: DataTypes.DATEONLY, // Usar DATEONLY para mapear para DATE no PG
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
      tableName: "reservas",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["sala_id", "horario_id", "data"], // Garante a unicidade da reserva
        },
      ],
    }
  );

  return Reservation;
};
