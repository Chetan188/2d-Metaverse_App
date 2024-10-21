import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Users, MessageSquare, Volume2, VolumeX, Sun, Moon, RotateCcw } from 'lucide-react';
import Avatar from './components/Avatar';
import ChatBox from './components/ChatBox';
import OfficeEnvironment from './components/OfficeEnvironment';
import AvatarCustomizer from './components/AvatarCustomizer';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const MOVE_SPEED = 5;

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

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initializeUsers = useCallback(() => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      name: 'You',
      accessories: [],
      facialFeature: 'smile',
      emote: '',
    };

    const mockUsers = Array.from({ length: 5 }, (_, i) => ({
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * CANVAS_WIDTH,
      y: Math.random() * CANVAS_HEIGHT,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      name: `User ${i + 1}`,
      accessories: [],
      facialFeature: 'smile',
      emote: '',
    }));

    setCurrentUser(newUser);
    setUsers([newUser, ...mockUsers]);
  }, []);

  useEffect(() => {
    initializeUsers();
  }, [initializeUsers]);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw office environment
    OfficeEnvironment(ctx, CANVAS_WIDTH, CANVAS_HEIGHT, isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const moveUser = useCallback((dx: number, dy: number) => {
    if (!currentUser) return;

    const newX = Math.max(20, Math.min(CANVAS_WIDTH - 20, currentUser.x + dx));
    const newY = Math.max(20, Math.min(CANVAS_HEIGHT - 20, currentUser.y + dy));

    setCurrentUser(prevUser => ({ ...prevUser!, x: newX, y: newY }));
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === currentUser.id ? { ...user, x: newX, y: newY } : user
      )
    );
  }, [currentUser]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          moveUser(0, -MOVE_SPEED);
          break;
        case 'ArrowDown':
          moveUser(0, MOVE_SPEED);
          break;
        case 'ArrowLeft':
          moveUser(-MOVE_SPEED, 0);
          break;
        case 'ArrowRight':
          moveUser(MOVE_SPEED, 0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveUser]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const updateCurrentUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  const resetPositions = () => {
    const chairPositions = [
      { x: 175, y: 220 },
      { x: 425, y: 220 },
      { x: 675, y: 220 },
      { x: 175, y: 470 },
      { x: 425, y: 470 },
      { x: 675, y: 470 },
    ];

    setUsers(prevUsers =>
      prevUsers.map((user, index) => ({
        ...user,
        x: chairPositions[index % chairPositions.length].x,
        y: chairPositions[index % chairPositions.length].y,
      }))
    );

    if (currentUser) {
      setCurrentUser(prevUser => ({
        ...prevUser!,
        x: chairPositions[0].x,
        y: chairPositions[0].y,
      }));
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} flex flex-col items-center justify-center p-4 transition-colors duration-300`}>
      <h1 className="text-3xl font-bold mb-4">2D Metaverse-Lite</h1>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border border-gray-300 shadow-lg"
        />
        {users.map(user => (
          <Avatar key={user.id} user={user} currentUser={currentUser} isDarkMode={isDarkMode} />
        ))}
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          className={`${isDarkMode ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded flex items-center transition duration-300`}
          onClick={() => setShowChat(!showChat)}
        >
          <MessageSquare className="mr-2" />
          {showChat ? 'Hide Chat' : 'Show Chat'}
        </button>
        <button
          className={`${isDarkMode ? 'bg-purple-700 hover:bg-purple-800' : 'bg-purple-500 hover:bg-purple-700'} text-white font-bold py-2 px-4 rounded flex items-center transition duration-300`}
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="mr-2" /> : <Volume2 className="mr-2" />}
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
        <button className={`${isDarkMode ? 'bg-green-700 hover:bg-green-800' : 'bg-green-500 hover:bg-green-700'} text-white font-bold py-2 px-4 rounded flex items-center transition duration-300`}>
          <Users className="mr-2" />
          Users Online: {users.length}
        </button>
        <button
          className={`${isDarkMode ? 'bg-yellow-700 hover:bg-yellow-800' : 'bg-yellow-500 hover:bg-yellow-700'} text-white font-bold py-2 px-4 rounded flex items-center transition duration-300`}
          onClick={toggleTheme}
        >
          {isDarkMode ? <Sun className="mr-2" /> : <Moon className="mr-2" />}
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
          className={`${isDarkMode ? 'bg-pink-700 hover:bg-pink-800' : 'bg-pink-500 hover:bg-pink-700'} text-white font-bold py-2 px-4 rounded flex items-center transition duration-300`}
          onClick={() => setShowCustomizer(!showCustomizer)}
        >
          {showCustomizer ? 'Hide Customizer' : 'Customize Avatar'}
        </button>
        <button
          className={`${isDarkMode ? 'bg-indigo-700 hover:bg-indigo-800' : 'bg-indigo-500 hover:bg-indigo-700'} text-white font-bold py-2 px-4 rounded flex items-center transition duration-300`}
          onClick={resetPositions}
        >
          <RotateCcw className="mr-2" />
          Reset Positions
        </button>
      </div>
      {showChat && <ChatBox isDarkMode={isDarkMode} />}
      {showCustomizer && currentUser && (
        <AvatarCustomizer user={currentUser} onUpdateUser={updateCurrentUser} isDarkMode={isDarkMode} />
      )}
      <div className="mt-4 text-sm">
        Use arrow keys to move your avatar
      </div>
    </div>
  );
};

export default App;