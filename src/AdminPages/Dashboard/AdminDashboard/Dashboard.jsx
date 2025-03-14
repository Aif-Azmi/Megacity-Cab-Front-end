import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { CarIcon, UsersIcon, CalendarIcon, TrendingUpIcon } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// StatsCard Component
const StatsCard = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className="text-green-600">{trend}</div>
      </div>
      <div className="mt-4">{icon}</div>
    </div>
  );
};

// VehicleChart Component
const VehicleChart = () => {
  const data = {
    labels: ['Sedans', 'SUVs', 'Trucks', 'Vans', 'Luxury'],
    datasets: [
      {
        data: [450, 380, 210, 120, 88],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };
  return (
    <div className="h-80">
      <Pie data={data} options={options} />
    </div>
  );
};

// CustomerChart Component
const CustomerChart = () => {
  const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const data = {
    labels,
    datasets: [
      {
        label: 'New Customers',
        data: [120, 150, 180, 210, 250, 280, 310, 350, 370, 400, 420, 450],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Returning Customers',
        data: [80, 100, 130, 150, 180, 200, 230, 260, 290, 310, 330, 350],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="h-80">
      <Line data={data} options={options} />
    </div>
  );
};

// RevenueChart Component
const RevenueChart = () => {
  const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const data = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: [
          65000, 59000, 80000, 81000, 86000, 95000, 91000, 88000, 100000, 94000,
          110000, 120000,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
      {
        label: 'Expenses',
        data: [
          45000, 42000, 50000, 46000, 55000, 59000, 62000, 65000, 61000, 58000,
          74000, 78000,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="h-80">
      <Bar data={data} options={options} />
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  // Mock data - would be replaced with API calls in a real application
  const stats = {
    vehicles: 1248,
    customers: 3867,
    bookings: 892,
    revenue: '$128,432',
  };

  return (
    <div className="h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Vehicles"
          value={stats.vehicles}
          icon={<CarIcon className="h-8 w-8 text-blue-600" />}
          trend="+12%"
        />
        <StatsCard
          title="Total Customers"
          value={stats.customers}
          icon={<UsersIcon className="h-8 w-8 text-green-600" />}
          trend="+7.8%"
        />
        <StatsCard
          title="Active Bookings"
          value={stats.bookings}
          icon={<CalendarIcon className="h-8 w-8 text-purple-600" />}
          trend="+4.3%"
        />
        <StatsCard
          title="Monthly Revenue"
          value={stats.revenue}
          icon={<TrendingUpIcon className="h-8 w-8 text-amber-600" />}
          trend="+10.1%"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Vehicle Distribution</h2>
          <VehicleChart />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Customer Growth</h2>
          <CustomerChart />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
        <RevenueChart />
      </div>
    </div>
  );
};

export default Dashboard;