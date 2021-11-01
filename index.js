const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

let message = "";

const dictionnaire = [{
    expression: "Top", 
    image: src='../img/top.png', 
    traduction: 'C´est super!'
  },
  {
    expression: "Fraga?", 
    image: src='../img/fraga.gif', 
    traduction: 'Tu vois?'
  }
];

  app.get("/", (req, res) => {
    setTimeout(() => {
      message = "";
    }, 1000);
    res.render("index", {dictionnaire});
  });


  app.get("/enregistrement", (req, res) => {
    res.render("enregistrement");
  });
  
  
  app.post("/nouveau", (req, res) => {
    const {expression, traduction, image} = req.body;
    const mot = {
        expression: expression,
        image: image,
        traduction: traduction
    }; 
    dictionnaire.push(mot);
    //mensagem = `Le mot ${expression} a été enregistré!`
    res.redirect("/");
  })
  
  app.get("/details/:id", (req, res) => {
    const id = req.params.id;
    const mot = dictionnaire[id];
    res.render("details", {
      mot,
    });
  });

// Adicionando a const port e uma arow function de callback para mostrar no console que o servidor está rodando.
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));