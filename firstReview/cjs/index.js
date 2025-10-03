
const sum = require("./sum");
//Comon JS module import
const { sum: sumNamed } = require("./sum");

console.log(sum(1, 2)); // 3

//Variable global con acceso desde cualquier parte

//Todo lo que se usa viene de la variable global globalThis
//En node es global
//En el navegador es window
//En web workers es self
console.log(globalThis);