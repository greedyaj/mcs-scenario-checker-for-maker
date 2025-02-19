import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LeftNav from './components/LeftNav';
import AddTest from './pages/AddTest';
import ExecuteTests from './pages/ExecuteTests';
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
              <Route path="/add-test" element={<AddTest />} />
              <Route path="/execute-tests" element={<ExecuteTests />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;