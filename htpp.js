const htpp = require("node:http"); //protocolo http
const { findAvailablePort } = require("./apps/free-port");

const server = htpp.createServer((req, res) => {
  console.log("request received");
  res.end("Hello World");
});

findAvailablePort(3000).then((port) => {
  server.listen(port, () => {
    console.log(`server started on port htpp://localhost:${port}`);
  });
});

// server.listen(3000, () => {
//   console.log("server started on port 3000");
// });

//Se puede usar server "0" para que el sistema asigne un puerto disponible automáticamente
// server.listen(0, () => {
//   console.log(
//     `server listening on port htpp://localhost:${server.address().port}`
//   );
// });
