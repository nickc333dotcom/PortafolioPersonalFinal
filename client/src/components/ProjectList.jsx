import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    

    axios.get(`${API_URL}/projects`)
      .then(res => setProjects(res.data))
      .catch(err => {
        console.error("Error al cargar proyectos:", err);

      });
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
      {projects.length === 0 ? (
        <div className="col-span-full text-center py-20 bg-slate-800/20 rounded-3xl border border-dashed border-slate-700">
          <p className="text-slate-400 animate-pulse font-mono tracking-widest">
            Sincronizando con base de datos MongoDB...
          </p>
        </div>
      ) : (
        projects.map((project, index) => (
          <motion.div 
            key={project._id} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative bg-[#0a192f] border border-blue-500/10 p-1 rounded-3xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
          >
            <div className="bg-[#112240] p-8 rounded-[1.4rem] h-full flex flex-col relative overflow-hidden">
              
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <div className="flex gap-4 text-slate-400">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors transform hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </a>
                  )}
                  <a href={project.liveUrl || "#"} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors transform hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors mb-4">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 text-md leading-relaxed flex-grow min-h-[80px]">
                  {project.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-8 relative z-10">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech} 
                    className="text-blue-300 font-mono text-xs tracking-wider bg-blue-500/5 px-2 py-1 rounded border border-blue-500/10 group-hover:border-blue-500/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default ProjectList;