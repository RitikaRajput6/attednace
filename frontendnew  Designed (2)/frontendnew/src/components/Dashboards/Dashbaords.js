// import React, { useState } from 'react';
// import {
//   CDBSidebar,
//   CDBSidebarContent,
//   CDBSidebarHeader,
//   CDBSidebarMenu,
//   CDBSidebarMenuItem,
//   CDBSidebarFooter,
// } from 'cdbreact';
// import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
// import Header from '../header';
// import AttendanceTable from '../Attendance table/AttendanceTable';
// import DailyReports from '../DilyReports/DailyReports';
// import AttendanceView from "../../screens/attendanceView";
// import CreateProject from '../projectmanagment/CreateProject';
// import Assignment from '../assigntment/Assignment';
// import DashboardCard from "./DashboardCard";

// const Sidebar = () => {
 
//   return (
//     <>
//       <Router>
//         <Header />

//         <div className='container main-dashboard-container'>
//           <div className='row'>
//             <div className='col-12 col-lg-3 col-md-3 col-sm-3'>
//               <CDBSidebar>
//                 <CDBSidebarHeader prefix={<i className="fa fa-bars" />} />
//                 <CDBSidebarContent>
//                   <CDBSidebarMenu>
//                     <NavLink
//                       to="/attendance-table"
//                       activeClassName="active-link"
                     
//                     >
//                       <CDBSidebarMenuItem icon="users">
//                         User Management
//                       </CDBSidebarMenuItem>
//                     </NavLink>

//                     <NavLink
//                       to="/daily-reports"
//                       activeClassName="active-link"
                     
//                     >
//                       <CDBSidebarMenuItem icon="file-alt">
//                         Daily Reports
//                       </CDBSidebarMenuItem>
//                     </NavLink>

//                     <NavLink
//                       to="/create-project"
//                       activeClassName="active-link"
                     
//                     >
//                       <CDBSidebarMenuItem icon="clipboard-list">
//                         Project Management
//                       </CDBSidebarMenuItem>
//                     </NavLink>

//                     <NavLink
//                       to="/assignment"
//                       activeClassName="active-link"
                      
//                     >
//                       <CDBSidebarMenuItem icon="tasks">
//                         Assignment
//                       </CDBSidebarMenuItem>
//                     </NavLink>

//                     <NavLink
//                       to="/attendance-view"
//                       activeClassName="active-link"
                     
//                     >
//                       <CDBSidebarMenuItem icon="user">
//                         Attendance
//                       </CDBSidebarMenuItem>
//                     </NavLink>
//                   </CDBSidebarMenu>
//                 </CDBSidebarContent>
//                 <CDBSidebarFooter style={{ textAlign: 'center' }}>
//                   <div className="sidebar-btn-wrapper" style={{ padding: '20px 5px' }}>
//                     Pro features
//                   </div>
//                 </CDBSidebarFooter>
//               </CDBSidebar>
//             </div>

//             <div className='col-12 col-lg-9 col-md-9 col-sm-9'>
//               <div>
//                 <Switch>
//                   <Route path="/attendance-table">
//                     <AttendanceTable />
//                   </Route>
//                   <Route path="/daily-reports">
//                     <DailyReports />
//                   </Route>
//                   <Route path="/create-project">
//                     <CreateProject />
//                   </Route>
//                   <Route path="/assignment">
//                     <Assignment />
//                   </Route>
//                   <Route path="/attendance-view">
//                     <AttendanceView />
//                   </Route>
//                   <Route path="/">
//                     <DashboardCard
//                       totalRegisters={100} // Example counts
//                       totalAbsent={20}
//                       totalPresent={80}
//                       totalProjects={10}
//                     />
//                   </Route>
//                 </Switch>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Router>
//     </>
//   );
// };

// export default Sidebar;




import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import Header from '../header';
import AttendanceTable from '../Attendance table/AttendanceTable';
import DailyReports from '../DilyReports/DailyReports';
import AttendanceView from "../../screens/attendanceView";
import CreateProject from '../projectmanagment/CreateProject';
import Assignment from '../assigntment/Assignment';
import DashboardCard from "./DashboardCard";

const Sidebar = () => {
 
  return (
    <>
      <Router>
        <Header />

        <div className='container main-dashboard-container'>
          <div className='row'>
            <div className='col-12 col-lg-3 col-md-0 col-sm-0'>
              <CDBSidebar>
                <CDBSidebarHeader prefix={<i className="fa fa-bars" />} />
                <CDBSidebarContent>
                  <CDBSidebarMenu>
                    <NavLink
                      to="/attendance-table"
                      activeClassName="active-link"
                     
                    >
                      <CDBSidebarMenuItem icon="users">
                        User Management
                      </CDBSidebarMenuItem>
                    </NavLink>

                    <NavLink
                      to="/daily-reports"
                      activeClassName="active-link"
                     
                    >
                      <CDBSidebarMenuItem icon="file-alt">
                        Daily Reports
                      </CDBSidebarMenuItem>
                    </NavLink>

                    <NavLink
                      to="/create-project"
                      activeClassName="active-link"
                     
                    >
                      <CDBSidebarMenuItem icon="clipboard-list">
                        Project Management
                      </CDBSidebarMenuItem>
                    </NavLink>

                    <NavLink
                      to="/assignment"
                      activeClassName="active-link"
                      
                    >
                      <CDBSidebarMenuItem icon="tasks">
                        Assignment
                      </CDBSidebarMenuItem>
                    </NavLink>

                    <NavLink
                      to="/attendance-view"
                      activeClassName="active-link"
                     
                    >
                      <CDBSidebarMenuItem icon="user">
                        Attendance
                      </CDBSidebarMenuItem>
                    </NavLink>
                  </CDBSidebarMenu>
                </CDBSidebarContent>
                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                  <div className="sidebar-btn-wrapper" style={{ padding: '20px 5px' }}>
                    Pro features
                  </div>
                </CDBSidebarFooter>
              </CDBSidebar>
            </div>

            <div className='col-12 col-lg-9 col-md-12 col-sm-12'>
              <div>
                <Switch>
                  <Route path="/attendance-table">
                    <AttendanceTable />
                  </Route>
                  <Route path="/daily-reports">
                    <DailyReports />
                  </Route>
                  <Route path="/create-project">
                    <CreateProject />
                  </Route>
                  <Route path="/assignment">
                    <Assignment />
                  </Route>
                  <Route path="/attendance-view">
                    <AttendanceView />
                  </Route>
                  <Route path="/">
                    <DashboardCard
                      totalRegisters={100} // Example counts
                      totalAbsent={20}
                      totalPresent={80}
                      totalProjects={10}
                    />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
};

export default Sidebar;