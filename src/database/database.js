import Sequelize from "sequelize";

export const connection = new Sequelize('guiaperguntas', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
