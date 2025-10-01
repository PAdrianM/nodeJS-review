const fs = require("node:fs/promises");
const path = require("node:path");
const picocolor = require("picocolors");

// Necesito crear una nueva nota, Listar notas, Eliminar notas
// A demas debo guardar las notas en un array de objetos en JSON
// La nota solo tiene cuerpo y un ID
// node apps/notes-administrator.js add "Mi nota 1"
// node apps/notes-administrator.js list
// node apps/notes-administrator.js delete 2

const action = process.argv[2];
const param = process.argv.slice(3).join(" ");

const filePath = path.join(__dirname, "notes.json");

async function readNotes() {
  let data;
  try {
    data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      await writeNotes([]); // Crear el archivo si no existe
      return []; // Si el archivo no existe, retornar un array vacío
    }
    console.error(picocolor.red("Error reading notes:", err));
    process.exit(1);
  }
}

async function writeNotes(notes) {
  let data = JSON.stringify(notes, null, 2);
  try {
    await fs.writeFile(filePath, data, "utf-8");
  } catch (err) {
    console.error(picocolor.red("Error writing notes:", err));
    process.exit(1);
  }
}

async function addNote(body) {
  const notes = await readNotes();
  const newNote = {
    id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
    body: body,
  };
  try {
    notes.push(newNote);
    await writeNotes(notes);
    console.log("Note added:", newNote);
  } catch (err) {
    console.error("Error adding note:", err);
    process.exit(1);
  }
}

async function listNotes() {
  const notes = await readNotes();
  notes.forEach((element) => {
    console.log(picocolor.green(`${element.id} - ${element.body}`));
  });
}

async function deleteNote(id) {
  const notes = await readNotes();
  const index = notes.findIndex((note) => note.id === parseInt(id));
  if (index === -1) {
    console.error(picocolor.red("Note not found with id:", id));
    process.exit(1);
  }
  const deletedNote = notes.splice(index, 1); // Eliminar la nota del array
  try {
    await writeNotes(notes); // Guardar el array actualizado
    console.log(picocolor.green("Note deleted:", deletedNote[0]));
  } catch (err) {
    console.error(picocolor.red("Error deleting note:", err));
    process.exit(1);
  }
}

async function main() {
  switch (action) {
    case "add":
      if (!param) {
        console.error(picocolor.bgGreen("Please provide a note body to add."));
        process.exit(1);
      }
      await addNote(param);
      break;
    case "list":
      await listNotes();
      break;
    case "delete":
      if (!param) {
        console.error(picocolor.bgGreen("Please provide a note ID to delete."));
        process.exit(1);
      }
      await deleteNote(param);
      break;
    default:
      console.error(
        picocolor.bgGreen("Unknown action. Use 'add', 'list', or 'delete'.")
      );
      process.exit(1);
  }
}

main();
// Invocar la función principal
// para manejar las operaciones de notas
// y manejar errores de manera adecuada
