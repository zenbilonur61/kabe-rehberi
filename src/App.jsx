import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Importing actual pages
import Home from './pages/Home';
import Mecca from './pages/Mecca';
import Medina from './pages/Medina';
import MapPage from './pages/MapPage';
import Qibla from './pages/Qibla';
import UmrahGuide from './pages/UmrahGuide';
import PracticalInfo from './pages/PracticalInfo';
import PreparationHub from './pages/PreparationHub';

// ScrollToTop Component to handle scrolling to top on route change
const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
};

const NotFound = () => <div className="container" style={{ paddingTop: '150px', minHeight: '80vh', textAlign: 'center' }}><h1>404 - Sayfa Bulunamadı</h1><p className="text-muted">Aradığınız kutsal mekan veya bilgi bulunamadı.</p></div>;

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1, paddingBottom: '2rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mekke" element={<Mecca />} />
            <Route path="/medine" element={<Medina />} />
            <Route path="/umre-rehberi" element={<UmrahGuide />} />
            <Route path="/pratik-bilgiler" element={<PracticalInfo />} />
            <Route path="/hazirlik-merkezi" element={<PreparationHub />} />
            <Route path="/harita" element={<MapPage />} />
            <Route path="/kible" element={<Qibla />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
