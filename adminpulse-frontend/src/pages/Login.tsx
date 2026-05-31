import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/userApi';
import { ADMIN_DISPLAY_NAME, ADMIN_EMAIL } from '../constants/admin';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(email, password);
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminName', ADMIN_DISPLAY_NAME);
      localStorage.setItem('adminEmail', data.adminEmail);
      navigate('/');
    } catch {
      // Demo login when backend is offline
      if (email === ADMIN_EMAIL && password === 'admin123') {
        localStorage.setItem('adminToken', 'demo-token');
        localStorage.setItem('adminName', ADMIN_DISPLAY_NAME);
        localStorage.setItem('adminEmail', email);
        navigate('/');
      } else {
        setError('Invalid email or password. Try admin@adminpulse.com / admin123');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Admin<span className="text-accent">Pulse</span>
          </h1>
          <p className="text-slate-400 mt-2">Sign in to your admin dashboard</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-dark-800 border border-dark-700 rounded-2xl p-8 shadow-xl"
        >
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <label className="block mb-4">
            <span className="text-sm text-slate-400">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-3 rounded-lg bg-dark-700 border border-dark-600 text-white outline-none focus:border-accent transition-colors"
            />
          </label>

          <label className="block mb-6">
            <span className="text-sm text-slate-400">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-3 rounded-lg bg-dark-700 border border-dark-600 text-white outline-none focus:border-accent transition-colors"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-xs text-slate-500 text-center mt-4">
            Demo: admin@adminpulse.com / admin123
          </p>
        </form>
      </div>
    </div>
  );
}
