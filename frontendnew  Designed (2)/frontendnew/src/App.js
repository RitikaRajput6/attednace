// // import React from "react";
// // import HomeView from "../src/screens/homeView";
// // import { BrowserRouter as Router, Route } from "react-router-dom";
// // import { Container } from "react-bootstrap";
// // import Header from "./components/header";
// // import Footer from "./components/footer";
// // import AddStudentView from "./screens/addStudentView";
// // import AnalysisView from "./screens/analysisView";
// // import LoginView from "./screens/Authentication Screens/LoginView";
// // import RegisterView from "./screens/Authentication Screens/RegisterView";
// // import StudentDetailsView from "./screens/studentDetailsView";
// // import AttendanceView from "./screens/attendanceView";
// // import ProfileView from "./screens/profileView";
// // import UserListView from "./screens/userListView";
// // import UserEditView from "./screens/userEditView";
// // import Sidebar from "./components/Dashboards/Dashbaords";

// // const App = () => {
// //   return (
// //     <> 


  
// //     <Router>
      
// //     <Header />
// //       <Sidebar />
   
     
      
        
// //       <main className="py-3">
// //         <Container>
      
// //           <Route path="/user/:userId/edit" component={UserEditView} />
// //           <Route path="/userList" component={UserListView} />
// //           <Route path="/profile" component={ProfileView} />
// //           <Route path="/attendance" component={AttendanceView} />
// //           <Route path="/analysis" component={AnalysisView} />
// //           <Route path="/addStudent" component={AddStudentView} />
// //           <Route path="/student/edit/:id" component={AddStudentView} exact />
// //           <Route path="/student/:id" component={StudentDetailsView} exact />
// //           <Route path="/login" component={LoginView} exact />
// //           <Route path="/register" component={RegisterView} exact />
// //           <Route path="/search/:keyword" component={HomeView} exact />
// //           <Route path="/page/:pageNumber" component={HomeView} exact />
// //           <Route
// //             path="/search/:keyword/page/:pageNumber"
// //             component={HomeView}
// //             exact
// //           />
// //           <Route path="/" component={HomeView} exact />
// //         </Container>
// //       </main>
   
// //       <Footer />
   
// //     </Router>
// //     </>
// //   );
// // };

// // export default App;
// import React from "react";
// import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
// import { Container } from "react-bootstrap";

// import Footer from "./components/footer";
// import AddStudentView from "./screens/addStudentView";
// import AnalysisView from "./screens/analysisView";
// import LoginView from "./screens/Authentication Screens/LoginView";
// import RegisterView from "./screens/Authentication Screens/RegisterView";
// import StudentDetailsView from "./screens/studentDetailsView";
// import AttendanceView from "./screens/attendanceView";
// import ProfileView from "./screens/profileView";
// import UserListView from "./screens/userListView";
// import UserEditView from "./screens/userEditView";
// import Dashboards from "./components/Dashboards/Dashbaords"; // Import your dashboards component
// import AttendanceTable from "./components/Attendance table/AttendanceTable";
// import EmployeeDashboard from "./components/Dashboards/EmployeeDashboard";
// import HrDashboard from "./components/Dashboards/HrDashboard";
// const App = () => {
//   return (
//     <> 
  
 
//       <Router>
      

//         <main className="pb-0 pt-0">
//           <Container>
//             <Route path="/user/:userId/edit" component={UserEditView} />
//             <Route path="/userList" component={UserListView} />
//             <Route path="/profile" component={ProfileView} />
//             <Route path="/attendance" component={AttendanceView} />
//             <Route path="/analysis" component={AnalysisView} />
//             <Route path="/addStudent" component={AddStudentView} />
//             <Route path="/student/edit/:id" component={AddStudentView} exact />
//             <Route path="/student/:id" component={StudentDetailsView} exact />
//             <Route path="/login" component={LoginView} exact />
//             <Route path="/register" component={RegisterView} exact />
//             {/* <Route path="/search/:keyword" component={HomeView} exact /> */}
//             {/* <Route path="/page/:pageNumber" component={HomeView} exact /> */}
//           {/* <Route path="/search/:keyword/page/:pageNumber" component={HomeView} exact />  */}
//           <Route path="/HRDashboard" component={HrDashboard} exact /> 
//           <Route path="/EmployeeDashboard" component={EmployeeDashboard} exact /> 
//       <Route path="/dashboards" component={Dashboards} exact /> 
//             <Redirect from="/" to="/login" exact /> 
//             <Redirect from="*" to="/login" /> 
           
//           </Container>
//         </main>
//         <Footer />
       
//       </Router>
   
//     </>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/footer";
import AddStudentView from "./screens/addStudentView";
import AnalysisView from "./screens/analysisView";
import LoginView from "./screens/Authentication Screens/LoginView";
import RegisterView from "./screens/Authentication Screens/RegisterView";
import StudentDetailsView from "./screens/studentDetailsView";
import AttendanceView from "./screens/attendanceView";
import ProfileView from "./screens/profileView";
import UserListView from "./screens/userListView";
import UserEditView from "./screens/userEditView";
import Dashboards from "./components/Dashboards/Dashbaords";
import AttendanceTable from "./components/Attendance table/AttendanceTable";
import EmployeeDashboard from "./components/Dashboards/EmployeeDashboard";
import HrDashboard from "./components/Dashboards/HrDashboard";

const App = () => {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/user/:userId/edit" component={UserEditView} />
          <Route path="/userList" component={UserListView} />
          <Route path="/profile" component={ProfileView} />
          <Route path="/attendance" component={AttendanceView} />
          <Route path="/analysis" component={AnalysisView} />
          <Route path="/addStudent" component={AddStudentView} />
          <Route path="/student/edit/:id" component={AddStudentView} exact />
          <Route path="/student/:id" component={StudentDetailsView} exact />
          <Route path="/register" component={RegisterView} exact />
          <Route path="/HRDashboard" component={HrDashboard} exact /> 
          <Route path="/EmployeeDashboard" component={EmployeeDashboard} exact /> 
          <Route path="/dashboards" component={Dashboards} exact /> 
          <Route path="/login" component={LoginView} />
          <Redirect exact from="/" to="/login" />
          {/* Redirect any unknown paths to login page */}
          <Redirect to="/login" />
        </Switch>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;


