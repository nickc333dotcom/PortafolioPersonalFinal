import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet'; // Seguridad de cabeceras
import rateLimit from 'express-rate-limit'; // Protección contra spam

// 1. IMPORTAR EL MODELO
import Project from './models/Project.js';

dotenv.config();

const app = express();

// 2MIDDLEWARES DE SEGURIDAD
app.use(helmet()); 
app.use(cors()); // Permite peticiones externas (Frontend)
app.use(express.json({ limit: '10kb' })); 


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Demasiadas peticiones desde esta IP, intenta más tarde."
});
app.use('/api/', limiter);

//  CONEXIÓN A MONGOOSE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Base de datos protegida y conectada ✅'))
  .catch(err => console.error('Error al conectar a MongoDB ❌', err));

//  RUTAS 

// Obtener proyectos 
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Crear proyecto 
app.post('/api/projects', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: 'Datos de proyecto inválidos' });
  }
});

// Eliminar proyecto (Para el Panel Admin)
app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Proyecto eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el proyecto' });
  }
});

//  Actualizar proyecto (Para el Panel Admin)
app.put('/api/projects/:id', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el proyecto' });
  }
});

//  ARRANCAR SERVIDOR
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app corriendo en ${PORT}`);
});