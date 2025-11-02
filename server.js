import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Base de datos temporal
let tasks = [
    { id: 1, name: "Aprender Vue", status: "todo" },
    { id: 2, name: "Conectar backend", status: "doing" }
];

// Ruta principal
app.get("/", (req, res) => {
    res.send(" API de Tareas corriendo en http://localhost:3000");
});

// Obtener todas las tareas
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// Agregar una nueva tarea
app.post("/tasks", (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "El nombre de la tarea es requerido" });

    const newTask = { id: Date.now(), name, status: "todo" };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Actualizar el estado de una tarea
app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const task = tasks.find(t => t.id == id);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada" });

    task.status = status || task.status;
    res.json(task);
});

// Manejo de rutas no definidas (404)
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada " });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(` Backend corriendo en http://localhost:${PORT}`);
});
