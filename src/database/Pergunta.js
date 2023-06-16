import { connection } from "./database.js";
import Sequelize from "sequelize";

const Pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Caso já exista, não recria.
Pergunta.sync({force: false}).then(() => {console.log("Tabela criada.")});

export default Pergunta;