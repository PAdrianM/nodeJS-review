// .js -> por defecto utiliza CommonJS
// .mjs -> por defecto utiliza ES Modules
// cjs -> forzar CommonJS

import { suma, resta } from './operators.mjs';

console.log(suma(2, 3));
console.log(resta(5, 2));