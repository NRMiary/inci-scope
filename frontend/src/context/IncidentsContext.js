import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const IncidentsContext = createContext();

export const IncidentsProvider = ({ children }) => {
  const [incidents, setIncidents] = useState([]);

  const fetchIncidents = async () => {
    try {
      const response = await axios.get('/api/incidents');
      setIncidents(response.data);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  return (
    <IncidentsContext.Provider value={{ incidents, fetchIncidents }}>
      {children}
    </IncidentsContext.Provider>
  );
};
