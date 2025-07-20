import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Readme from './pages/Readme';
import './App.css'

function App() {
  return (
    <BrowserRouter basename="/WebNuggets">
      <Routes>
        <Route path="/" element={<Readme />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
