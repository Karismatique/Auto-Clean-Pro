import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">Auto Clean Pro</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">{t('nav.home')}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/booking">{t('nav.booking')}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">{t('nav.about')}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/reviews">{t('nav.reviews')}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/blog">{t('nav.blog')}</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="languageDropdown" data-bs-toggle="dropdown">
                {i18n.language === 'fr' ? 'Français' : 'English'}
              </a>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => changeLanguage('fr')}>Français</button></li>
                <li><button className="dropdown-item" onClick={() => changeLanguage('en')}>English</button></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;