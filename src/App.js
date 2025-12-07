import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<LoginPage />} />
         <Route path="/users" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
