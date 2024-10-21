import React from 'react';

const OfficeEnvironment = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  isDarkMode: boolean
) => {
  const colors = isDarkMode
    ? {
        floor: '#2a2a2a',
        walls: '#1a1a1a',
        windows: '#1e3a5f',
        desks: '#3d2b1f',
        chairs: '#1f1f1f',
        plants: '#0d3311',
        meetingArea: '#2c2416',
      }
    : {
        floor: '#e0e0e0',
        walls: '#f5f5f5',
        windows: '#87CEEB',
        desks: '#8B4513',
        chairs: '#4A4A4A',
        plants: '#228B22',
        meetingArea: '#D2B48C',
      };

  // Floor
  ctx.fillStyle = colors.floor;
  ctx.fillRect(0, 0, width, height);

  // Walls
  ctx.fillStyle = colors.walls;
  ctx.fillRect(0, 0, width, 50);
  ctx.fillRect(0, 0, 50, height);
  ctx.fillRect(width - 50, 0, 50, height);
  ctx.fillRect(0, height - 50, width, 50);

  // Windows
  ctx.fillStyle = colors.windows;
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(100 + i * 250, 10, 100, 30);
  }

  // Desks
  ctx.fillStyle = colors.desks;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      ctx.fillRect(100 + i * 250, 100 + j * 250, 150, 80);
    }
  }

  // Chairs
  ctx.fillStyle = colors.chairs;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      ctx.beginPath();
      ctx.arc(175 + i * 250, 220 + j * 250, 20, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  // Plants
  ctx.fillStyle = colors.plants;
  ctx.beginPath();
  ctx.arc(50, 50, 30, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(width - 50, height - 50, 30, 0, 2 * Math.PI);
  ctx.fill();

  // Meeting area
  ctx.fillStyle = colors.meetingArea;
  ctx.fillRect(550, 400, 200, 150);
  
  // Meeting table
  ctx.fillStyle = colors.desks;
  ctx.fillRect(575, 425, 150, 100);

  // Meeting chairs
  ctx.fillStyle = colors.chairs;
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.beginPath();
      ctx.arc(600 + j * 50, 425 + i * 100, 15, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
};

export default OfficeEnvironment;