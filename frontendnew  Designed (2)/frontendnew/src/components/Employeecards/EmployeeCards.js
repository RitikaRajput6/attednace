// import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserTimes, faTasks } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

// const EmployeeCards = () => {
//   const [dashboardData, setDashboardData] = useState({
//     totalAbsentEmployees: { count: 0, AbsentDates: [] },
//     totalProjectsCount: { count: 0, projects: [] },
//   });
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           console.error('No token found in local storage.');
//           setIsLoading(false);
//           return;
//         }

//         const endpoints = [
//           'EmployeeAbsentDaysCountUpToThisMonth',
//           'EmployeeProjectsAssignedToCurrentUserThisMonth',
//         ];

//         const requests = endpoints.map(endpoint =>
//           axios.get(`https://localhost:44380/api/DashboardStats/${endpoint}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//         );

//         const [absentDaysResponse, projectsAssignedResponse] = await Promise.all(requests);

//         const totalAbsentEmployees = {
//           count: absentDaysResponse.data?.TotalAbsent ?? 0,
//           AbsentDates: absentDaysResponse.data?.AbsentDates ?? [],
//         };
//         const totalProjectsCount = {
//           count: projectsAssignedResponse.data?.TotalProjects ?? 0,
//           projects: projectsAssignedResponse.data?.Projects ?? [],
//         };

//         setDashboardData({
//           totalAbsentEmployees: totalAbsentEmployees,
//           totalProjectsCount: totalProjectsCount,
//         });

//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className='main-dashboard'>
//       <div className='container'>
//         <div className="row main-dasboard-row">
//           {/* Card for Total Absent Employees */}
//           <DashboardStatCard
//             icon={faUserTimes}
//             title="Total Absent"
//             value={dashboardData.totalAbsentEmployees.count}
//             data={dashboardData.totalAbsentEmployees.AbsentDates}
//             isProject={false}
//           />

//           {/* Card for Total Projects Count */}
//           <DashboardStatCard
//             icon={faTasks}
//             title="Total Projects"
//             value={dashboardData.totalProjectsCount.count}
//             data={dashboardData.totalProjectsCount.projects}
//             isProject={true}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const DashboardStatCard = ({ icon, title, value, data, isProject }) => {
//   const [popoverOpen, setPopoverOpen] = useState(false);
//   const [showAll, setShowAll] = useState(false);

//   const togglePopover = () => {
//     setPopoverOpen(!popoverOpen);
//   };

//   const toggleShowAll = () => {
//     setShowAll(!showAll);
//   };

//   return (
//     <div className="col-12 col-lg-6 mb-3">
//       <div className="card text-center" id={`${title.replace(' ', '')}Card`} onMouseEnter={togglePopover} onMouseLeave={togglePopover}>
//         <div className="card-body">
//           <FontAwesomeIcon icon={icon} size="3x" className="mb-3" />
//           <h5 className="card-title">{title}</h5>
//           <p className="card-text">{value}</p>
//         </div>
//         <Popover placement="right" isOpen={popoverOpen} target={`${title.replace(' ', '')}Card`} toggle={togglePopover}>
//           <PopoverHeader>{isProject ? 'Projects' : 'Absent Dates'}</PopoverHeader>
//           <PopoverBody>
//             {data && data.length > 0 ? (
//               <ul>
//                 {showAll
//                   ? data.map((item, index) => (
//                       <li key={index}>
//                         <strong>{isProject ? item.ProjectName : item}</strong>
//                       </li>
//                     ))
//                   : data.slice(0, 3).map((item, index) => (
//                       <li key={index}>
//                         <strong>{isProject ? item.ProjectName : item}</strong>
//                       </li>
//                     ))}
//               </ul>
//             ) : (
//               <p>No {isProject ? 'projects' : 'absent dates'} found.</p>
//             )}
//             {data.length > 3 && (
//               <button className="btn btn-link" onClick={toggleShowAll}>
//                 {showAll ? 'Show Less' : 'Show All'}
//               </button>
//             )}
//           </PopoverBody>
//         </Popover>
//       </div>
//     </div>
//   );
// };

// export default EmployeeCards;



import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTimes, faTasks } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

const EmployeeCards = () => {
  const [dashboardData, setDashboardData] = useState({
    totalAbsentEmployees: { count: 0, AbsentDates: [] },
    totalProjectsCount: { count: 0, projects: [] },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in local storage.');
          setIsLoading(false);
          return;
        }

        const endpoints = [
          'EmployeeAbsentDaysCountUpToThisMonth',
          'EmployeeProjectsAssignedToCurrentUserThisMonth',
        ];

        const requests = endpoints.map(endpoint =>
          axios.get(`https://localhost:44380/api/DashboardStats/${endpoint}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );

        const [absentDaysResponse, projectsAssignedResponse] = await Promise.all(requests);

        const totalAbsentEmployees = {
          count: absentDaysResponse.data?.TotalAbsent ?? 0,
          AbsentDates: absentDaysResponse.data?.AbsentDates ?? [],
        };
        const totalProjectsCount = {
          count: projectsAssignedResponse.data?.TotalProjects ?? 0,
          projects: projectsAssignedResponse.data?.Projects ?? [],
        };

        setDashboardData({
          totalAbsentEmployees: totalAbsentEmployees,
          totalProjectsCount: totalProjectsCount,
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='main-dashboard'>
      <div className='container'>
        <div className="row main-dasboard-row">
          {/* Card for Total Absent Employees */}
          <DashboardStatCard
            icon={faUserTimes}
            title="Total Absent"
            value={dashboardData.totalAbsentEmployees.count}
            data={dashboardData.totalAbsentEmployees.AbsentDates}
            isProject={false}
          />

          {/* Card for Total Projects Count */}
          <DashboardStatCard
            icon={faTasks}
            title="Total Projects"
            value={dashboardData.totalProjectsCount.count}
            data={dashboardData.totalProjectsCount.projects}
            isProject={true}
          />
        </div>
      </div>
    </div>
  );
};

const DashboardStatCard = ({ icon, title, value, data, isProject }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="col-12 col-lg-6 mb-3">
      <div className="card text-center" id={`${title.replace(' ', '')}Card`} onMouseEnter={togglePopover} onMouseLeave={togglePopover}>
        <div className="card-body">
          <FontAwesomeIcon icon={icon} size="3x" className="mb-3" />
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{value}</p>
        </div>
        <Popover placement="right" isOpen={popoverOpen} target={`${title.replace(' ', '')}Card`} toggle={togglePopover}>
          <PopoverHeader>{isProject ? 'Projects' : 'Absent Dates'}</PopoverHeader>
          <PopoverBody>
            {data && data.length > 0 ? (
              <ul>
                {showAll
                  ? data.map((item, index) => (
                      <li key={index}>
                        <strong>{isProject ? item.ProjectName : item}</strong>
                      </li>
                    ))
                  : data.slice(0, 3).map((item, index) => (
                      <li key={index}>
                        <strong>{isProject ? item.ProjectName : item}</strong>
                      </li>
                    ))}
              </ul>
            ) : (
              <p>No {isProject ? 'projects' : 'absent dates'} found.</p>
            )}
            {data.length > 3 && (
              <button className="btn btn-link" onClick={toggleShowAll}>
                {showAll ? 'Show Less' : 'Show All'}
              </button>
            )}
          </PopoverBody>
        </Popover>
      </div>
    </div>
  );
};

export default EmployeeCards;
