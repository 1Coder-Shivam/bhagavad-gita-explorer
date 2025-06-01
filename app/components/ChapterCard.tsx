'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ChapterCardProps {
  chapterNumber: number;
  title: string;
  description: string;
  totalVerses: number;
  onCardClick: (chapterNumber: number) => void;
}

export default function ChapterCard({ chapterNumber, title, description, totalVerses, onCardClick }: ChapterCardProps) {
  const truncatedDescription = description.length > 200 ? `${description.substring(0, 200)}...` : description;

  return (
    <div 
      className="chapter-card" 
      onClick={() => onCardClick(chapterNumber)}
    >
      <div className="chapter-card-content">
        <div className="chapter-number">Chapter {chapterNumber}</div>
        <h3 className="chapter-title">{title}</h3>
        <p className="chapter-description">{truncatedDescription}</p>
        <div className="chapter-verses">Total Verses: {totalVerses}</div>
      </div>
      <div className="card-corner-flame">
        <div className="flame"></div>
      </div>
    </div>
  );
}