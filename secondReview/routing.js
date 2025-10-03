const http = require("node:http"); //protocolo http

const charactersJSON = require("./simpsons/characters.json");

const processRequest = (request, response) => {
  const { method, url } = request;

  switch (method) {
    case "GET":
      switch (url) {
        case "/simpsons/characters":
          response.setHeader("Content-Type", "aplication/json; charset=utf-8");
          return response.end(JSON.stringify(charactersJSON));
        default:
          response.statusCode = 404;
          response.setHeader("Content-Type", "text/html; charset=utf-8");
          return response.end("<h1>404 Not Found</h1>");
      }

    case "POST":
      switch (url) {
        case "/simpsons": {
          let body = "";
          request.on("data", (chunk) => {
            body += chunk.toString();
          });
          request.on("end", () => {
            const data = JSON.parse(body);
            // llamar a la base de datos para guardar data
            // respondemos al cliente
            response.writeHead(201, {
              "Content-Type": "application/json; charset=utf-8",
            });
            response.end(JSON.stringify({ message: "Data received", data }));
          });
          break;
        }
        default:
          response.statusCode = 404;
          response.setHeader("Content-Type", "text/html; charset=utf-8");
          return response.end("<h1>404 Not Found</h1>");
      }
  }
};

const server = http.createServer(processRequest);

server.listen(1234, () => {
  console.log("server started on port http://localhost:1234");
});
