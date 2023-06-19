import { connection } from "./database.js";
import Sequelize from "sequelize";

export const Pergunta = connection.define("perguntas", {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

export const Resposta = connection.define("respostas", {
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Pergunta.sync({ force: false }).then(() => {
  console.log("Carregado dados Pergunta");
});

Resposta.sync({ force: false }).then(() => {
  console.log("Carregado dados Resposta");
});