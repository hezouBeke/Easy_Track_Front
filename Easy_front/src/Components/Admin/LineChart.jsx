import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: ['07/12/2021', '07/12/2021', '07/12/2021', '07/12/2021', '07/12/2021', '07/12/2021', '07/12/2021'],
    datasets: [
      {
        label: 'Est. Revenue ($)',
        data: [10000, 15000, 20188, 25000, 30000, 35000, 40000],
        borderColor: 'white)',
        backgroundColor: 'Blue',
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'black', // Bleu (text-blue-500 en Tailwind)
          font: {
            weight: 'thin',  // Font-thin
            size: 19,  // Taille de police ajustée
          }
        }
      },
      title: {
        display: true,
        text: 'Revenu Estimé ($)',
        color: 'black',  // Bleu (text-blue-500 en Tailwind)
        font: {
          weight: 'thin',  // Font-thin
          size: 19,  // Taille de police ajustée
        }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          color: '#black',  // Bleu (text-blue-500 en Tailwind)
          font: {
            weight: 'thin',  // Font-thin
            size: 19,  // Taille de police ajustée
          }
        },
        ticks: {
          color: 'black',  // Bleu
          font: {
            weight: 'thin',
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Revenu ($)',
          color: 'black',  // Bleu (text-blue-500 en Tailwind)
          font: {
            weight: 'thin',  // Font-thin
            size: 19,  // Taille de police ajustée
          }
        },
        ticks: {
          color: 'black',  // Bleu
          font: {
            weight: 'thin',
          }
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '1398px', height: '400px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
