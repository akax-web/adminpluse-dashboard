import { useNavigate } from 'react-router-dom';
import { ADMIN_DISPLAY_NAME } from '../constants/admin';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const navigate = useNavigate();
  const adminName = localStorage.getItem('adminName') || ADMIN_DISPLAY_NAME;

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminEmail');
    navigate('/login');
  };

  return (
    <header className="h-16 bg-dark-800 border-b border-dark-700 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-dark-700 transition-colors"
          aria-label="Open menu"
        >
          ☰
        </button>
        <p className="text-sm text-slate-400 hidden sm:block">
          Welcome back, <span className="text-white font-medium">{adminName}</span>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-dark-700 rounded-lg px-3 py-2">
          <span className="text-slate-500 text-sm">🔍</span>
          <input
            type="search"
            placeholder="Quick search..."
            className="bg-transparent text-sm outline-none w-40 text-slate-300 placeholder-slate-500"
          />
        </div>

        <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-sm font-semibold">
          {adminName.charAt(0).toUpperCase()}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="text-sm px-3 py-2 rounded-lg border border-dark-600 hover:border-red-500 hover:text-red-400 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
