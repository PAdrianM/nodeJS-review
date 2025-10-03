//Asincrono con promesas
const { error } = require("node:console");
const fs = require("node:fs/promises"); // promises permite usar async/await de forma nativa

//Desde hace tiempo ya no es necesario hacer callbacks al usar el modulo de promises
//importante manejar los errores con try/catch o .catch en las promesas
//importante tambien manejar el encoding al leer archivos
const { text } = require("node:stream/consumers");

console.log("Leyendo archivo 1...");
fs.readFile("./archivo.txt", "utf-8").then((text) => {
  console.log("primer texto: ", text);
});

console.log("------> Hacer cosas mientras lee el archivo...");

console.log("Leyendo archivo 2...");
fs.readFile("./archivo2.txt", "utf-8").then((text) => {
  console.log("primer texto: ", text);
});

//Esto solo en los modulos nativos 
//que no tienen promesas nativas 
//const { promisify } = require('node:util');
//const readFilePromise = promisify(fs.readFile);
