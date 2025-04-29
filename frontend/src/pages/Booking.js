import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';

const Booking = () => {
  const { t } = useTranslation();
  const [agencies, setAgencies] = useState([]);
  const [formData, setFormData] = useState({
    agencyId: '',
    cleaningType: 'interior',
    date: null,
    options: [],
    vehicle: { make: '', model: '', licensePlate: '', type: 'sedan' },
  });
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // Récupérer les agences
    axios.get(`${process.env.REACT_APP_API_URL}/agencies`)
      .then((response) => setAgencies(response.data.agencies))
      .catch((error) => console.error('Erreur API:', error));
  }, []);

  useEffect(() => {
    // Calculer le prix dynamiquement
    let basePrice = formData.cleaningType === 'interior' ? 50 : formData.cleaningType === 'exterior' ? 40 : 80;
    const optionsPrice = formData.options.reduce((total, opt) => total + (opt === 'wax' ? 20 : opt === 'engine' ? 30 : 15), 0);
    setPrice(basePrice + optionsPrice);
  }, [formData.cleaningType, formData.options]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (e) => {
    const option = e.target.value;
    setFormData({
      ...formData,
      options: e.target.checked
        ? [...formData.options, option]
        : formData.options.filter((opt) => opt !== option),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/bookings`, {
        ...formData,
        totalPrice: price,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert(t('booking.success'));
    } catch (error) {
      console.error('Erreur:', error);
      alert(t('booking.error'));
    }
  };

  return (
    <div className="container my-5">
      <Helmet>
        <title>{t('booking.title')}</title>
        <meta name="description" content={t('booking.description')} />
      </Helmet>
      <h1>{t('booking.title')}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>{t('booking.agency')}</label>
          <select name="agencyId" value={formData.agencyId} onChange={handleChange} className="form-select" required>
            <option value="">{t('booking.selectAgency')}</option>
            {agencies.map((agency) => (
              <option key={agency.id} value={agency.id}>{agency.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>{t('booking.cleaningType')}</label>
          <div>
            <input type="radio" name="cleaningType" value="interior" checked={formData.cleaningType === 'interior'} onChange={handleChange} />
            <label>{t('booking.interior')}</label>
            <input type="radio" name="cleaningType" value="exterior" checked={formData.cleaningType === 'exterior'} onChange={handleChange} />
            <label>{t('booking.exterior')}</label>
            <input type="radio" name="cleaningType" value="complete" checked={formData.cleaningType === 'complete'} onChange={handleChange} />
            <label>{t('booking.complete')}</label>
          </div>
        </div>
        <div className="mb-3">
          <label>{t('booking.date')}</label>
          <DatePicker
            selected={formData.date}
            onChange={(date) => setFormData({ ...formData, date })}
            showTimeSelect
            dateFormat="Pp"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>{t('booking.options')}</label>
          <div>
            <input type="checkbox" value="wax" onChange={handleOptionChange} /> {t('booking.wax')}
            <input type="checkbox" value="engine" onChange={handleOptionChange} /> {t('booking.engine')}
            <input type="checkbox" value="disinfection" onChange={handleOptionChange} /> {t('booking.disinfection')}
          </div>
        </div>
        <div className="mb-3">
          <label>{t('booking.vehicle')}</label>
          <input
            type="text"
            name="vehicle.make"
            value={formData.vehicle.make}
            onChange={(e) => setFormData({ ...formData, vehicle: { ...formData.vehicle, make: e.target.value } })}
            placeholder={t('booking.make')}
            className="form-control"
          />
          <input
            type="text"
            name="vehicle.model"
            value={formData.vehicle.model}
            onChange={(e) => setFormData({ ...formData, vehicle: { ...formData.vehicle, model: e.target.value } })}
            placeholder={t('booking.model')}
            className="form-control"
          />
          <input
            type="text"
            name="vehicle.licensePlate"
            value={formData.vehicle.licensePlate}
            onChange={(e) => setFormData({ ...formData, vehicle: { ...formData.vehicle, licensePlate: e.target.value } })}
            placeholder={t('booking.licensePlate')}
            className="form-control"
          />
          <select
            name="vehicle.type"
            value={formData.vehicle.type}
            onChange={(e) => setFormData({ ...formData, vehicle: { ...formData.vehicle, type: e.target.value } })}
            className="form-select"
          >
            <option value="sedan">{t('booking.sedan')}</option>
            <option value="suv">{t('booking.suv')}</option>
            <option value="4x4">{t('booking.4x4')}</option>
          </select>
        </div>
        <div className="mb-3">
          <h4>{t('booking.price')}: {price}€</h4>
        </div>
        <button type="submit" className="btn btn-primary">{t('booking.submit')}</button>
      </form>
    </div>
  );
};

export default Booking;