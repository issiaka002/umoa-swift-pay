
import React from 'react';
import { Bell, BellDot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import Header from '@/components/Header';
import NotificationPanel from './NotificationPanel';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: string;
}

interface MessageHeaderProps {
  hasUnreadNotifications: boolean;
  notifications: Notification[];
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ hasUnreadNotifications, notifications }) => {
  return (
    <Header title="Gestion des Messages">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              {hasUnreadNotifications ? <BellDot className="h-[1.2rem] w-[1.2rem]" /> : <Bell className="h-[1.2rem] w-[1.2rem]" />}
              {hasUnreadNotifications && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              )}
            </Button>
          </SheetTrigger>
          <NotificationPanel notifications={notifications} />
        </Sheet>
      </div>
    </Header>
  );
};

export default MessageHeader;
