
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { 
  BarChart3, 
  MessageSquare, 
  Users, 
  FileText, 
  Settings,
  LogOut,
  Sliders
} from "lucide-react";
import { cn } from '@/lib/utils';
import UserAvatar from './UserAvatar';
import { toast } from '@/hooks/use-toast';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    // Ici vous pourriez ajouter une logique pour nettoyer les sessions, etc.
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    });
    navigate('/login');
  };

  return (
    <aside className="w-56 bg-sidebar dark:bg-gray-800 min-h-screen flex flex-col">
      <div className="p-4 mb-4">
        <Logo />
      </div>
      
      <nav className="flex-1 space-y-1 px-2">
        <Link to="/" className={cn("sidebar-link", isActive("/") && "active", "dark:text-white dark:hover:bg-gray-700")}>
          <BarChart3 size={20} />
          <span>Tableau de bord</span>
        </Link>
        
        <Link to="/transactions" className={cn("sidebar-link", isActive("/transactions") && "active", "dark:text-white dark:hover:bg-gray-700")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-45">
            <path d="M7 22L17 12L7 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Transactions</span>
        </Link>
        
        <Link to="/messages" className={cn("sidebar-link", isActive("/messages") && "active", "dark:text-white dark:hover:bg-gray-700")}>
          <MessageSquare size={20} />
          <span>Messages</span>
        </Link>
        
        <Link to="/participants" className={cn("sidebar-link", isActive("/participants") && "active", "dark:text-white dark:hover:bg-gray-700")}>
          <Users size={20} />
          <span>Participants</span>
        </Link>
        
        <Link to="/rapports" className={cn("sidebar-link", isActive("/rapports") && "active", "dark:text-white dark:hover:bg-gray-700")}>
          <FileText size={20} />
          <span>Rapports</span>
        </Link>
        
        <Link to="/settings" className={cn("sidebar-link", isActive("/settings") && "active", "dark:text-white dark:hover:bg-gray-700")}>
          <Sliders size={20} />
          <span>Paramètres</span>
        </Link>
        
        <Link to="/configuration" className={cn("sidebar-link", isActive("/configuration") && "active", "dark:text-white dark:hover:bg-gray-700")}>
          <Settings size={20} />
          <span>Configuration</span>
        </Link>
      </nav>
      
      <div className="p-4 mt-auto border-t border-white/10 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <UserAvatar name="AD" />
          <div className="flex-1">
            <p className="text-sm font-medium text-white dark:text-gray-200">Amadou Diallo</p>
            <p className="text-xs text-white/70 dark:text-gray-400">Administrateur</p>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="mt-4 w-full flex items-center gap-2 px-3 py-2 rounded-md text-white hover:bg-white/10 dark:hover:bg-gray-700 transition-colors"
        >
          <LogOut size={18} />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
