//Task manager app
//Lllevar notas pero con estados, pendiente y completado.
// node task-manager.js add "Mi tarea" -> agrega una tarea pendiente
// node task-manager.js list -> lista todas las tareas con su estado
// node task-manager.js complete 1 -> marca la tarea 1 como completada
// node task-manager.js delete 1 -> elimina la tarea 1

const fs = require("node:fs/promises");
const path = require("node:path");
const process = require("node:process");

const filePath = path.join(__dirname, "tasks.json");
const action = process.argv[2];
const param = process.argv.slice(3).join(" ");

async function loadTasks() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      await saveTasks([]); // Crear el archivo si no existe
      return []; // Si el archivo no existe, retornar un array vacío
    }
    console.error("Error loading tasks:", err);
    process.exit(1);
  }
}

async function saveTasks(tasks) {
  try {
    fs.writeFile(filePath, JSON.stringify(tasks, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving tasks:", err);
    process.exit(1);
  }
}

async function addTask(body) {
  const tasks = await loadTasks();
  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    body: body,
    completed: false,
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log("Task added:", newTask);
}

async function listTasks() {
  const tasks = loadTasks();
  tasks.forEach((task) => {
    console.log(
      `${task.id} - ${task.body} [${task.completed ? "Completed" : "Pending"}]`
    );
  });
}

async function completeTask(id) {
  const tasks = await loadTasks();
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) {
    console.error("Task not found.");
    process.exit(1);
  } else {
    task.completed = true;
    await saveTasks(tasks);
    console.log("Task completed:", task);
  }
}

async function deleteTask(id) {
  const tasks = loadTasks();
  const index = tasks.findIndex((t) => t.id === parseInt(id));
  if (index === -1) {
    console.error("Task not found.");
    process.exit(1);
  } else {
    const deletedTask = tasks.splice(index, 1);
    await saveTasks(tasks);
    console.log("Task deleted:", deletedTask[0]);
  }
}

async function main() {
  switch (action) {
    case "add":
      if (!param) {
        console.error(picocolor.red("Please provide a note body."));
        process.exit(1);
      }
      await addTask(param);
      break;
    case "complete":
      if (!param) {
        console.error(picocolor.red("Please provide a note id to complete."));
        process.exit(1);
      }
      await completeTask(param);
      break;
    case "list":
      await listTasks();
      break;
    case "delete":
      if (!param) {
        console.error(picocolor.red("Please provide a note id to delete."));
        process.exit(1);
      }
      await deleteTask(param);
      break;
    default:
      console.error(picocolor.red("Unknown action:", action));
      process.exit(1);
  }
}

main();
