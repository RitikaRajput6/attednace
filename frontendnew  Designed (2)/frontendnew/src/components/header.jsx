// // import React from "react";
// // import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
// // import { Route } from "react-router-dom";
// // import { LinkContainer } from "react-router-bootstrap";
// // import SearchBox from "./searchBox";
// // import { useDispatch, useSelector } from "react-redux";
// // import { logout } from "../actions/userActions";

// // const Header = ({ history }) => {
// //   const dispatch = useDispatch();
// //   const userLogin = useSelector((state) => state.userLogin);
// //   const { userInfo } = userLogin;

// //   const logoutHandler = () => {
// //     dispatch(logout());
// //     history.push("/login");
// //   };
// //   return (
// //     <header>
// //       <Navbar variant="dark" expand="lg" collapseOnSelect>
// //         <Container>
// //           <LinkContainer to="/">
// //             <Navbar.Brand>Attendance daily Reports</Navbar.Brand>
// //           </LinkContainer>
// //           <Navbar.Toggle aria-controls="basic-navbar-nav" />
// //           <Navbar.Collapse id="basic-navbar-nav">
           
// //             <Nav className="ml-auto">
// //               <NavDropdown title="More">
// //                 <LinkContainer to="/attendance">
// //                   <NavDropdown.Item>Attendance</NavDropdown.Item>
// //                 </LinkContainer>
// //                 <LinkContainer to="/addStudent">
// //                   <NavDropdown.Item>Add Employees</NavDropdown.Item>
// //                 </LinkContainer>
                
// //               </NavDropdown>
// //               {userInfo ? (
// //                 <NavDropdown title={userInfo.name} id="username">
// //                   <LinkContainer to="/profile">
// //                     <NavDropdown.Item>Profile</NavDropdown.Item>
// //                   </LinkContainer>
// //                   {userInfo.isAdmin && (
// //                     <LinkContainer to="/userList">
// //                       <NavDropdown.Item>Users List</NavDropdown.Item>
// //                     </LinkContainer>
// //                   )}
// //                   <NavDropdown.Item onClick={logoutHandler}>
// //                     Logout
// //                   </NavDropdown.Item>
// //                 </NavDropdown>
// //               ) : (
// //                 <LinkContainer to="/">
// //                   <Nav.Link>
// //                     <i className="fas fa-user"></i> Log In
// //                   </Nav.Link>
// //                 </LinkContainer>
// //               )}
// //             </Nav>
// //           </Navbar.Collapse>
// //         </Container>
// //       </Navbar>
// //     </header>
// //   );
// // };

// // export default Header;



// // import React from "react";
// // import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
// // import { Route, useHistory } from "react-router-dom";
// // import { LinkContainer } from "react-router-bootstrap";
// // import SearchBox from "./searchBox";
// // import { useDispatch, useSelector } from "react-redux";
// // import { logout } from "../actions/userActions";
// // import logo from ".././Images/Atappisoft-bg-png.png";

// // const Header = () => {
// //   const dispatch = useDispatch();
// //   const history = useHistory();
// //   const userLogin = useSelector((state) => state.userLogin);
// //   const { userInfo } = userLogin;

// //   const logoutHandler = () => {
// //         dispatch(logout());
// //         history.push("/login");
// //       };

// //   return (
// //     <header>
// //       <Navbar variant="dark" expand="lg" collapseOnSelect>
// //         <Container>
// //           <LinkContainer to="/">
// //           <img src={logo} alt="Logo" className="logo" />
// //             {/* <Navbar.Brand>Attendance daily Reports</Navbar.Brand> */}
// //           </LinkContainer>
// //           <Navbar.Toggle aria-controls="basic-navbar-nav" />
// //           <Navbar.Collapse id="basic-navbar-nav">
// //             <Nav className="ml-auto">
// //               <NavDropdown title="Profile">
// //                 <LinkContainer to="/attendance">
// //                   <NavDropdown.Item></NavDropdown.Item>
// //                 </LinkContainer>
// //                 <LinkContainer to="/addStudent">
// //                   <NavDropdown.Item>  </NavDropdown.Item>
// //                 </LinkContainer>
// //                 {userInfo && (
// //                   <NavDropdown.Item>{userInfo.email}</NavDropdown.Item>
// //                 )}
// //                 <NavDropdown.Item onClick={logoutHandler} className="text-center">
// //                   Log Out
// //                 </NavDropdown.Item>
// //               </NavDropdown>
// //             </Nav>
// //           </Navbar.Collapse>
// //         </Container>
// //       </Navbar>
// //     </header>
// //   );
// // };

// // export default Header;

// import React from "react";
// import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
// import { useHistory } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../actions/userActions"; // Assuming you have this action set up
// import logo from "../Images/Atappisoft-bg-png.png";

// const Header = () => {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const logoutHandler = () => {
//     dispatch(logout()); // Assuming this action clears user data (like token) from Redux store
//     localStorage.clear(); // Clearing localStorage if necessary

//     // Redirect to login page after logout
//     history.push("/login");
//   };

//   return (
//     <header>
//       <Navbar variant="dark" expand="lg" collapseOnSelect>
//         <Container>
//           <LinkContainer to="/">
//             <img src={logo} alt="Logo" className="logo" />
//           </LinkContainer>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ml-auto">
//               <NavDropdown title="Profile">
//                 {/* Your dropdown items */}
//                 {userInfo && <NavDropdown.Item>{userInfo.email}</NavDropdown.Item>}
//                 <NavDropdown.Item onClick={logoutHandler} className="text-center">
//                   Log Out
//                 </NavDropdown.Item>
//               </NavDropdown>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// };

// export default Header;


import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useHistory, NavLink } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import logo from "../Images/ataapisoft-logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const [expanded, setExpanded] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
    setExpanded(false);
  };

  const handleNavLinkClick = () => {
    setExpanded(false);
  };

  return (
    <header>
      <Navbar variant="dark" expand="lg" collapseOnSelect expanded={expanded}>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="Logo" className="logo" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <NavLink to="/attendance-table" activeClassName="active-link" className="nav-link hide-link" onClick={handleNavLinkClick}>
                User Management
              </NavLink>
              <NavLink to="/daily-reports" activeClassName="active-link" className="nav-link hide-link" onClick={handleNavLinkClick}>
                Daily Reports
              </NavLink>
              <NavLink to="/create-project" activeClassName="active-link" className="nav-link hide-link" onClick={handleNavLinkClick}>
                Project Management
              </NavLink>
              <NavLink to="/assignment" activeClassName="active-link d-block" className="nav-link hide-link" onClick={handleNavLinkClick}>
                Assignment
              </NavLink>
              <NavLink to="/attendance-view" activeClassName="active-link d-block" className="nav-link hide-link" onClick={handleNavLinkClick}>
                Attendance
              </NavLink>

              <NavDropdown title="Profile" id="profile-dropdown">
                {userInfo && (
                  <NavDropdown.Item>{userInfo.email}</NavDropdown.Item>
                )}
                <div className="dropdown-triangle">
                  <NavDropdown.Item onClick={logoutHandler} className="text-center">
                    <span className="log-out">Log Out</span>
                  </NavDropdown.Item>
                </div>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

