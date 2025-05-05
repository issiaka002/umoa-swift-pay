
import React from 'react';
import StatusBadge from '@/components/StatusBadge';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

interface Message {
  id: string;
  direction: string;
  date: string;
  title: string;
  type: string;
  messageId: string;
  status: string;
  participant: string;
}

interface MessageCarouselProps {
  messages: Message[];
}

const MessageCarousel: React.FC<MessageCarouselProps> = ({ messages }) => {
  const getDirectionBadge = (direction: string) => {
    if (direction === 'Entrant') {
      return (
        <span className="bg-blue-100 text-blue-700 py-1 px-2 rounded text-xs font-medium dark:bg-blue-900 dark:text-blue-300">
          Entrant
        </span>
      );
    } else {
      return (
        <span className="bg-green-100 text-green-700 py-1 px-2 rounded text-xs font-medium dark:bg-green-900 dark:text-green-300">
          Sortant
        </span>
      );
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium text-gray-800 mb-4 dark:text-white">Messages Récents</h2>
      
      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {messages.map((message) => (
            <CarouselItem key={message.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    {getDirectionBadge(message.direction)}
                    <span className="text-sm text-gray-500 dark:text-gray-400">{message.date}</span>
                  </div>
                  
                  <h3 className="font-medium mb-2 dark:text-white">{message.title}</h3>
                  <div className="text-sm text-gray-600 space-y-1 dark:text-gray-300">
                    <p>Type: {message.type}</p>
                    <p>ID: {message.messageId}</p>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      {message.status === 'Traité' ? (
                        <StatusBadge status="success" text="Traité" />
                      ) : message.status === 'Envoyé' ? (
                        <StatusBadge status="success" text="Envoyé" />
                      ) : (
                        <StatusBadge status="pending" text={message.status} />
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="text-gray-600 hover:text-primary bg-gray-100 p-2 rounded dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                        Détails
                      </button>
                      <button className="text-gray-600 hover:text-primary bg-gray-100 p-2 rounded dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                        Historique
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-2 mt-4">
          <CarouselPrevious className="static translate-y-0 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600" />
          <CarouselNext className="static translate-y-0 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600" />
        </div>
      </Carousel>
    </div>
  );
};

export default MessageCarousel;
