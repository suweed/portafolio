import './App.css';
import './assets/fonts/Sketch.ttf';
import './assets/fonts/Girlfriend.ttf';
import './assets/fonts/Bernardo Moda contrast.ttf';
import './assets/fonts/Gogh-ExtraBold.otf';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import useLocalStorage from 'use-local-storage';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import About from './Components/About';
import Work from './Components/Work';
import Contact from './Components/Contact';

function App() {
  const location = useLocation();
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark] = useLocalStorage('isDark', preference);

  return (
    <div className='App' data-theme={isDark ? 'dark' : 'light'}>
      <NavBar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
