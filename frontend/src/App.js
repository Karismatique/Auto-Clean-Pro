import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Home from './pages/Home';
import Booking from './pages/Booking';
import About from './pages/About';
import Reviews from './pages/Reviews';
import Blog from './pages/Blog';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Helmet>
          <title>Auto Clean Pro</title>
          <meta name="description" content="Services de lavage auto en France" />
        </Helmet>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
        <Footer />
      </Router>
    </I18nextProvider>
  );
}

export default App;