import React from 'react';

export interface BentoItem {
  id: string;
  category: string;
  question: string;
  icon?: React.ReactNode;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}