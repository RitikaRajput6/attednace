// import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUsers, faUserTimes, faUserCheck, faFileAlt, faTasks, faUser } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

// const DashboardCard = () => {
//   const [dashboardData, setDashboardData] = useState({
//     totalEmployees: { count: 0, employees: [] },
//     totalAbsentEmployees: { count: 0, employees: [] },
//     totalPresentEmployees: { count: 0, employees: [] },
//     totalProjectsCount: { count: 0, projects: [] },
//     totalProjectAssign: { count: 0, projects: [] },
//     totalDailyReports: { count: 0, reports: [] },
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const [popoverOpen, setPopoverOpen] = useState(false);
//   const [popoverContent, setPopoverContent] = useState(null);
//   const [popoverTarget, setPopoverTarget] = useState(null);
//   const [showAll, setShowAll] = useState({
//     totalEmployeesCard: false,
//     totalPresentCard: false,
//     totalAbsentCard: false,
//     totalProjectsCard: false,
//     totalAssignedProjectsCard: false,
//     totalDailyReportsCard: false,
//   }); // Track whether to show all items for each card

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           throw new Error('No token found in local storage.');
//         }

//         const endpoints = [
//           'GetTotalEmployeesCount',
//           'GetTotalPresentEmployees',
//           'GetTotalAbsentEmployees',
//           'GetTotalProjectsCount',
//           'GetTotalAssignedProjectsCount',
//           'GetMarkedUsersOfTodayDailyReport',
//         ];

//         const requests = endpoints.map(endpoint =>
//           axios.get(`https://localhost:44380/api/DashboardStats/${endpoint}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//         );

//         const responses = await Promise.all(requests);

//         setDashboardData({
//           totalEmployees: {
//             count: responses[0].data.TotalCount,
//             employees: responses[0].data.Employees,
//           },
//           totalPresentEmployees: {
//             count: responses[1].data.Total,
//             employees: responses[1].data.Employees,
//           },
//           totalAbsentEmployees: {
//             count: responses[2].data.Total,
//             employees: responses[2].data.Employees,
//           },
//           totalProjectsCount: {
//             count: responses[3].data.TotalCount,
//             projects: responses[3].data.Projects,
//           },
//           totalProjectAssign: {
//             count: responses[4].data.TotalCount,
//             projects: responses[4].data.Assignments,
//           },
//           totalDailyReports: {
//             count: responses[5].data.TotalCount,
//             reports: responses[5].data.MarkedUsers,
//           },
//         });

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   const togglePopover = (data, target, isProject = false) => {
//     if (data && data.length > 0) {
//       const popoverContent = (
//         <div>
//           <PopoverHeader>{isProject ? 'Projects' : 'Employees'}</PopoverHeader>
//           <PopoverBody>
//             <ul>
//               {data.map((item, index) => (
//                 <li key={index}>
//                   {isProject ? (
//                     <strong>{item.ProjectName}</strong>
//                   ) : (
//                     <>
//                       <strong>{item.EmployeeId}</strong>: {item.FullName}
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </PopoverBody>
//         </div>
//       );
//       setPopoverContent(popoverContent);
//       setPopoverTarget(target);
//       setPopoverOpen(true);
//     } else {
//       setPopoverOpen(false);
//     }
//   };

//   const toggleShowAll = (target) => {
//     setShowAll(prevState => ({
//       ...prevState,
//       [target]: !prevState[target]
//     }));
//     setPopoverTarget(target); // Update the target when toggling showAll
//   };

//   if (isLoading) {
//     return <p className="text-center mt-3">Loading...</p>;
//   }

//   return (
//     <div className='main-dashboard'>
//       <div className='container'>
//         <div className="row main-dashboard-row">
//           <div className="col-lg-4 mb-3">
//             <div
//               className="card text-center"
//               id="totalEmployeesCard"
//               onMouseEnter={() => togglePopover(showAll.totalEmployeesCard ? dashboardData.totalEmployees.employees : dashboardData.totalEmployees.employees.slice(0, 3), 'totalEmployeesCard')}
//               onMouseLeave={() => setPopoverOpen(false)}
//             >
//               <div className="card-body">
//                 <FontAwesomeIcon icon={faUsers} size="3x" className="mb-3" />
//                 <h5 className="card-title">Total Employees</h5>
//                 <p className="card-text">{dashboardData.totalEmployees.count}</p>
//               </div>
//               <Popover
//                 placement="top"
//                 isOpen={popoverOpen && popoverTarget === 'totalEmployeesCard'}
//                 target="totalEmployeesCard"
//                 toggle={() => setPopoverOpen(!popoverOpen)}
//               >
//                 <PopoverHeader>Employees</PopoverHeader>
//                 <PopoverBody>
//                   <ul>
//                     {showAll.totalEmployeesCard
//                       ? dashboardData.totalEmployees.employees.map((item, index) => (
//                           <li key={index}>
//                             <strong>{item.EmployeeId}</strong>: {item.FullName}
//                           </li>
//                         ))
//                       : dashboardData.totalEmployees.employees.slice(0, 3).map((item, index) => (
//                           <li key={index}>
//                             <strong>{item.EmployeeId}</strong>: {item.FullName}
//                           </li>
//                         ))}
//                   </ul>
//                   {dashboardData.totalEmployees.employees.length > 3 && (
//                     <button className="btn btn-link" onClick={() => toggleShowAll('totalEmployeesCard')}>
//                       {showAll.totalEmployeesCard ? 'Show Less' : 'Show More'}
//                     </button>
//                   )}
//                 </PopoverBody>
//               </Popover>
//             </div>
//           </div>

//           <div className="col-lg-4 mb-3">
//             <div
//               className="card text-center"
//               id="totalPresentCard"
//               onMouseEnter={() => togglePopover(showAll.totalPresentCard ? dashboardData.totalPresentEmployees.employees : dashboardData.totalPresentEmployees.employees.slice(0, 3), 'totalPresentCard')}
//               onMouseLeave={() => setPopoverOpen(false)}
//             >
//               <div className="card-body">
//                 <FontAwesomeIcon icon={faUserCheck} size="3x" className="mb-3" />
//                 <h5 className="card-title">Total Present</h5>
//                 <p className="card-text">{dashboardData.totalPresentEmployees.count}</p>
//               </div>
//               <Popover
//                 placement="top"
//                 isOpen={popoverOpen && popoverTarget === 'totalPresentCard'}
//                 target="totalPresentCard"
//                 toggle={() => setPopoverOpen(!popoverOpen)}
//               >
//                 <PopoverHeader>Present Employees</PopoverHeader>
//                 <PopoverBody>
//                   <ul>
//                     {showAll.totalPresentCard
//                       ? dashboardData.totalPresentEmployees.employees.map((item, index) => (
//                           <li key={index}>
//                             <strong>{item.EmployeeId}</strong>: {item.FullName}
//                           </li>
//                         ))
//                       : dashboardData.totalPresentEmployees.employees.slice(0, 3).map((item, index) => (
//                           <li key={index}>
//                             <strong>{item.EmployeeId}</strong>: {item.FullName}
//                           </li>
//                         ))}
//                   </ul>
//                   {dashboardData.totalPresentEmployees.employees.length > 3 && (
//                     <button className="btn btn-link" onClick={() => toggleShowAll('totalPresentCard')}>
//                       {showAll.totalPresentCard ? 'Show Less' : 'Show More'}
//                     </button>
//                   )}
//                 </PopoverBody>
//               </Popover>
//             </div>
//           </div>

//           <div className="col-lg-4 mb-3">
//             <div
//               className="card text-center"
//               id="totalAbsentCard"
//               onMouseEnter={() => togglePopover(showAll.totalAbsentCard ? dashboardData.totalAbsentEmployees.employees : dashboardData.totalAbsentEmployees.employees.slice(0, 3), 'totalAbsentCard')}
//               onMouseLeave={() => setPopoverOpen(false)}
//             >
//               <div className="card-body">
//                 <FontAwesomeIcon icon={faUserTimes} size="3x" className="mb-3" />
//                 <h5 className="card-title">Total Absent</h5>
//                 <p className="card-text">{dashboardData.totalAbsentEmployees.count}</p>
//               </div>
//               <Popover
//                 placement="top"
//                 isOpen={popoverOpen && popoverTarget === 'totalAbsentCard'}
//                 target="totalAbsentCard"
//                 toggle={() => setPopoverOpen(!popoverOpen)}
//               >
//                 <PopoverHeader>Absent Employees</PopoverHeader>
//                 <PopoverBody>
//                   <ul>
//                     {showAll.totalAbsentCard
//                       ? dashboardData.totalAbsentEmployees.employees.map((item, index) => (
//                           <li key={index}>
//                             <strong>{item.EmployeeId}</strong>: {item.FullName}
//                           </li>
//                         ))
//                       : dashboardData.totalAbsentEmployees.employees.slice(0, 3).map((item, index) => (
//                           <li key={index}>
//                             <strong>{item.EmployeeId}</strong>: {item.FullName}
//                           </li>
//                         ))}
//                   </ul>
//                   {dashboardData.totalAbsentEmployees.employees.length > 3 && (
//                     <button className="btn btn-link" onClick={() => toggleShowAll('totalAbsentCard')}>
//                       {showAll.totalAbsentCard ? 'Show Less' : 'Show More'}
//                     </button>
//                   )}
//                 </PopoverBody>
//               </Popover>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardCard;

// import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faUsers,
//   faUserTimes,
//   faUserCheck,
//   faFileAlt,
//   faTasks,
//   faUser,
// } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import { Popover, PopoverHeader, PopoverBody } from "reactstrap";

// const DashboardCard = () => {
//   const [dashboardData, setDashboardData] = useState({
//     totalEmployees: { count: 0, employees: [] },
//     totalAbsentEmployees: { count: 0, employees: [] },
//     totalPresentEmployees: { count: 0, employees: [] },
//     totalProjectsCount: { count: 0, projects: [] },
//     totalProjectAssign: { count: 0, projects: [] },
//     totalDailyReports: { count: 0, reports: [] },
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const [popoverContent, setPopoverContent] = useState(null);
//   const [popoverTarget, setPopoverTarget] = useState(null);
//   const [showAll, setShowAll] = useState({
//     totalAbsentCard: false,
//     totalProjectsCard: false,
//     totalProjectAssignCard: false,
//     totalDailyReportsCard: false,
//   });

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("No token found in local storage.");
//         }

//         const endpoints = [
//           "GetTotalEmployeesCount",
//           "GetTotalPresentEmployees",
//           "GetTotalAbsentEmployees",
//           "GetTotalProjectsCount",
//           "GetTotalAssignedProjectsCount",
//           "GetMarkedUsersOfTodayDailyReport",
//         ];

//         const requests = endpoints.map((endpoint) =>
//           axios.get(`https://localhost:44380/api/DashboardStats/${endpoint}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//         );

//         const responses = await Promise.all(requests);

//         setDashboardData({
//           totalEmployees: {
//             count: responses[0].data.TotalCount,
//             employees: responses[0].data.Employees,
//           },
//           totalPresentEmployees: {
//             count: responses[1].data.Total,
//             employees: responses[1].data.Employees,
//           },
//           totalAbsentEmployees: {
//             count: responses[2].data.Total,
//             employees: responses[2].data.Employees,
//           },
//           totalProjectsCount: {
//             count: responses[3].data.TotalCount,
//             projects: responses[3].data.Projects,
//           },
//           totalProjectAssign: {
//             count: responses[4].data.TotalCount,
//             projects: responses[4].data.Projects,
//           },
//           totalDailyReports: {
//             count: responses[5].data.TotalCount,
//             reports: responses[5].data.MarkedUsers,
//           },
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   const toggleShowAll = (target) => {
//     setShowAll((prevState) => ({
//       ...prevState,
//       [target]: !prevState[target],
//     }));
//   };

//   const togglePopover = (data, target, isProject = false) => {
//     if (data && data.length > 0) {
//       const content = (
//         <div>
//           <PopoverHeader>{isProject ? "Projects" : "Employees"}</PopoverHeader>
//           <PopoverBody>
//             <ul>
//               {data
//                 .slice(0, showAll[target] ? data.length : 3)
//                 .map((item, index) => (
//                   <li key={index}>
//                     {isProject ? (
//                       <>
//                         <strong>{item.ProjectName}</strong>
//                         {item.Assignments && showAll[target] && (
//                           <ul>
//                             {item.Assignments.map((assignment, idx) => (
//                               <li key={idx}>
//                                 <strong>{assignment.EmployeeId}</strong>:{" "}
//                                 {assignment.FullName}
//                               </li>
//                             ))}
//                           </ul>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         <strong>{item.EmployeeId}</strong>: {item.FullName}
//                       </>
//                     )}
//                   </li>
//                 ))}
//             </ul>
//             {data.length > 3 && (
//               <button className="btn btn-link" onClick={() => toggleShowAll(target)}>
//                 {showAll[target] ? 'Show Less' : 'Show All'}
//               </button>
//             )}
//           </PopoverBody>
//         </div>
//       );
//       setPopoverContent(content);
//       setPopoverTarget(target);
//     }
//   };

//   if (isLoading) {
//     return <p className="text-center mt-3">Loading...</p>;
//   }

//   return (
//     <div className="main-dashboard">
//       <div className="container">
//         <div className="row main-dashboard-row">
//           {/* Total Employees Card */}
//           <div className="col-lg-4 mb-3">
//             <div
//               className="card text-center"
//               id="totalEmployeesCard"
//               onMouseEnter={() =>
//                 togglePopover(
//                   dashboardData.totalEmployees.employees,
//                   "totalEmployeesCard"
//                 )
//               }
//               onMouseLeave={() => setPopoverContent(null)}
//             >
//               <div className="card-body">
//                 <FontAwesomeIcon icon={faUsers} size="3x" className="mb-3" />
//                 <h5 className="card-title">Total Employees</h5>
//                 <p className="card-text">
//                   {dashboardData.totalEmployees.count}
//                 </p>
//               </div>
//               <Popover
//                 placement="top"
//                 isOpen={popoverTarget === "totalEmployeesCard"}
//                 target="totalEmployeesCard"
//                 toggle={() => {}}
//               >
//                 {popoverContent}
//               </Popover>
//             </div>
//           </div>

//           {/* Total Present Card */}
//           <div className="col-lg-4 mb-3">
//             <div
//               className="card text-center"
//               id="totalPresentCard"
//               onMouseEnter={() =>
//                 togglePopover(
//                   dashboardData.totalPresentEmployees.employees,
//                   "totalPresentCard"
//                 )
//               }
//               onMouseLeave={() => setPopoverContent(null)}
//             >
//               <div className="card-body">
//                 <FontAwesomeIcon
//                   icon={faUserCheck}
//                   size="3x"
//                   className="mb-3"
//                 />
//                 <h5 className="card-title">Total Present</h5>
//                 <p className="card-text">
//                   {dashboardData.totalPresentEmployees.count}
//                 </p>
//               </div>
//               <Popover
//                 placement="top"
//                 isOpen={popoverTarget === "totalPresentCard"}
//                 target="totalPresentCard"
//                 toggle={() => {}}
//               >
//                 {popoverContent}
//               </Popover>
//             </div>
//           </div>

//           {/* Total Absent Card */}
//           <div className="col-lg-4 mb-3">
//             <div
//               className="card text-center"
//               id="totalAbsentCard"
//               onMouseEnter={() =>
//                 togglePopover(
//                   dashboardData.totalAbsentEmployees.employees,
//                   "totalAbsentCard"
//                 )
//               }
//               onMouseLeave={() => setPopoverContent(null)}
//             >
//               <div className="card-body">
//                 <FontAwesomeIcon
//                   icon={faUserTimes}
//                   size="3x"
//                   className="mb-3"
//                 />
//                 <h5 className="card-title">Total Absent</h5>
//                 <p className="card-text">
//                   {dashboardData.totalAbsentEmployees.count}
//                 </p>
//               </div>
//               <Popover
//                 placement="top"
//                 isOpen={popoverTarget === "totalAbsentCard"}
//                 target="totalAbsentCard"
//                 toggle={() => {}}
//               >
//                 {popoverContent}
//               </Popover>
//             </div>
//           </div>

//           {/* Total Daily Reports Card */}
//           <div className="col-lg-4 mb-3">
//             <div
//               className="card text-center"
//               id="totalDailyReportsCard"
//               onMouseEnter={() =>
//                 togglePopover(
//                   dashboardData.totalDailyReports.reports,
//                   "totalDailyReportsCard"
//                 )
//               }
//               onMouseLeave={() => setPopoverContent(null)}
//             >
//               <div className="card-body">
//                 <FontAwesomeIcon icon={faFileAlt} size="3x" className="mb-3" />
//                 <h5 className="card-title">Total Daily Reports</h5>
//                 <p className="card-text">
//                   {dashboardData.totalDailyReports.count}
//                 </p>
//               </div>
//               <Popover
//                 placement="top"
//                 isOpen={popoverTarget === "totalDailyReportsCard"}
//                 target="totalDailyReportsCard"
//                 toggle={() => {}}
//               >
//                 {popoverContent}
//               </Popover>
//             </div>
//           </div>

//           {/* Total Projects Card */}
//           <div className="col-lg-4 mb-3">
//             <div
//               className="card text-center"
//               id="totalProjectsCard"
//               onMouseEnter={() =>
//                 togglePopover(
//                   dashboardData.totalProjectsCount.projects,
//                   "totalProjectsCard",
//                   true
//                 )
//               }
//               onMouseLeave={() => setPopoverContent(null)}
//             >
//               <div className="card-body">
//                 <FontAwesomeIcon icon={faTasks} size="3x" className="mb-3" />
//                 <h5 className="card-title">Total Projects</h5>
//                 <p className="card-text">
//                   {dashboardData.totalProjectsCount.count}
//                 </p>
//               </div>
//               <Popover
//                 placement="top"
//                 isOpen={popoverTarget === "totalProjectsCard"}
//                 target="totalProjectsCard"
//                 toggle={() => {}}
//               >
//                 {popoverContent}
//               </Popover>
//             </div>
//           </div>

//           {/* Total Project Assign Card */}
//           <div className="col-lg-4 mb-3">
//             <div
//               className="card text-center"
//               id="totalProjectAssignCard"
//               onMouseEnter={() =>
//                 togglePopover(
//                   dashboardData.totalProjectAssign.projects,
//                   "totalProjectAssignCard",
//                   true
//                 )
//               }
//               onMouseLeave={() => setPopoverContent(null)}
//             >
//               <div className="card-body">
//                 <FontAwesomeIcon icon={faUser} size="3x" className="mb-3" />
//                 <h5 className="card-title">Total Project Assign</h5>
//                 <p className="card-text">
//                   {dashboardData.totalProjectAssign.count}
//                 </p>
//               </div>
//               <Popover
//                 placement="top"
//                 isOpen={popoverTarget === "totalProjectAssignCard"}
//                 target="totalProjectAssignCard"
//                 toggle={() => {}}
//               >
//                 {popoverContent}
//               </Popover>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardCard;






import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUserTimes,
  faUserCheck,
  faFileAlt,
  faTasks,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";

const DashboardCard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalEmployees: { count: 0, employees: [] },
    totalAbsentEmployees: { count: 0, employees: [] },
    totalPresentEmployees: { count: 0, employees: [] },
    totalProjectsCount: { count: 0, projects: [] },
    totalProjectAssign: { count: 0, projects: [] },
    totalDailyReports: { count: 0, reports: [] },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverContent, setPopoverContent] = useState(null);
  const [popoverTarget, setPopoverTarget] = useState(null);
  const [showAll, setShowAll] = useState({
    totalEmployeesCard: false,
    totalPresentCard: false,
    totalAbsentCard: false,
    totalProjectsCard: false,
    totalAssignedProjectsCard: false,
    totalDailyReportsCard: false,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in local storage.");
        }

        const endpoints = [
          "GetTotalEmployeesCount",
          "GetTotalPresentEmployees",
          "GetTotalAbsentEmployees",
          "GetTotalProjectsCount",
          "GetTotalAssignedProjectsCount",
          "GetMarkedUsersOfTodayDailyReport",
        ];

        const requests = endpoints.map((endpoint) =>
          axios.get(`https://localhost:44380/api/DashboardStats/${endpoint}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        );

        const responses = await Promise.all(requests);

        setDashboardData({
          totalEmployees: {
            count: responses[0].data.TotalCount,
            employees: responses[0].data.Employees,
          },
          totalPresentEmployees: {
            count: responses[1].data.Total,
            employees: responses[1].data.Employees,
          },
          totalAbsentEmployees: {
            count: responses[2].data.Total,
            employees: responses[2].data.Employees,
          },
          totalProjectsCount: {
            count: responses[3].data.TotalCount,
            projects: responses[3].data.Projects,
          },
          totalProjectAssign: {
            count: responses[4].data.TotalCount,
            projects: responses[4].data.Assignments,
          },
          totalDailyReports: {
            count: responses[5].data.TotalCount,
            reports: responses[5].data.MarkedUsers,
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const togglePopover = (data, target, isProject = false) => {
    if (data && data.length > 0) {
      const popoverContent = (
        <div>
          <PopoverHeader>{isProject ? "Projects" : "Employees"}</PopoverHeader>
          <PopoverBody>
            <ul>
              {data.map((item, index) => (
                <li key={index}>
                  {isProject ? (
                    <strong>{item.ProjectName}</strong>
                  ) : (
                    <>
                      <strong>{item.EmployeeId}</strong>: {item.FullName}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </PopoverBody>
        </div>
      );
      setPopoverContent(popoverContent);
      setPopoverTarget(target);
      setPopoverOpen(true);
    } else {
      setPopoverOpen(false);
    }
  };

  const toggleShowAll = (target) => {
    setShowAll((prevState) => ({
      ...prevState,
      [target]: !prevState[target],
    }));
    setPopoverTarget(target); // Update the target when toggling showAll
  };

  if (isLoading) {
    return <p className="text-center mt-3">Loading...</p>;
  }

  return (
    <div className="main-dashboard">
      <div className="container">
        <div className="row main-dashboard-row">
          <div className="col-12 col-lg-4 col-md-6 col-sm-6 mb-3">
            <div
              className="card text-center"
              id="totalEmployeesCard"
              onMouseEnter={() =>
                togglePopover(
                  showAll.totalEmployeesCard
                    ? dashboardData.totalEmployees.employees
                    : dashboardData.totalEmployees.employees.slice(0, 3),
                  "totalEmployeesCard"
                )
              }
              onMouseLeave={() => setPopoverOpen(false)}
            >
              <div className="card-body">
                <FontAwesomeIcon icon={faUsers} size="3x" className="mb-3" />
                <h5 className="card-title">Total Employees</h5>
                <p className="card-text">
                  {dashboardData.totalEmployees.count}
                </p>
              </div>
              <Popover
                placement="top"
                isOpen={popoverOpen && popoverTarget === "totalEmployeesCard"}
                target="totalEmployeesCard"
                toggle={() => setPopoverOpen(!popoverOpen)}
              >
                <PopoverHeader>Employees</PopoverHeader>
                <PopoverBody>
                  <ul>
                    {showAll.totalEmployeesCard
                      ? dashboardData.totalEmployees.employees.map(
                          (item, index) => (
                            <li key={index}>
                              <strong>{item.EmployeeId}</strong>:{" "}
                              {item.FullName}
                            </li>
                          )
                        )
                      : dashboardData.totalEmployees.employees
                          .slice(0, 3)
                          .map((item, index) => (
                            <li key={index}>
                              <strong>{item.EmployeeId}</strong>:{" "}
                              {item.FullName}
                            </li>
                          ))}
                  </ul>
                  {dashboardData.totalEmployees.employees.length > 3 && (
                    <button
                      className="btn btn-link"
                      onClick={() => toggleShowAll("totalEmployeesCard")}
                    >
                      {showAll.totalEmployeesCard ? "Show Less" : "Show More"}
                    </button>
                  )}
                </PopoverBody>
              </Popover>
            </div>
          </div>

          <div className="col-12 col-lg-4 col-md-6 col-sm-6 mb-3">
            <div
              className="card text-center"
              id="totalPresentCard"
              onMouseEnter={() =>
                togglePopover(
                  showAll.totalPresentCard
                    ? dashboardData.totalPresentEmployees.employees
                    : dashboardData.totalPresentEmployees.employees.slice(0, 3),
                  "totalPresentCard"
                )
              }
              onMouseLeave={() => setPopoverOpen(false)}
            >
              <div className="card-body">
                <FontAwesomeIcon
                  icon={faUserCheck}
                  size="3x"
                  className="mb-3"
                />
                <h5 className="card-title">Total Present</h5>
                <p className="card-text">
                  {dashboardData.totalPresentEmployees.count}
                </p>
              </div>
              <Popover
                placement="top"
                isOpen={popoverOpen && popoverTarget === "totalPresentCard"}
                target="totalPresentCard"
                toggle={() => setPopoverOpen(!popoverOpen)}
              >
                <PopoverHeader>Present Employees</PopoverHeader>
                <PopoverBody>
                  <ul>
                    {showAll.totalPresentCard
                      ? dashboardData.totalPresentEmployees.employees.map(
                          (item, index) => (
                            <li key={index}>
                              <strong>{item.EmployeeId}</strong>:{" "}
                              {item.FullName}
                            </li>
                          )
                        )
                      : dashboardData.totalPresentEmployees.employees
                          .slice(0, 3)
                          .map((item, index) => (
                            <li key={index}>
                              <strong>{item.EmployeeId}</strong>:{" "}
                              {item.FullName}
                            </li>
                          ))}
                  </ul>
                  {dashboardData.totalPresentEmployees.employees.length > 3 && (
                    <button
                      className="btn brown-color"
                      onClick={() => toggleShowAll("totalPresentCard")}
                    >
                      {showAll.totalPresentCard ? "Show Less" : "Show More"}
                    </button>
                  )}
                </PopoverBody>
              </Popover>
            </div>
          </div>

          <div className="col-12 col-lg-4 col-md-6 col-sm-6 mb-3">
            <div
              className="card text-center"
              id="totalAbsentCard"
              onMouseEnter={() =>
                togglePopover(
                  showAll.totalAbsentCard
                    ? dashboardData.totalAbsentEmployees.employees
                    : dashboardData.totalAbsentEmployees.employees.slice(0, 3),
                  "totalAbsentCard"
                )
              }
              onMouseLeave={() => setPopoverOpen(false)}
            >
              <div className="card-body">
                <FontAwesomeIcon
                  icon={faUserTimes}
                  size="3x"
                  className="mb-3"
                />
                <h5 className="card-title">Total Absent</h5>
                <p className="card-text">
                  {dashboardData.totalAbsentEmployees.count}
                </p>
              </div>
              <Popover
                placement="top"
                isOpen={popoverOpen && popoverTarget === "totalAbsentCard"}
                target="totalAbsentCard"
                toggle={() => setPopoverOpen(!popoverOpen)}
              >
                <PopoverHeader>Absent Employees</PopoverHeader>
                <PopoverBody>
                  <ul>
                    {showAll.totalAbsentCard
                      ? dashboardData.totalAbsentEmployees.employees.map(
                          (item, index) => (
                            <li key={index}>
                              <strong>{item.EmployeeId}</strong>:{" "}
                              {item.FullName}
                            </li>
                          )
                        )
                      : dashboardData.totalAbsentEmployees.employees
                          .slice(0, 3)
                          .map((item, index) => (
                            <li key={index}>
                              <strong>{item.EmployeeId}</strong>:{" "}
                              {item.FullName}
                            </li>
                          ))}
                  </ul>
                  {dashboardData.totalAbsentEmployees.employees.length > 3 && (
                    <button
                      className="btn btn-link"
                      onClick={() => toggleShowAll("totalAbsentCard")}
                    >
                      {showAll.totalAbsentCard ? "Show Less" : "Show More"}
                    </button>
                  )}
                </PopoverBody>
              </Popover>
            </div>
          </div>

          <div className="col-12 col-lg-4 col-md-6 col-sm-6 mb-3">
            <div
              className="card text-center"
              id="totalProjectsCard"
              onMouseEnter={() =>
                togglePopover(
                  showAll.totalProjectsCard
                    ? dashboardData.totalProjectsCount.projects
                    : dashboardData.totalProjectsCount.projects.slice(0, 3),
                  "totalProjectsCard",
                  true
                )
              }
              onMouseLeave={() => setPopoverOpen(false)}
            >
              <div className="card-body">
                <FontAwesomeIcon icon={faFileAlt} size="3x" className="mb-3" />
                <h5 className="card-title">Total Projects</h5>
                <p className="card-text">
                  {dashboardData.totalProjectsCount.count}
                </p>
              </div>
              <Popover
                placement="top"
                isOpen={popoverOpen && popoverTarget === "totalProjectsCard"}
                target="totalProjectsCard"
                toggle={() => setPopoverOpen(!popoverOpen)}
              >
                <PopoverHeader>Projects</PopoverHeader>
                <PopoverBody>
                  <ul>
                    {showAll.totalProjectsCard
                      ? dashboardData.totalProjectsCount.projects.map(
                          (item, index) => (
                            <li key={index}>
                              <strong>{item.ProjectName}</strong>
                            </li>
                          )
                        )
                      : dashboardData.totalProjectsCount.projects
                          .slice(0, 3)
                          .map((item, index) => (
                            <li key={index}>
                              <strong>{item.ProjectName}</strong>
                            </li>
                          ))}
                  </ul>
                  {dashboardData.totalProjectsCount.projects.length > 3 && (
                    <button
                      className="btn btn-link"
                      onClick={() => toggleShowAll("totalProjectsCard")}
                    >
                      {showAll.totalProjectsCard ? "Show Less" : "Show More"}
                    </button>
                  )}
                </PopoverBody>
              </Popover>
            </div>
          </div>

          {/* <div className="col-lg-4 mb-3">
            <div
              className="card text-center"
              id="totalAssignedProjectsCard"
              onMouseEnter={() => togglePopover(showAll.totalAssignedProjectsCard ? dashboardData.totalProjectAssign.projects : dashboardData.totalProjectAssign.projects.slice(0, 3), 'totalAssignedProjectsCard', true)}
              onMouseLeave={() => setPopoverOpen(false)}
            >
              <div className="card-body">
                <FontAwesomeIcon icon={faTasks} size="3x" className="mb-3" />
                <h5 className="card-title">Total Assigned Projects</h5>
                <p className="card-text">{dashboardData.totalProjectAssign.count}</p>
              </div>
              <Popover
                placement="top"
                isOpen={popoverOpen && popoverTarget === 'totalAssignedProjectsCard'}
                target="totalAssignedProjectsCard"
                toggle={() => setPopoverOpen(!popoverOpen)}
              >
                <PopoverHeader>Assigned Projects</PopoverHeader>
                <PopoverBody>
                  <ul>
                    {showAll.totalAssignedProjectsCard
                      ? dashboardData.totalProjectAssign.projects.map((item, index) => (
                          <li key={index}>
                            <strong>{item.ProjectName}</strong>
                          </li>
                        ))
                      : dashboardData.totalProjectAssign.projects.slice(0, 3).map((item, index) => (
                          <li key={index}>
                            <strong>{item.ProjectName}</strong>
                          </li>
                        ))}
                  </ul>
                  {dashboardData.totalProjectAssign.projects.length > 3 && (
                    <button className="btn btn-link" onClick={() => toggleShowAll('totalAssignedProjectsCard')}>
                      {showAll.totalAssignedProjectsCard ? 'Show Less' : 'Show More'}
                    </button>
                  )}
                </PopoverBody>
              </Popover>
            </div>
          </div> */}

          <div className="col-12 col-lg-4 col-md-6 col-sm-6 mb-3">
            <div
              className="card text-center"
              id="totalDailyReportsCard"
              onMouseEnter={() =>
                togglePopover(
                  showAll.totalDailyReportsCard
                    ? dashboardData.totalDailyReports.reports
                    : dashboardData.totalDailyReports.reports.slice(0, 3),
                  "totalDailyReportsCard"
                )
              }
              onMouseLeave={() => setPopoverOpen(false)}
            >
              <div className="card-body">
                <FontAwesomeIcon icon={faUser} size="3x" className="mb-3" />
                <h5 className="card-title">Total Daily Reports</h5>
                <p className="card-text">
                  {dashboardData.totalDailyReports.count}
                </p>
              </div>
              <Popover
                placement="top"
                isOpen={
                  popoverOpen && popoverTarget === "totalDailyReportsCard"
                }
                target="totalDailyReportsCard"
                toggle={() => setPopoverOpen(!popoverOpen)}
              >
                <PopoverHeader>Daily Reports</PopoverHeader>
                <PopoverBody>
                  <ul>
                    {showAll.totalDailyReportsCard
                      ? dashboardData.totalDailyReports.reports.map(
                          (item, index) => (
                            <li key={index}>
                              <strong>{item.UserName}</strong>:{" "}
                              {item.EmployeeId} - {item.FullName}
                            </li>
                          )
                        )
                      : dashboardData.totalDailyReports.reports
                          .slice(0, 3)
                          .map((item, index) => (
                            <li key={index}>
                              <strong>{item.UserName}</strong>:{" "}
                              {item.EmployeeId} - {item.FullName}
                            </li>
                          ))}
                  </ul>
                  {dashboardData.totalDailyReports.reports.length > 3 && (
                    <button
                      className="btn btn-link"
                      onClick={() => toggleShowAll("totalDailyReportsCard")}
                    >
                      {showAll.totalDailyReportsCard
                        ? "Show Less"
                        : "Show More"}
                    </button>
                  )}
                </PopoverBody>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
