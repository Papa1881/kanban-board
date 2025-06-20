import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Board from './components/Board';
import TaskDetailPage from './pages/TaskDetailPage';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
        </Routes>
      </main>
  
    </Router>
  );
}

export default App;