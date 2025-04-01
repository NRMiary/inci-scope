import React, { useEffect, useState } from 'react';
import axios from 'axios';
import KPIStatCard from './KPIStatCard';
import IncidentsTable from './IncidentsTable';
import IncidentChart from './IncidentChart';
import LineChartCard from './LineChartCard';

const Dashboard = () => {
  const [kpis, setKpis] = useState(null);
  const [incidents, setIncidents] = useState([]);

  // Fetch KPIs and incidents using axios
  const fetchData = async () => {
    try {
      const kpiResponse = await axios.get('/api/kpis');
      setKpis(kpiResponse.data);
    } catch (error) {
      console.error('Error fetching KPI data:', error);
    }

    try {
      const incidentsResponse = await axios.get('/api/incidents');
      setIncidents(incidentsResponse.data);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!kpis || incidents.length === 0) {
    return <div>Loading data...</div>;
  }

  // Filter incidents from the last 12 months
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1);
  const filteredIncidents = incidents.filter(incident => {
    const incidentDate = new Date(incident.date_ouverture);
    return incidentDate >= startDate;
  });

  const monthlyCountsObj = {};
  filteredIncidents.forEach(incident => {
    const date = new Date(incident.date_ouverture);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    monthlyCountsObj[key] = (monthlyCountsObj[key] || 0) + 1;
  });

  const labels = [];
  const monthlyCounts = [];
  for (let i = 0; i < 12; i++) {
    const d = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
    labels.push(`${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`);
    monthlyCounts.push(monthlyCountsObj[key] || 0);
  }

  const areaChartData = {
    labels: Object.keys(kpis.criticite_counts),
    datasets: [
      {
        label: 'Incidents by Criticality',
        data: Object.values(kpis.criticite_counts),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  const areaChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: "Number of Incidents",
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
        <h1 className="h3 mb-0 text-gray-800">IT Incident Tracking</h1>
      </div>
      <div className="row">
        <KPIStatCard
          title="Total Incidents"
          value={kpis.total_incidents}
          iconClass="fa-bug"
          borderClass="primary"
          textClass="primary"
        />
        <KPIStatCard
          title="Closed Incidents"
          value={kpis.closed_incidents}
          iconClass="fa-check-circle"
          borderClass="success"
          textClass="success"
        />
        <KPIStatCard
          title="Average Resolution Time (days)"
          value={kpis.avg_resolution.toFixed(2)}
          iconClass="fa-clock"
          borderClass="info"
          textClass="info"
        />
        <KPIStatCard
          title="Open/In Progress Incidents"
          value={kpis.open_incidents}
          iconClass="fa-hourglass-half"
          borderClass="warning"
          textClass="warning"
        />
      </div>
      <div className="row">
        <div className="col-xl-6 col-lg-7">
          <IncidentChart title="Distribution by Criticality" data={areaChartData} options={areaChartOptions} />
        </div>
        <div className="col-xl-6 col-lg-7">
          <LineChartCard title="Incident Trend Over 12 Months" data={lineChartData} options={lineChartOptions} />
        </div>
      </div>
      <IncidentsTable incidents={incidents} />
    </div>
  );
};

export default Dashboard;
