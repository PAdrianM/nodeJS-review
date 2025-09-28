//Asincrono secuencal con async/await
const { readFile } = require("node:fs/promises"); // promises permite usar async/await de forma nativa

// IIFE - Immediately Invoked Function Expression

(async () => {
  console.log("Leyendo archivo 1...");
  const firstText = await readFile("./archivo.txt", "utf-8");
  console.log("primer texto: ", firstText);

  console.log("------> Hacer cosas mientras lee el archivo...");

  console.log("Leyendo archivo 2...");
  const secondText = await readFile("./archivo2.txt", "utf-8");
  console.log("primer texto: ", secondText);
})();

//Entender que esto asyncrono no significa que se ejecute en paralelo
//si no que el codigo no se bloquea mientras se espera la respuesta
//pero si se espera la respuesta antes de continuar con la siguiente linea
//Lo que quiere decir que es asyncrono pero secuencial
