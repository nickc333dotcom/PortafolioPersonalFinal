import mongoose from 'mongoose';
import Project from './models/Project.js'; 
import dotenv from 'dotenv';

dotenv.config();

const projects = [
  {
    title: "Simulador de Cajero Automático",
    description: "Desarrollo de una interfaz lógica para operaciones bancarias (retiros, depósitos, consultas) aplicando principios de POO y validación de seguridad.",
    technologies: ["Python", "Tkinter", "Logística Bancaria"],
  },
  {
    title: "Plataforma de Voluntariado Estudiantil",
    description: "Sistema web institucional para la gestión de horas de servicio social, conectando estudiantes con organizaciones sin fines de lucro.",
    technologies: ["Django", "Python", "PostgreSQL", "Tailwind"],
  },
  {
    title: "Dev Challenge: Reciclaje de Construcción",
    description: "Plataforma de servicios para la gestión y reciclaje de materiales de construcción sobrantes, promoviendo la economía circular en el sector.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    title: "Social Gamer App",
    description: "Red social para gamers que permite crear perfiles, compartir logros y conectar con otros jugadores según sus intereses y juegos favoritos.",
    technologies: ["React", "Firebase", "Tailwind CSS", "API Integrations"],
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Conectado a MongoDB...");
    await Project.deleteMany({});
    await Project.insertMany(projects);
    console.log("¡Datos del CV cargados con éxito!");
    process.exit();
  })
  .catch(err => console.log(err));
