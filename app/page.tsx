'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import ChapterCard from './components/ChapterCard';
import ShlokaViewer from './components/ShlokaViewer';
import './bhagwatgeetha.css';

interface Chapter {
  title: string;
  description: string;
  total_verses: number;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [chapters, setChapters] = useState<{ [key: string]: Chapter }[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      loadChapters();
    }
  }, [user]);

  const loadChapters = async () => {
    try {
      const chapterData = [];
      for (let i = 1; i <= 18; i++) {
        const response = await fetch(`/jsonData/Chapter${i}.json`);
        const data = await response.json();
        chapterData.push(data[0]);
      }
      setChapters(chapterData);
    } catch (error) {
      console.error('Error loading chapters:', error);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setSelectedChapter(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleChapterSelect = (chapterNumber: number) => {
    setSelectedChapter(chapterNumber);
  };

  const handleBackToChapters = () => {
    setSelectedChapter(null);
  };

  const handleNextChapter = () => {
    if (selectedChapter && selectedChapter < 18) {
      setSelectedChapter(selectedChapter + 1);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-geetha-gradient">
        <nav className="nav-container">
          <div className="nav-content">
            <div className="logo-container">
              <div className="logo">ॐ</div>
              <h1 className="site-title">Bhagwat Geetha</h1>
            </div>
          </div>
        </nav>

        <main className="main-container">
          <div className="content-wrapper">
            <div className="decorative-circle left"></div>
            <div className="decorative-circle right"></div>
            
            <div className="content-card auth-card">
              <div className="card-inner">
                <div className="lotus-mandala">
                  <div className="lotus-center">ॐ</div>
                  <div className="lotus-petals"></div>
                </div>
                
                <p className="welcome-text">
                  Embark on a spiritual journey through the timeless wisdom of the Bhagavad Gita
                </p>
                
                <p className="auth-text">
                  Sign in to access the sacred teachings
                </p>
                
                <button 
                  onClick={signInWithGoogle} 
                  className="auth-button"
                >
                  <Image src="/google.svg" alt="Google logo" width={24} height={24} />
                  Begin Your Journey
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <p>© 2023 Bhagwat Geetha. All rights reserved.</p>
            <p className="footer-quote">"The soul can never be cut to pieces by any weapon, nor burned by fire, nor moistened by water, nor withered by the wind."</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="bg-geetha-gradient">
      <nav className="nav-container">
        <div className="nav-content">
          <div className="logo-container" onClick={handleBackToChapters} style={{ cursor: 'pointer' }}>
            <div className="logo">ॐ</div>
            <h1 className="site-title">Bhagwat Geetha</h1>
          </div>
          
          <div className="auth-container">
            <div className="user-profile">
              {user.photoURL && (
                <Image 
                  src={user.photoURL} 
                  alt="User Profile Picture" 
                  width={40} 
                  height={40} 
                  className="user-photo"
                />
              )}
              <span className="user-name">{user.displayName || user.email}</span>
              <button onClick={signOutUser} className="auth-button">Sign Out</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="main-container">
        {selectedChapter ? (
          <ShlokaViewer
            chapterNumber={selectedChapter}
            totalVerses={chapters[selectedChapter - 1]?.[`chapter${selectedChapter}`]?.total_verses || 0}
            onBack={handleBackToChapters}
            onNextChapter={selectedChapter < 18 ? handleNextChapter : undefined}
          />
        ) : (
          <div>
            <div className="chapters-grid">
              {chapters.map((chapter, index) => {
                const chapterNumber = index + 1;
                const chapterData = chapter[`chapter${chapterNumber}`];
                return (
                  <ChapterCard
                    key={chapterNumber}
                    chapterNumber={chapterNumber}
                    title={chapterData.title}
                    description={chapterData.description}
                    totalVerses={chapterData.total_verses}
                    onCardClick={handleChapterSelect}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2023 Bhagwat Geetha. All rights reserved.</p>
          <p className="footer-quote">"The soul can never be cut to pieces by any weapon, nor burned by fire, nor moistened by water, nor withered by the wind."</p>
        </div>
      </footer>
    </div>
  );
}
