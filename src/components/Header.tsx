
import { Bell } from 'lucide-react';
import UserAvatar from './UserAvatar';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="bg-white py-4 px-6 border-b flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      
      <div className="flex items-center gap-5">
        <div className="relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">
            3
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="font-medium">Admin CBAO</div>
            <div className="text-xs text-gray-500">admin@cbao.sn</div>
          </div>
          <UserAvatar name="A" className="bg-primary" />
        </div>
      </div>
    </header>
  );
};

export default Header;
