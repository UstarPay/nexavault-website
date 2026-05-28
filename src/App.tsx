import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { LogoDefs } from './components/BrandLogo';
import SeoManager from './components/SeoManager';
import DocsPage from './pages/docs/DocsPage';
import HomePage from './pages/HomePage';

const App = () => (
  <>
    <LogoDefs />
    <SeoManager />
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </main>
    <Footer />
  </>
);

export default App;
