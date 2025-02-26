// client/src/components/AgencyList.tsx
import React, { useState, useEffect } from 'react';
import AgencyCard from './AgencyCard';
import './AgencyList.scss';

function AgencyList() {
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/agencies')
      .then(response => response.json())
      .then(data => setAgencies(data))
      .catch(error => console.error('Error al cargar agencias:', error));
  }, []);

  return (
    <div id="agenciesGrid">
      {agencies.map(agency => (
        <AgencyCard key={agency.id} agency={agency} />
      ))}
    </div>
  );
}

export default AgencyList;