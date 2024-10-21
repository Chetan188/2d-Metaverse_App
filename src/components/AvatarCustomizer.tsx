import React from 'react';
import { Smile, Frown, Meh, Heart, Star, Zap } from 'lucide-react';

interface AvatarCustomizerProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
  isDarkMode: boolean;
}

const AvatarCustomizer: React.FC<AvatarCustomizerProps> = ({ user, onUpdateUser, isDarkMode }) => {
  const toggleAccessory = (accessory: string) => {
    const updatedAccessories = user.accessories.includes(accessory)
      ? user.accessories.filter(a => a !== accessory)
      : [...user.accessories, accessory];
    onUpdateUser({ ...user, accessories: updatedAccessories });
  };

  const setFacialFeature = (feature: string) => {
    onUpdateUser({ ...user, facialFeature: feature });
  };

  const setEmote = (emote: string) => {
    onUpdateUser({ ...user, emote: emote });
  };

  return (
    <div className={`mt-4 p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
      <h3 className="text-lg font-bold mb-2">Customize Avatar</h3>
      <div className="space-y-2">
        <div>
          <h4 className="font-semibold">Accessories:</h4>
          <button
            className={`mr-2 p-1 rounded ${user.accessories.includes('hat') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => toggleAccessory('hat')}
          >
            Hat
          </button>
          <button
            className={`p-1 rounded ${user.accessories.includes('glasses') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => toggleAccessory('glasses')}
          >
            Glasses
          </button>
        </div>
        <div>
          <h4 className="font-semibold">Facial Feature:</h4>
          <button className="mr-2" onClick={() => setFacialFeature('smile')}><Smile /></button>
          <button className="mr-2" onClick={() => setFacialFeature('frown')}><Frown /></button>
          <button onClick={() => setFacialFeature('meh')}><Meh /></button>
        </div>
        <div>
          <h4 className="font-semibold">Emote:</h4>
          <button className="mr-2" onClick={() => setEmote('heart')}><Heart /></button>
          <button className="mr-2" onClick={() => setEmote('star')}><Star /></button>
          <button onClick={() => setEmote('zap')}><Zap /></button>
        </div>
      </div>
    </div>
  );
};

export default AvatarCustomizer;