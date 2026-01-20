
import React from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShaftesburyEvent } from '../types';

interface EventCardProps {
  event: ShaftesburyEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Link to={`/events/${event.id}`} className="group block bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full flex flex-col">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={event.image_url} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-heritage-green text-white px-3 py-1 text-xs font-bold uppercase tracking-widest shadow-lg">
          {new Date(event.date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold text-heritage-green mb-3 group-hover:text-heritage-gold transition-colors leading-tight">
          {event.title}
        </h3>
        
        <div className="space-y-2 mb-4 flex-grow">
          <div className="flex items-center text-xs text-gray-500 uppercase tracking-wider font-semibold">
            <Calendar className="w-3.5 h-3.5 mr-2 text-heritage-gold" />
            {event.date}
          </div>
          <div className="flex items-center text-xs text-gray-500 uppercase tracking-wider font-semibold">
            <Clock className="w-3.5 h-3.5 mr-2 text-heritage-gold" />
            {event.time}
          </div>
          <div className="flex items-center text-xs text-gray-500 uppercase tracking-wider font-semibold">
            <MapPin className="w-3.5 h-3.5 mr-2 text-heritage-gold" />
            {event.location}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-3 mb-6 leading-relaxed">
          {event.description}
        </p>
        
        <div className="w-full border border-heritage-green/20 py-3 text-xs font-bold uppercase tracking-widest group-hover:bg-heritage-green group-hover:text-white transition-all duration-300 flex items-center justify-center">
          Find Out More <ArrowRight className="w-3.5 h-3.5 ml-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
