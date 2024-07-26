

// import React from 'react';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   NavLink
// } from 'react-router-dom';
// import {
//   CDBSidebar,
//   CDBSidebarContent,
//   CDBSidebarHeader,
//   CDBSidebarMenu,
//   CDBSidebarMenuItem,
//   CDBSidebarFooter,
// } from 'cdbreact';
// import Header from '../header';
// import DailyReports from '../DilyReports/DailyReports';
// import AttendanceView from '../../screens/attendanceView';
// import Assignment from '../assigntment/Assignment';
// // import EmployeeCards from "./EmployeeCards";
// const EmployeeDashboard = () => {

 


//   return (
//     <Router>
//       <>
//         <Header />
//         <div className='row main-dashboard-container'> 
//           <div className='col-12 col-lg-3 col-md-3 col-sm-3'>
//             <CDBSidebar>
//               <CDBSidebarHeader prefix={<i className="fa fa-bars" />} />
//               <CDBSidebarContent>
//                 <CDBSidebarMenu>
//                   <NavLink to="/daily-reports" activeClassName="active-link">
//                     <CDBSidebarMenuItem icon="file-alt">
//                       Daily Reports
//                     </CDBSidebarMenuItem>
//                   </NavLink>
//                   <NavLink to="/daily-attendance" activeClassName="active-link">
//                     <CDBSidebarMenuItem icon="user">
//                       Daily Attendance
//                     </CDBSidebarMenuItem>
//                   </NavLink>
//                   <NavLink to="/assignment" activeClassName="active-link">
//                     <CDBSidebarMenuItem icon="tasks">
//                       Assignment
//                     </CDBSidebarMenuItem>
//                   </NavLink>
//                 </CDBSidebarMenu>
//               </CDBSidebarContent>
//               <CDBSidebarFooter style={{ textAlign: 'center' }}>
//                 <div className="sidebar-btn-wrapper" style={{ padding: '20px 5px' }}>
//                   Pro features
//                 </div>
//               </CDBSidebarFooter>
//             </CDBSidebar>
//           </div>
//           <div className='col-12 col-lg-9 col-md-9 col-sm-9'>
//             <Switch>
//               <Route path="/daily-reports">
//                 <DailyReports />
//               </Route>
//               <Route path="/daily-attendance">
//                 <AttendanceView />
//               </Route>
//               <Route path="/Assignment">
//                 <Assignment />
//               </Route>
//               {/* <Route path="/">
//                     <EmployeeCards
//                       totalRegisters={100} // Example counts
//                       totalAbsent={20}
//                       totalPresent={80}
//                       totalProjects={10}
//                     />
//                   </Route> */}
//             </Switch>
//           </div>
//         </div>
//       </>
//     </Router>
//   );
// };

// export default EmployeeDashboard;




import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';
import Header from '../header';
import DailyReports from '../DilyReports/DailyReports';
import Attendanceemp from '../Attendanceemp';
import Assignment from '../assigntment/Assignment';
import EmployeeCards from "../Employeecards/EmployeeCards";
const EmployeeDashboard = () => {

 


  return (
    <Router>
      <>
        <Header />
        <div className='container main-dashboard-container'>
            <div className='row'>
              <div className='col-12 col-lg-3 col-md-0 col-sm-0'>
                <CDBSidebar>
                  <CDBSidebarHeader prefix={<i className="fa fa-bars" />} />
                  <CDBSidebarContent>
                    <CDBSidebarMenu>
                      <NavLink to="/daily-reports" activeClassName="active-link">
                        <CDBSidebarMenuItem icon="file-alt">
                          Daily Reports
                        </CDBSidebarMenuItem>
                      </NavLink>
                      <NavLink to="/daily-attendance" activeClassName="active-link">
                        <CDBSidebarMenuItem icon="user">
                          Daily Attendance
                        </CDBSidebarMenuItem>
                      </NavLink>
                      <NavLink to="/assignment" activeClassName="active-link">
                        <CDBSidebarMenuItem icon="tasks">
                          Assignment
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
                <Switch>
                  <Route path="/daily-reports">
                    <DailyReports />
                  </Route>
                  <Route path="/daily-attendance">
                    <Attendanceemp />
                  </Route>
                  <Route path="/Assignment">
                    <Assignment />
                  </Route>
                  <Route path="/">
                        <EmployeeCards
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
      </>
    </Router>
  );
};

export default EmployeeDashboard;

