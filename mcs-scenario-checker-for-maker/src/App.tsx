import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LeftNav from './components/LeftNav';
import ManageTriggerTests from './pages/ManageTriggerTests';
import ExecuteTriggerTests from './pages/ExecuteTriggerTests';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main">
          <LeftNav />
          <div className="content">
            <Routes>
              <Route path="/manage-trigger-tests" element={<ManageTriggerTests />} />
              <Route path="/execute-trigger-tests" element={<ExecuteTriggerTests />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;