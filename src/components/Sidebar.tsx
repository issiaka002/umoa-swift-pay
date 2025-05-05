
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { 
  BarChart3, 
  MessageSquare, 
  Users, 
  FileText, 
  Settings,
  LogOut
} from "lucide-react";
import { cn } from '@/lib/utils';
import UserAvatar from './UserAvatar';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-56 bg-sidebar min-h-screen flex flex-col">
      <div className="p-4 mb-4">
        <Logo />
      </div>
      
      <nav className="flex-1 space-y-1 px-2">
        <Link to="/" className={cn("sidebar-link", isActive("/") && "active")}>
          <BarChart3 size={20} />
          <span>Tableau de bord</span>
        </Link>
        
        <Link to="/transactions" className={cn("sidebar-link", isActive("/transactions") && "active")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-45">
            <path d="M7 22L17 12L7 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Transactions</span>
        </Link>
        
        <Link to="/messages" className={cn("sidebar-link", isActive("/messages") && "active")}>
          <MessageSquare size={20} />
          <span>Messages</span>
        </Link>
        
        <Link to="/participants" className={cn("sidebar-link", isActive("/participants") && "active")}>
          <Users size={20} />
          <span>Participants</span>
        </Link>
        
        <Link to="/rapports" className={cn("sidebar-link", isActive("/rapports") && "active")}>
          <FileText size={20} />
          <span>Rapports</span>
        </Link>
        
        <Link to="/configuration" className={cn("sidebar-link", isActive("/configuration") && "active")}>
          <Settings size={20} />
          <span>Configuration</span>
        </Link>
      </nav>
      
      <div className="p-4 mt-auto border-t border-white/10">
        <div className="flex items-center gap-3">
          <UserAvatar name="AD" />
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Amadou Diallo</p>
            <p className="text-xs text-white/70">Administrateur</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
