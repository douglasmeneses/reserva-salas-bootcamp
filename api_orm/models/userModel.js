// models/userModel.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "Usuario",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      senhaHash: {
        // Corresponde a 'senha_hash' no banco de dados devido a underscored: true
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at", // Mapeia para a coluna existente
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at", // Mapeia para a coluna existente
      },
    },
    {
      tableName: "usuarios", // Nome da tabela no banco de dados
      timestamps: true,
      underscored: true, // Usa snake_case para nomes de colunas (e.g., senhaHash -> senha_hash)
    }
  );

  return User;
};
