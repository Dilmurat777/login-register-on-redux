import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth/Auth';
import Home from './pages/Home/Home';
import './style.css';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="auth" element={<Auth />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
