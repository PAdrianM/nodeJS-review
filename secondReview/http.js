const htpp = require("node:http"); //protocolo http
const fs = require("node:fs"); //file system

const desiredPort = process.env.PORT ?? 1234;

const processRequest = (request, response) => {
  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  //ruta raiz
  if (request.url === "/") {
    response.statusCode = 200; //ok
    //finaliza la respuesta
    console.log("Penticion desde: " + request.url);
    response.end("Bienvenido a mi pagina de inicio");
  } else if (request.url === "/imagen.jpg") {
    response.setHeader("Content-Type", "image/jpg");
    fs.readFile("hf1_wallpaper.jpg", (error, data) => {
      if (error) {
        response.statusCode = 500; //internal server error
        console.log("Error 500 desde: " + request.url);
        response.end("Error interno del servidor");
      } else {
        response.statusCode = 200; //ok
        console.log("Penticion desde: " + request.url);
        response.end(data);
      }
    });
  } else if (request.url === "/about") {
    response.statusCode = 200; //ok
    console.log("Penticion desde: " + request.url);
    response.end("Acerca de mi");
  } else {
    response.statusCode = 404; //not found
    console.log("Error 404 desde: " + request.url);
    response.end("Pagina no encontrada");
  }
};

const server = htpp.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`server started on port http://localhost:${desiredPort}`);
});
