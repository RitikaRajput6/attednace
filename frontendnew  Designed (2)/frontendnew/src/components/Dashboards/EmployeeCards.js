import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTimes, faTasks } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const EmployeeCards = () => {
  const [dashboardData, setDashboardData] = useState({
    totalAbsentEmployees: 0,
    totalProjectsCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in local storage.');
          setIsLoading(false); // Set loading to false to prevent hanging
          return;
        }

        // Fetch data from two different endpoints in parallel
        const responses = await Promise.all([
          axios.get('https://localhost:44380/api/DashboardStats/EmployeeProjectsAssignedToCurrentUserTodayCount', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('https://localhost:44380/api/DashboardStats/EmployeeAbsentDaysCountUpToThisMonth', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        // Log responses to check data structure
        console.log('API responses:', responses);

        // Update state with fetched data
        setDashboardData({
          totalAbsentEmployees: responses[1].data.TotalAbsent,
          totalProjectsCount: responses[0].data.TotalProjects,
        });

        setIsLoading(false); // Set loading to false once data is fetched

      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Ensure loading state is updated in case of error
        // Handle errors (e.g., show error message to user)
      }
    };

    fetchDashboardData(); // Invoke data fetching function when component mounts
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Conditional rendering based on loading state
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Once data is loaded, render the dashboard with fetched data
  return (
    <div className='main-dashboard'>
      <div className='container'>
        <div className="row main-dasboard-row">
          {/ Card for Total Absent Employees /}
          <DashboardStatCard
            icon={faUserTimes}
            title="Total Absent"
            value={dashboardData.totalAbsentEmployees}
          />

          {/ Card for Total Projects Count /}
          <DashboardStatCard
            icon={faTasks}
            title="Total Projects"
            value={dashboardData.totalProjectsCount}
          />
        </div>
      </div>
    </div>
  );
};

// DashboardStatCard component to render individual statistic cards
const DashboardStatCard = ({ icon, title, value }) => (
  <div className="col-sm-3 mb-3">
    <div className="card text-center">
      <div className="card-body">
        <FontAwesomeIcon icon={icon} size="3x" className="mb-3" />
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{value}</p>
      </div>
    </div>
  </div>
);

export default EmployeeCards;
