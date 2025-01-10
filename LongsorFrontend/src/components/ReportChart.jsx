import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

// Registering required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,   // Register PointElement for Line Chart
  LineElement     // Register LineElement for Line Chart
);

const ReportChart = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch reports data from API
    axios.get(import.meta.env.VITE_API_URL + '/report')
      .then((res) => {
        setReports(res.data);  // Set reports data in state
      })
      .catch((err) => {
        console.error(err);  // Handle error if API fails
      });
  }, []);

  // Calculate report count per province
  const provinceCount = reports.reduce((acc, report) => {
    acc[report.province] = (acc[report.province] || 0) + 1;
    return acc;
  }, {});

  // Calculate report count per city
  const cityCount = reports.reduce((acc, report) => {
    acc[report.city] = (acc[report.city] || 0) + 1;
    return acc;
  }, {});

  // Calculate report count per month (grouped by year-month)
  const monthCount = reports.reduce((acc, report) => {
    const month = new Date(report.date);
    const monthYear = `${month.getMonth() + 1}-${month.getFullYear()}`; // Format as MM-YYYY for sorting
    acc[monthYear] = (acc[monthYear] || 0) + 1;
    return acc;
  }, {});

  // Sorting months in chronological order
  const sortedMonths = Object.keys(monthCount).sort((a, b) => {
    const [monthA, yearA] = a.split('-').map(Number);
    const [monthB, yearB] = b.split('-').map(Number);
    return yearA !== yearB ? yearA - yearB : monthA - monthB;
  });

  // Data for Bar Chart per Province
  const barDataProvince = {
    labels: Object.keys(provinceCount),
    datasets: [{
      label: 'Jumlah Laporan per Provinsi',
      data: Object.values(provinceCount),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }]
  };

  // Data for Bar Chart per City
  const barDataCity = {
    labels: Object.keys(cityCount),
    datasets: [{
      label: 'Jumlah Laporan per Kota',
      data: Object.values(cityCount),
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    }]
  };

  // Data for Line Chart per Month
  const lineDataMonth = {
    labels: sortedMonths.map(month => {
      const [monthNum, year] = month.split('-').map(Number);
      return new Date(year, monthNum - 1).toLocaleString('default', { month: 'short', year: 'numeric' });
    }),
    datasets: [{
      label: 'Jumlah Laporan per Bulan',
      data: sortedMonths.map(month => monthCount[month]),
      fill: true,
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgba(255, 159, 64, 1)',
      tension: 0.1,
    }]
  };

  return (
    <div className='p-5'>
      <h2 className='text-xl font-bold mb-4'>Grafik Laporan Kejadian</h2>

      {/* Grafik Bar - Jumlah Laporan per Provinsi */}
      <div className="mb-8">
        <h3 className='text-lg font-semibold mb-2'>Jumlah Laporan per Provinsi</h3>
        <Bar data={barDataProvince} options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Jumlah Laporan per Provinsi'
            }
          }
        }} />
      </div>

      {/* Grafik Bar - Jumlah Laporan per Kota */}
      <div className="mb-8">
        <h3 className='text-lg font-semibold mb-2'>Jumlah Laporan per Kota</h3>
        <Bar data={barDataCity} options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Jumlah Laporan per Kota'
            }
          }
        }} />
      </div>

      {/* Grafik Line - Jumlah Laporan per Bulan */}
      <div>
        <h3 className='text-lg font-semibold mb-2'>Jumlah Laporan per Bulan</h3>
        <Line data={lineDataMonth} options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Jumlah Laporan per Bulan'
            }
          }
        }} />
      </div>
    </div>
  );
};

export default ReportChart;
