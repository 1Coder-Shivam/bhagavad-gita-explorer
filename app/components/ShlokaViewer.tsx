'use client';

import React, { useState, useEffect } from 'react';

interface ShlokaViewerProps {
  chapterNumber: number;
  totalVerses: number;
  onBack: () => void;
  onNextChapter?: () => void;
}

interface Shloka {
  sanskrit: string;
  transliteration: string;
  meaning: string;
  explanation: string;
}

const ShlokaViewer: React.FC<ShlokaViewerProps> = ({ chapterNumber, totalVerses, onBack, onNextChapter }) => {
  const [currentVerse, setCurrentVerse] = useState(1);
  const [shloka, setShloka] = useState<Shloka | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadShloka();
  }, [chapterNumber, currentVerse]);

  const loadShloka = async () => {
    try {
      const response = await fetch(`/jsonData/Chapter${chapterNumber}.json`);
      const data = await response.json();
      const shlokaKey = `slok${currentVerse}`;
      setShloka(data[0][`chapter${chapterNumber}`][shlokaKey]);
      setLoading(false);
    } catch (error) {
      console.error('Error loading shloka:', error);
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentVerse > 1) {
      setCurrentVerse(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentVerse < totalVerses) {
      setCurrentVerse(prev => prev + 1);
    } else if (onNextChapter) {
      onNextChapter();
      setCurrentVerse(1);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="paper-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="5" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <filter id="burnt-edge">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="1" />
            <feColorMatrix type="matrix" values="
              1 0 0 0 0
              0 0.3 0 0 0
              0 0 0 0 0
              0 0 0 1 0" />
          </filter>
        </defs>
      </svg>
      <div className="shloka-viewer">
        <div className="burnt-edges"></div>
        <div className="paper-texture"></div>
        <div className="shloka-header">
        <button className="nav-button" onClick={onBack}>← Back to Chapters</button>
        <h2>Chapter {chapterNumber} - Verse {currentVerse}/{totalVerses}</h2>
        <div className="verse-navigation">
          <button 
            className="nav-button" 
            onClick={handlePrevious}
            disabled={currentVerse === 1}
          >
            Previous Verse
          </button>
          <button 
            className="nav-button" 
            onClick={handleNext}
          >
            {currentVerse === totalVerses ? 'Next Chapter' : 'Next Verse'}
          </button>
        </div>
      </div>

      {shloka && (
        <div className="shloka-content">
          <div className="sanskrit-text">{shloka.sanskrit}</div>
          <div className="transliteration">{shloka.transliteration}</div>
          <div className="meaning">
            <h3>Meaning:</h3>
            <p>{shloka.meaning}</p>
          </div>
          <div className="explanation">
            <h3>Explanation:</h3>
            <p>{shloka.explanation}</p>
          </div>
        </div>
      )}


    </div>
    </React.Fragment>
  );
}

export default ShlokaViewer;