// Ejemplo de lectura de archivos en paralelo con async/await y Promise.all
import { readFile } from 'node:fs/promises'; // async/await con import porque es un modulo ES mjs


Promise.all([
  readFile("./archivo.txt", "utf-8"),
  readFile("./archivo2.txt", "utf-8")
]).then(([firstText, secondText]) => {
  console.log("primer texto: ", firstText);
  console.log("segundo texto: ", secondText);
});
