const express = require("express");
const app = express();
const charactersJSON = require("../simpsons/characters.json");

app.disable("x-powered-by"); //Deshabilitar la cabecera x-powered-by

const PORT = process.env.PORT ?? 1234;

//Esto que esta abajo se puede hacer de la siguiente manera
//app.use(express.json()); //Middleware que parsea el body de las request con content-type application/json

app.use((req, res, next) => {
  if (req.method !== "POST") return next();
  if (req.headers["content-type"] !== "application/json") return next();
  //Aqyui solo llegan request con metodo POST y content-type application/json

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const data = JSON.parse(body);
    data.timestamp = new Date();

    req.body = data; //Agregar la propiedad body al objeto req
    next(); //pasar al siguiente middleware
  });
  // tracker la request a la base de datos
  // validar si el usuario esta autenticado
});

app.get("/simpsons/characters", (req, res) => {
  //res.status(200).send("<h1>Mi pagina</h1>");
  //No es necesario setear el status code ni el content-type
  res.json(charactersJSON);
});

app.post("/simpsons", (req, res) => {
  //Guardar en la base de datos
  res.status(201).json(req.body);
});

//Poner al final una forma global de manejar rutas no definidas

app.use((req, res) => {
  res.status(404).send("<h1>404 Not Found - Express</h1>");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
