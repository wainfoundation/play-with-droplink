
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from "react-helmet-async";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://tzptajfvmjsiddjjoyqu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6cHRhamZ2bWpzaWRkampveXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NjEwNDcsImV4cCI6MjA2NDIzNzA0N30.nO2d3la6HsOHy71OQwoHLhuWCv6ffnZqQWv00GqpZSI');

const defaultStats = {
  hunger: 100,
  cleanliness: 100,
  happiness: 100,
  coins: 0,
  xp: 0,
  level: 1
};

const MyPetDroplet = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(defaultStats);
  const [lastCare, setLastCare] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [score, setScore] = useState(0);
  const gameAreaRef = useRef(null);

  useEffect(() => {
    authenticatePiUser();
  }, []);

  const authenticatePiUser = async () => {
    try {
      const user = await window.Pi.authenticate({
        onIncompletePaymentFound: (payment) => console.log('Pending payment:', payment)
      });
      setUser(user);
      const { data } = await supabase.from('users').select('*').eq('id', user.uid).single();
      if (!data) {
        await supabase.from('users').insert([{ id: user.uid, ...defaultStats }]);
        setStats(defaultStats);
      } else {
        decayStats(data);
      }
    } catch (error) {
      console.log('Pi authentication not available, using demo mode');
      setUser({ uid: 'demo-user' });
      setStats(defaultStats);
    }
    setLoading(false);
  };

  const decayStats = (data) => {
    const hours = (Date.now() - new Date(data.last_care)) / 3600000;
    const newStats = {
      hunger: Math.max(data.hunger - hours * 5, 0),
      cleanliness: Math.max(data.cleanliness - hours * 3, 0),
      happiness: Math.max(data.happiness - hours * 4, 0),
      coins: data.coins,
      xp: data.xp,
      level: data.level
    };
    setStats(newStats);
    setLastCare(Date.now());
    if (user?.uid !== 'demo-user') {
      supabase.from('users').update({ ...newStats, last_care: new Date().toISOString() }).eq('id', data.id);
    }
  };

  const careAction = (type) => {
    const change = 15;
    const newStats = { ...stats };
    if (type === 'feed') newStats.hunger = Math.min(100, newStats.hunger + change);
    if (type === 'clean') newStats.cleanliness = Math.min(100, newStats.cleanliness + change);
    if (type === 'play') newStats.happiness = Math.min(100, newStats.happiness + change);
    newStats.xp += 5;
    if (newStats.xp >= 100) {
      newStats.level += 1;
      newStats.xp = 0;
    }
    setStats(newStats);
    if (user?.uid !== 'demo-user') {
      supabase.from('users').update({ ...newStats, last_care: new Date().toISOString() }).eq('id', user.uid);
    }
  };

  const earnCoins = async () => {
    try {
      const rewarded = await window.Pi.showAd({ reward: 'coins' });
      if (rewarded) {
        const newStats = { ...stats, coins: stats.coins + 5 };
        setStats(newStats);
        if (user?.uid !== 'demo-user') {
          supabase.from('users').update({ coins: newStats.coins }).eq('id', user.uid);
        }
      }
    } catch (error) {
      console.log('Pi ads not available, giving demo coins');
      const newStats = { ...stats, coins: stats.coins + 5 };
      setStats(newStats);
    }
  };

  const shopPurchase = async (itemName, cost) => {
    if (stats.coins < cost) return alert('Not enough coins!');
    const newStats = { ...stats, coins: stats.coins - cost };
    setStats(newStats);
    if (user?.uid !== 'demo-user') {
      await supabase.from('inventory').insert([{ user_id: user.uid, item_name: itemName, quantity: 1 }]);
      await supabase.from('users').update({ coins: newStats.coins }).eq('id', user.uid);
    }
  };

  const startMiniGame = () => {
    setScore(0);
    setShowMiniGame(true);
    spawnDroplet();
  };

  const spawnDroplet = () => {
    const gameArea = gameAreaRef.current;
    if (!gameArea) return;
    const droplet = document.createElement('div');
    droplet.className = 'absolute w-6 h-6 bg-blue-400 rounded-full cursor-pointer';
    droplet.style.top = `${Math.random() * 90}%`;
    droplet.style.left = `${Math.random() * 90}%`;
    droplet.onclick = () => {
      setScore((prev) => prev + 1);
      droplet.remove();
    };
    gameArea.appendChild(droplet);
    setTimeout(() => droplet.remove(), 1500);
    if (showMiniGame) setTimeout(spawnDroplet, 800);
  };

  const endMiniGame = () => {
    setShowMiniGame(false);
    const earned = score;
    const newStats = { ...stats, coins: stats.coins + earned };
    setStats(newStats);
    if (user?.uid !== 'demo-user') {
      supabase.from('users').update({ coins: newStats.coins }).eq('id', user.uid);
    }
  };

  if (loading) return (
    <>
      <Helmet>
        <title>My Pet Droplet - Pi-Powered Virtual Pet Game</title>
        <meta name="description" content="Take care of your virtual pet droplet in this Pi Network powered game!" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pet...</p>
        </div>
      </div>
    </>
  );

  if (showMiniGame) return (
    <>
      <Helmet>
        <title>Catch the Droplet Mini Game - My Pet Droplet</title>
      </Helmet>
      <div ref={gameAreaRef} className="relative w-full h-screen bg-sky-200 overflow-hidden text-center">
        <h2 className="text-xl font-bold p-2">🎮 Catch the Droplet! Score: {score}</h2>
        <button 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-400 hover:bg-red-500 px-4 py-2 rounded transition-colors" 
          onClick={endMiniGame}
        >
          End Game
        </button>
      </div>
    </>
  );

  return (
    <>
      <Helmet>
        <title>My Pet Droplet - Pi-Powered Virtual Pet Game</title>
        <meta name="description" content="Take care of your virtual pet droplet in this Pi Network powered game!" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            🐣 My Pet Droplet
          </h1>
          
          <div className="bg-white p-6 rounded-xl mb-6 shadow-lg border">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl">❤️</p>
                <p className="text-sm text-gray-600">Hunger</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-400 h-2 rounded-full transition-all" 
                    style={{ width: `${stats.hunger}%` }}
                  ></div>
                </div>
                <p className="text-xs mt-1">{Math.round(stats.hunger)}/100</p>
              </div>
              
              <div className="text-center">
                <p className="text-2xl">🧼</p>
                <p className="text-sm text-gray-600">Cleanliness</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-400 h-2 rounded-full transition-all" 
                    style={{ width: `${stats.cleanliness}%` }}
                  ></div>
                </div>
                <p className="text-xs mt-1">{Math.round(stats.cleanliness)}/100</p>
              </div>
              
              <div className="text-center">
                <p className="text-2xl">😊</p>
                <p className="text-sm text-gray-600">Happiness</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all" 
                    style={{ width: `${stats.happiness}%` }}
                  ></div>
                </div>
                <p className="text-xs mt-1">{Math.round(stats.happiness)}/100</p>
              </div>
              
              <div className="text-center">
                <p className="text-2xl">⭐</p>
                <p className="text-sm text-gray-600">Level {stats.level}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-400 h-2 rounded-full transition-all" 
                    style={{ width: `${stats.xp}%` }}
                  ></div>
                </div>
                <p className="text-xs mt-1">{stats.xp}/100 XP</p>
              </div>
            </div>
            
            <div className="text-center py-2 bg-yellow-50 rounded">
              <p className="text-lg font-semibold">🪙 {stats.coins} Coins</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button 
              className="bg-green-400 hover:bg-green-500 text-white px-4 py-3 rounded-lg transition-colors shadow-md"
              onClick={() => careAction('feed')}
            >
              🍽 Feed
            </button>
            <button 
              className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-3 rounded-lg transition-colors shadow-md"
              onClick={() => careAction('clean')}
            >
              🛁 Clean
            </button>
            <button 
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-3 rounded-lg transition-colors shadow-md"
              onClick={() => careAction('play')}
            >
              🎾 Play
            </button>
            <button 
              className="bg-purple-400 hover:bg-purple-500 text-white px-4 py-3 rounded-lg transition-colors shadow-md"
              onClick={earnCoins}
            >
              🎥 Watch Ad
            </button>
          </div>

          <div className="space-y-3">
            <button 
              className="w-full bg-pink-400 hover:bg-pink-500 text-white px-4 py-3 rounded-lg transition-colors shadow-md"
              onClick={() => shopPurchase('Food Pack', 10)}
            >
              🛍 Buy Food Pack (10 coins)
            </button>
            <button 
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-3 rounded-lg transition-colors shadow-md"
              onClick={startMiniGame}
            >
              🎮 Play Mini Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPetDroplet;
