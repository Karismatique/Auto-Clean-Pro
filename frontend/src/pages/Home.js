import { useTranslation } from 'react-i18next';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const { t } = useTranslation();
  const mapStyles = { height: '400px', width: '100%' };
  const center = { lat: 48.8566, lng: 2.3522 }; // Centre de la France
  const agencies = [
    { name: 'Rouen', lat: 49.4431, lng: 1.0993 },
    { name: 'Lyon', lat: 45.7640, lng: 4.8357 },
    // Ajoutez les autres agences
  ];

  return (
    <div className="container">
      <Helmet>
        <title>{t('home.title')}</title>
        <meta name="description" content={t('home.description')} />
      </Helmet>
      <section className="hero text-center my-5">
        <h1>{t('home.welcome')}</h1>
        <p>{t('home.subtitle')}</p>
        <a href="/booking" className="btn btn-primary">{t('home.bookNow')}</a>
      </section>
      <section className="services my-5">
        <h2>{t('home.services')}</h2>
        <div className="row">
          <div className="col-md-4">
            <h3>{t('home.interior')}</h3>
            <p>{t('home.interiorDesc')}</p>
          </div>
          <div className="col-md-4">
            <h3>{t('home.exterior')}</h3>
            <p>{t('home.exteriorDesc')}</p>
          </div>
          <div className="col-md-4">
            <h3>{t('home.complete')}</h3>
            <p>{t('home.completeDesc')}</p>
          </div>
        </div>
      </section>
      <section className="map my-5">
        <h2>{t('home.agencies')}</h2>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap mapContainerStyle={mapStyles} zoom={6} center={center}>
            {agencies.map((agency) => (
              <Marker key={agency.name} position={{ lat: agency.lat, lng: agency.lng }} />
            ))}
          </GoogleMap>
        </LoadScript>
      </section>
    </div>
  );
};

export default Home;