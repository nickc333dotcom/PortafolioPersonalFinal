import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin123') { 
      localStorage.setItem('adminToken', 'true');
      navigate('/admin');
    } else {
      alert('Contraseña incorrecta');
    }
  };

  return (
    <div className="pt-40 flex justify-center items-center relative z-10 px-6">
      <form onSubmit={handleSubmit} className="bg-[#112240] p-10 rounded-[2rem] border border-blue-500/20 shadow-2xl max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-500/10 p-4 rounded-full mb-4">
            <Lock className="text-blue-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white font-mono">Acceso Admin</h2>
        </div>
        
        <input 
          type="password" 
          placeholder="Contraseña del sistema"
          className="w-full bg-[#020c1b] border border-blue-500/10 rounded-xl px-6 py-4 text-slate-300 focus:outline-none focus:border-blue-500/50 transition-all mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          INGRESAR
        </button>
      </form>
    </div>
  );
};

export default Login;