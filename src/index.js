import express from "express";
import { connection } from "./database/database.js";
import Pergunta from "./database/Pergunta.js";

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
    Pergunta.findAll({ raw: true, order:[ ['id', 'DESC'] ] }).then(perguntas => {
        //ASC = Crescente || DESC = Decrescente
        //console.log(perguntas)
        response.render("index", { perguntas: perguntas});
    })
    
})

app.get("/perguntar", (request, response) => {
    response.render('perguntar')
})

app.post("/salvarpergunta", (request, response) => {
  let titulo = request.body.titulo;
  let descricao = request.body.descricao;
  // Pegando Model
  //INSERT...into...SQL
  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    response.redirect("/");
  })
})

app.get("/pergunta/:id", (request, response) => {
    let id = request.params.id;
    Pergunta.findOne({
      where: {id: id}
    }).then(pergunta => {
      if(pergunta != undefined){
        response.render("pergunta", {pergunta: pergunta});
      }else{
        response.redirect("/");
      }
    })
})

app.listen(port, () => {console.log(`Servidor iniciado na porta ${port}`)})