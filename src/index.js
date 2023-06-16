import express from "express";
import { connection } from "./database/database.js";
import perguntaModel from "./database/Pergunta.js";

const app = express();
const port = 8080;

// Database
connection
    .authenticate()
    .then(() => {console.log("Conexão feita com banco de dados")})
    .catch((erro) => {console.log(erro)})

// Express usar EJS (View Engine)
app.set('view engine', 'ejs');
// Carregando arquivos estaticos
app.use(express.static('public'))
// BodyExpress
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Rotas
app.get("/", (request, response) => {        
    response.render('index')
})

app.get("/perguntar", (request, response) => {
    response.render('perguntar')
})

app.post("/salvarpergunta", (request, response) => {
    let titulo = request.body.titulo;
    let descricao = request.body.descricao;

    response.send(`Pergunta enviada {Titulo:${titulo}, Descrição: ${descricao}}`);
})

app.listen(port, () => {console.log(`Servidor iniciado na porta ${port}`)})