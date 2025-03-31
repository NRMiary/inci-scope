// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import KPIStatCard from './KPIStatCard';
import IncidentsTable from './IncidentsTable';
import IncidentChart from './IncidentChart';
import LineChartCard from './LineChartCard';

const Dashboard = () => {
  const [kpis, setKpis] = useState(null);
  const [incidents, setIncidents] = useState([]);

  // Fonction asynchrone pour récupérer les données
  const fetchData = async () => {
    try {
      const kpiResponse = await fetch('http://localhost:5000/api/kpis');
      const kpiData = await kpiResponse.json();
      setKpis(kpiData);
    } catch (error) {
      console.error('Error fetching KPI data:', error);
    }

    try {
      const incidentsResponse = await fetch('http://localhost:5000/api/incidents');
      const incidentsData = await incidentsResponse.json();
      setIncidents(incidentsData);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!kpis || incidents.length === 0) {
    return <div>Chargement des données...</div>;
  }

  // Filtrer pour ne garder que les incidents des 12 derniers mois (période glissante)
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1); // Début de la période des 12 derniers mois
  const filteredIncidents = incidents.filter(incident => {
    const incidentDate = new Date(incident.date_ouverture);
    return incidentDate >= startDate;
  });

  // Créer un objet contenant le nombre d'incidents par mois sous la forme "YYYY-M"
  const monthlyCountsObj = {};
  filteredIncidents.forEach(incident => {
    const date = new Date(incident.date_ouverture);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    monthlyCountsObj[key] = (monthlyCountsObj[key] || 0) + 1;
  });

  // Générer les labels et les données pour les 12 derniers mois
  const labels = [];
  const monthlyCounts = [];
  for (let i = 0; i < 12; i++) {
    const d = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
    // Formatage du label sous la forme "MM/YYYY"
    labels.push(`${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`);
    monthlyCounts.push(monthlyCountsObj[key] || 0);
  }

  // Données pour le chart de répartition par criticité (utilise kpis déjà fourni par l'API)
  const areaChartData = {
    labels: Object.keys(kpis.criticite_counts),
    datasets: [
      {
        label: 'Incidents par criticité',
        data: Object.values(kpis.criticite_counts),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  const areaChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // Données pour le graphique linéaire de tendance sur 12 mois
  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Nombre d\'incidents',
        data: monthlyCounts,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Suivi des incidents IT</h1>
        <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <i className="fas fa-download fa-sm text-white-50"></i>
          Generate Report
        </a>
      </div>
      <div className="row">
        <KPIStatCard
          title="Total incidents"
          value={kpis.total_incidents}
          iconClass="fa-bug"
          borderClass="primary"
          textClass="primary"
        />
        <KPIStatCard
          title="Incidents clôturés"
          value={kpis.closed_incidents}
          iconClass="fa-check-circle"
          borderClass="success"
          textClass="success"
        />
        <KPIStatCard
          title="Délai moyen de résolution (jours)"
          value={kpis.avg_resolution.toFixed(2)}
          iconClass="fa-clock"
          borderClass="info"
          textClass="info"
        />
        <KPIStatCard
          title="Incidents ouverts/en cours"
          value={kpis.open_incidents}
          iconClass="fa-hourglass-half"
          borderClass="warning"
          textClass="warning"
        />
      </div>

      <div className="row">
        <div className="col-xl-6 col-lg-7">
          <IncidentChart title="Répartition par Criticité" data={areaChartData} options={areaChartOptions} />
        </div>
        <div className="col-xl-6 col-lg-7">
          <LineChartCard title="Tendance des incidents sur 12 mois" data={lineChartData} options={lineChartOptions} />
        </div>
      </div>

      <IncidentsTable incidents={incidents} />
    </div>
  );
};

export default Dashboard;
