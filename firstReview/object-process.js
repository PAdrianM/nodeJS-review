// Objeto global que proporciona información sobre el entorno de ejecución
// arguments, process, env, version, etc
//argumentos de entrada, salida y error estándar

console.log(process.argv); // Argumentos de línea de comandos

//podemos controlar eventos del proceso
process.on('exit', (code) => {
    //limpiar los recursos
});

// Metodos como current working directory
console.log(process.cwd()); // Directorio de trabajo actual

//plataforma
console.log(process.platform); // Plataforma del sistema operativo

//controlar el proceso y su salida
//process.exit(0); // Salir del proceso con código 0 (éxito)
//process.exit(1); // Salir del proceso con código 1 (error)

