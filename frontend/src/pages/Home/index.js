import React, { useState, useEffect } from 'react';
import { FiEdit, FiX } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

export default function Home() {
  const [cepOrigin, setCepOrigin] = useState('');
  const [countryOrigin, setCountryOrigin] = useState('');
  const [stateOrigin, setStateOrigin] = useState('');
  const [cityOrigin, setCityOrigin] = useState('');

  const [cepDestination, setCepDestination] = useState('');
  const [countryDestination, setCountryDestination] = useState('');
  const [stateDestination, setStateDestination] = useState('');
  const [cityDestination, setCityDestination] = useState('');

  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');

  const [voos, setVoos] = useState([]);

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      "origin": {
        "CEP": cepOrigin,
        "country": countryOrigin,
        "state": stateOrigin,
        "city": cityOrigin,
      },
      "destination": {
        "CEP": cepDestination,
        "country": countryDestination,
        "state": stateDestination,
        "city": cityDestination,
      },
      "date": date,
      "hour": hour
    };

    try {
      const response = await api.post('voos', data);
  
      alert(`Voo Cadastrado ${response.data.id}`)

      api.get('voos').then(response => {
        setVoos(response.data)
      });
    } catch(err) {
      alert(`Erro no cadastro, Tente Novamente.`)
    }


  }

  function hide(e) {
    e.preventDefault();
    let modal = document.querySelector('.modal');
    modal.classList.remove('hide')
  }
  
  function show(e) {
    e.preventDefault();
    let modal = document.querySelector('.modal');
    modal.classList.add('hide')
  }

  useEffect(() => {
    api.get('voos').then(response => {
      setVoos(response.data)
    });
  }, []);

  return(
    <>
      <div className="container-header">
        <h1>Flight Management System</h1>
        <a href="# " className="add-flight" onClick={hide}>
          <span>+</span>
        </a>
      </div>
    
      <div className="container-home">
        <div className="cards">
          <ul>
            {voos.map(voo => (
              <li>
                <span className="status"></span>
                <button type="link" onClick={hide}>
                  <FiEdit size={22} color="#01c77e"/>
                </button>

                <div className="li-container">
                  <h3>{voo.id}</h3>

                  <div className="location">
                    <p>
                      <strong>Origem:</strong>
                      {voo.origin.CEP}, {voo.origin.state}, {voo.origin.country}, {voo.origin.city}
                    </p>

                    <p>
                      <strong>Destino:</strong>
                      {voo.destination.CEP}, {voo.destination.state}, {voo.destination.country}, {voo.destination.city}
                    </p>
                  </div>

                  <div className="date-hour">
                    <p className="data">
                      Data: {voo.date}
                    </p>

                    <p className="hour">
                      Hora: {voo.hour}
                    </p>
                  </div>
                </div>
              </li>
            ))}

          </ul>
        </div>
      </div>

      <div className="modal hide">
        <div className="content">
          <div className="header">
            <h1>Flight registration</h1>
            <button type="link" onClick={show}>
              <FiX size={22} color="#3a5afd"/>
            </button>
          </div>
          <form onSubmit={handleRegister}>
            <fieldset className="origin">

              <legend>
                <h2>Origin</h2>
              </legend>

              <div className="field-group">
                <div className="field">
                  <label htmlFor="cep-origin">
                    <strong>CEP:</strong>
                  </label>
                  <input 
                  type="text" 
                  name="cep-origin"
                  value={cepOrigin}
                  onChange={ e => { setCepOrigin(e.target.value) }}
                  />
                </div>
                <div className="field">
                  <label htmlFor="country-origin">
                    <strong>Country:</strong>
                  </label>
                  <input 
                  type="text" 
                  name="country-origin"
                  value={countryOrigin}
                  onChange={ e => { setCountryOrigin(e.target.value) }}
                  />
                </div>
              </div>

              <div className="field-group">
                <div className="field">
                  <label htmlFor="state-origin">
                    <strong>State:</strong>
                  </label>
                  <input 
                  type="text" 
                  name="state-origin"
                  value={stateOrigin}
                  onChange={ e => { setStateOrigin(e.target.value) }}
                  />
                </div>
                <div className="field">
                  <label htmlFor="city-origin">
                    <strong>City:</strong>
                  </label>
                  <input 
                  type="text" 
                  name="city-origin"
                  value={cityOrigin}
                  onChange={ e => { setCityOrigin(e.target.value) }}
                  />
                </div>
              </div>

            </fieldset>

            <fieldset className="field-group">
              <legend>
                <h2>Destination</h2>
              </legend>

              <div className="field-group">
                <div className="field">
                  <label htmlFor="cep-destination">
                    <strong>CEP:</strong>
                  </label>
                  <input 
                  type="text" 
                  name="cep-destination"
                  value={cepDestination}
                  onChange={ e => { setCepDestination(e.target.value) }}
                  />
                </div>
                <div className="field">
                  <label htmlFor="country-destination">
                    <strong>Country:</strong>
                  </label>
                  <input 
                  type="text" 
                  name="country-destination"
                  value={countryDestination}
                  onChange={ e => { setCountryDestination(e.target.value) }}
                  />
                </div>
              </div>

              <div className="field-group">
                <div className="field">
                  <label htmlFor="state-destination">
                    <strong>State:</strong>
                  </label>
                  <input 
                  type="text" 
                  name="state-destination"
                  value={stateDestination}
                  onChange={ e => { setStateDestination(e.target.value) }}
                  />
                </div>
                <div className="field">
                  <label htmlFor="city-destination">
                    <strong>City:</strong>
                  </label>
                  <input 
                  type="text" 
                  name="city-destination"
                  value={cityDestination}
                  onChange={ e => { setCityDestination(e.target.value) }}
                  />
                </div>
              </div>

            </fieldset>

            <fieldset>
              <div className="field-group">
                <div className="field">
                  <label htmlFor="date">
                    <strong>Date:</strong>
                  </label>
                  <input 
                  type="text" 
                  name="date"
                  value={date}
                  placeholder="16-07-2020"
                  onChange={ e => { setDate(e.target.value) }}
                  />
                </div>
                <div className="field">
                  <label htmlFor="hour">
                    <strong>Hour:</strong>
                  </label>
                  <input 
                  type="text" 
                  name="hour"
                  value={hour}
                  placeholder="23:30"
                  onChange={ e => { setHour(e.target.value) }}
                  />
                </div>
              </div>
            </fieldset>

            <div className="submit-and-error">
              <button className="btn-submit" type="submit">
                Register flight
              </button>

              <p className="error">
                
              </p>
            </div>
          </form>
        </div>
      </div>
      
    </>
  );
}