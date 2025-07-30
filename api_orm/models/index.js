// models/index.js
const Sequelize = require("sequelize");
const sequelize = require("../config/db"); // Importa a instância do Sequelize

const db = {};

// Importa os modelos
db.User = require("./userModel")(sequelize);
db.Room = require("./roomModel")(sequelize);
db.Schedule = require("./scheduleModel")(sequelize);
db.Reservation = require("./reservationModel")(sequelize);

// Define as associações
// Um Usuário tem muitas Reservas
db.User.hasMany(db.Reservation, { foreignKey: "usuario_id", as: "reservas" });
db.Reservation.belongsTo(db.User, { foreignKey: "usuario_id", as: "usuario" });

// Uma Sala tem muitos Horarios
db.Room.hasMany(db.Schedule, { foreignKey: "sala_id", as: "horarios" });
db.Schedule.belongsTo(db.Room, { foreignKey: "sala_id", as: "sala" });

// Uma Sala tem muitas Reservas
db.Room.hasMany(db.Reservation, { foreignKey: "sala_id", as: "reservas" });
db.Reservation.belongsTo(db.Room, { foreignKey: "sala_id", as: "sala" });

// Um Horario tem muitas Reservas
db.Schedule.hasMany(db.Reservation, {
  foreignKey: "horario_id",
  as: "reservas",
});
db.Reservation.belongsTo(db.Schedule, {
  foreignKey: "horario_id",
  as: "horario",
});

// Sincroniza os modelos com o banco de dados (cria tabelas se não existirem)
// Em produção, use migrations!
// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Banco de dados sincronizado!');
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
