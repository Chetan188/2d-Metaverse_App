import React from 'react';
import { Smile, Frown, Meh, Heart, Star, Zap } from 'lucide-react';

interface User {
  id: string;
  x: number;
  y: number;
  color: string;
  name: string;
  accessories: string[];
  facialFeature: string;
  emote: string;
}

interface AvatarProps {
  user: User;
  currentUser: User | null;
  isDarkMode: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ user, currentUser, isDarkMode }) => {
  const isCurrentUser = currentUser && user.id === currentUser.id;

  const renderFacialFeature = () => {
    switch (user.facialFeature) {
      case 'smile':
        return <Smile size={16} />;
      case 'frown':
        return <Frown size={16} />;
      case 'meh':
        return <Meh size={16} />;
      default:
        return null;
    }
  };

  const renderEmote = () => {
    switch (user.emote) {
      case 'heart':
        return <Heart size={24} className="text-red-500 absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce" />;
      case 'star':
        return <Star size={24} className="text-yellow-500 absolute -top-8 left-1/2 transform -translate-x-1/2 animate-spin" />;
      case 'zap':
        return <Zap size={24} className="text-blue-500 absolute -top-8 left-1/2 transform -translate-x-1/2 animate-pulse" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ${
        isCurrentUser ? 'border-2 border-white shadow-lg' : ''
      }`}
      style={{
        backgroundColor: user.color,
        left: `${user.x - 24}px`,
        top: `${user.y - 24}px`,
        transform: `scale(${isCurrentUser ? 1.2 : 1})`,
      }}
    >
      {renderEmote()}
      <div className="relative w-full h-full">
        {user.accessories.includes('hat') && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-red-500 rounded-t-full"></div>
        )}
        {user.accessories.includes('glasses') && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-2 border-2 border-black rounded-full"></div>
        )}
        <div className="absolute inset-2 flex items-center justify-center">
          {renderFacialFeature()}
        </div>
      </div>
      <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-800'} text-white text-xs py-1 px-2 rounded whitespace-nowrap`}>
        {user.name}
      </div>
    </div>
  );
};

export default Avatar;