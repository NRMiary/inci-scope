import React, { useEffect } from 'react';

const IncidentsTable = ({ incidents }) => {
  useEffect(() => {
    if (incidents.length > 0 && window.$) {
      // Check if DataTables is not already initialized
      if (!window.$.fn.DataTable.isDataTable('#dataTable')) {
        window.$('#dataTable').DataTable({
          pageLength: 10, // 10 rows per page
        });
      }
    }
  }, [incidents]);

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Incident List</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
            <thead>
              <tr>
                <th>Open Date</th>
                <th>Close Date</th>
                <th>Type</th>
                <th>Criticality</th>
                <th>Status</th>
                <th>Responsible Team</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((incident) => (
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
