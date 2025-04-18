import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const IncidentChart = ({ title, data, options }) => {
  return (
    <div className="card shadow mb-4">
      {/* Card Header - Dropdown */}
      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 className="m-0 font-weight-bold text-primary">{title}</h6>
      </div>
      {/* Card Body */}
      <div className="card-body">
        <div className="chart-area" style={{ height: '300px' }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default IncidentChart;
