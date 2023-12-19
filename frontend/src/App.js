import React from 'react';
import Header from './Header';
import TinderCards from './TinderCards';
import SwipeButtons from './SwipeButtons';
import Chats from './Chats';
import ChatScreen from './ChatScreen';
import Profile from './Profile';
import Generator from './Generator';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route 
            path="/feed" 
            element={
              <>
                <Header/>
                <TinderCards/>
                <SwipeButtons/>
              </>
            }
          />
          <Route 
            path="/chat" 
            element={
              <>
                <Header backButton='/'/>
                <Chats/>
              </>
            }
          />
          <Route 
            path="/chat/:person" 
            element={
              <>
                <Header backButton='/chat'/>
                <ChatScreen />
              </>
            }
          />
          <Route 
            path="/" 
            element={
              <>
                <Profile />
              </>
            }
          />
          <Route
            path="/generate"
            element={
              <>
                <Header backButton='/'/>
                <Generator />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
