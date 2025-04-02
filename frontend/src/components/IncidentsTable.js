import React, { useContext, useEffect } from 'react';
import { IncidentsContext } from '../context/IncidentsContext';

const IncidentsTable = ({ filter = 'all' } = {}) => {
  const { incidents } = useContext(IncidentsContext);

  // If the filter is set to "open", only incidents with a missing closing date are kept.
  const filteredIncidents =
    filter === 'open'
      ? incidents.filter(i => !i.date_cloture)
      : incidents;

  useEffect(() => {
    if (window.$ && window.$.fn.DataTable.isDataTable('#dataTable')) {
      window.$('#dataTable').DataTable().destroy();
    }
    if (window.$) {
      window.$('#dataTable').DataTable({
        pageLength: 10,
      });
    }
  }, [filteredIncidents]);

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">
          {filter === 'open' ? 'Incidents ouverts/en cours' : 'Liste des incidents'}
        </h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
            <thead>
              <tr>
                <th>Date d'ouverture</th>
                <th>Date de clôture</th>
                <th>Type</th>
                <th>Criticité</th>
                <th>Statut</th>
                <th>Équipe responsable</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.map(incident => (
                <tr key={incident.id}>
                  <td>{incident.date_ouverture}</td>
                  <td>{incident.date_cloture || 'N/A'}</td>
                  <td>{incident.type}</td>
                  <td>{incident.criticite}</td>
                  <td>{incident.statut}</td>
                  <td>{incident.equipe_responsable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IncidentsTable;
