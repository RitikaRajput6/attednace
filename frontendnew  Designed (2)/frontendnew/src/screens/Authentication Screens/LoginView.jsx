
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useHistory, useLocation } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.css';



// function LoginView() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const history = useHistory();
 

 
//   const handleLogin = async () => {
//     const REACT = process.env.REACT_APP_API_URL;
//     try {
//       const response = await axios.post(REACT, {
//         email,
//         password
//       });

//       localStorage.setItem("token", response.data.Token);
//       localStorage.setItem("Role", response.data.Role);
//       localStorage.setItem("UserId", response.data.UserId);

//       switch (response.data.Role) {
//         case 'Admin':
//           history.push('/dashboards?login=true');
//           break;
//         case 'HR':
//           history.push('/HRDashboard?login=true');
//           break;
//         case 'Employee':
//           history.push('/EmployeeDashboard?login=true');
//           break;
//         default:
//           Swal.fire({
//             icon: 'error',
//             title: 'Unknown user role',
//             text: 'Please contact support for assistance.',
//             position: 'top-end',
//             showConfirmButton: false,
//             timer: 1000,
//             customClass: {
//               popup: 'padded-swal' // Custom class for styling
//             }
//           });
//           break;
//       }
//       Swal.fire({
//         icon: 'success',
//         title: 'Login Successful',
//         position: 'top-end',
//         showConfirmButton: false,
//         timer: 1000,
//         customClass: {
//           popup: 'padded-swal' // Custom class for styling
//         }
//       });

//       console.log(response.data);
//     } catch (error) {
//       console.error('Error:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Login Error',
//         text: 'An error occurred. Please try again later.',
//         position: 'top-end',
//         showConfirmButton: false,
//         timer: 1000,
//         customClass: {
//           popup: 'padded-swal' // Custom class for styling
//         }
//       });
//     }
//   };
  
//   const isLoggedIn = !!localStorage.getItem('token');
//   return (
//     <section className="gradient-custom">
//       <div className="container py-5 h-100">
//         <div className="row d-flex justify-content-center align-items-center h-100">
//           <div className="col-12 col-md-8 col-lg-6 col-xl-5">
//             <div className="login-page card text-white" style={{ borderRadius: '1rem' }}>
//               <div className="card-body p-5 text-center">
//                 <div className="mt-0 pb-0 mb-0">
//                   <h2 className="text-center">Login</h2>
//                   <p className="p-heading mb-0">Please enter your email and password!</p>
//                   <div className="form-outline form-white mb-4">
//                     <input
//                       type="text"
//                       id="email"
//                       className="form-control form-control-lg"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="Email"
//                     />
//                   </div>
//                   <div className="form-outline form-white mb-4">
//                     <input
//                       type="password"
//                       id="password"
//                       className="form-control form-control-lg"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Password"
//                     />
//                   </div>
//                   <div className='login-page-btn text-center'>
//                     <button className="btn btn-outline-light btn-lg px-5 mb-0" type="button" onClick={handleLogin}>
//                       Login
//                     </button>
//                   </div>
//                   <div className="d-flex justify-content-center text-center mt-4 pt-1">
//                     <a href="#!" className="text-white">
//                       <i className="fab fa-facebook-f fa-lg" />
//                     </a>
//                     <a href="#!" className="text-white">
//                       <i className="fab fa-twitter fa-lg mx-3 px-2" />
//                     </a>
//                     <a href="#!" className="text-white">
//                       <i className="fab fa-google fa-lg" />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default LoginView;





// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.css';

// function LoginView() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
//   const history = useHistory();
//   const handleLogin = async () => {
//     const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

//     if (!email) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Validation Error',
//         text: 'Please fill in your email.',
//         position: 'top-end',
//         showConfirmButton: false,
//         timer: 3000,
//         customClass: {
//           popup: 'padded-swal' // Custom class for styling
//         }
//       });
//       return;
//     }

//     if (!password) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Validation Error',
//         text: 'Please fill in your password.',
//         position: 'top-end',
//         showConfirmButton: false,
//         timer: 3000,
//         customClass: {
//           popup: 'padded-swal' // Custom class for styling
//         }
//       });
//       return;
//     }

//     try {
//       const response = await axios.post(REACT_APP_API_URL, {
//         email,
//         password
//       });

//       localStorage.setItem('token', response.data.Token);
//       localStorage.setItem('Role', response.data.Role);
//       localStorage.setItem('UserId', response.data.UserId);

//       setIsLoggedIn(true); // Set login status to true

//       switch (response.data.Role) {
//         case 'Admin':
//           history.push('/dashboards?login=true');
//           break;
//         case 'HR':
//           history.push('/HRDashboard?login=true');
//           break;
//         case 'Employee':
//           history.push('/EmployeeDashboard?login=true');
//           break;
//         default:
//           Swal.fire({
//             icon: 'error',
//             title: 'Unknown user role',
//             text: 'Please contact support for assistance.',
//             position: 'top-end',
//             showConfirmButton: false,
//             timer: 3000,
//             customClass: {
//               popup: 'padded-swal' // Custom class for styling
//             }
//           });
//           break;
//       }
//       Swal.fire({
//         icon: 'success',
//         title: 'Login Successful',
//         position: 'top-end',
//         showConfirmButton: false,
//         timer: 3000,
//         customClass: {
//           popup: 'padded-swal' // Custom class for styling
//         }
//       });

//       console.log(response.data);
//     } catch (error) {
//       console.error('Error:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Login Error',
//         text: 'An error occurred. Please try again later.',
//         position: 'top-end',
//         showConfirmButton: false,
//         timer: 3000,
//         customClass: {
//           popup: 'padded-swal' // Custom class for styling
//         }
//       });
//     }
//   };

//   // If logged in, do not render the login form
//   if (isLoggedIn) {
//     return null;
//   }

//   return (
//     <section className="gradient-custom">
//       <div className="container py-5 h-100">
//         <div className="row d-flex justify-content-center align-items-center h-100">
//           <div className="col-12 col-md-8 col-lg-6 col-xl-5">
//             <div className="login-page card text-white" style={{ borderRadius: '1rem' }}>
//               <div className="card-body p-5 text-center">
//                 <div className="mt-0 pb-0 mb-0">
//                   <h2 className="text-center">Login</h2>
//                   <p className="p-heading mb-0">Please enter your email and password!</p>
//                   <div className="form-outline form-white mb-4">
//                     <input
//                       type="text"
//                       id="email"
//                       className="form-control form-control-lg"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="Email"
//                     />
//                   </div>
//                   <div className="form-outline form-white mb-4">
//                     <input
//                       type="password"
//                       id="password"
//                       className="form-control form-control-lg"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Password"
//                     />
//                   </div>
//                   <div className='login-page-btn text-center'>
//                     <button className="btn btn-outline-light btn-lg px-5 mb-0" type="button" onClick={handleLogin}>
//                       Login
//                     </button>
//                   </div>
//                   <div className="d-flex justify-content-center text-center mt-4 pt-1">
//                     <a href="#!" className="text-white">
//                       <i className="fab fa-facebook-f fa-lg" />
//                     </a>
//                     <a href="#!" className="text-white">
//                       <i className="fab fa-twitter fa-lg mx-3 px-2" />
//                     </a>
//                     <a href="#!" className="text-white">
//                       <i className="fab fa-google fa-lg" />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default LoginView;






import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const history = useHistory();
  const handleLogin = async () => {
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in your email.',
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        customClass: {
          popup: 'padded-swal' // Custom class for styling
        }
      });
      return;
    }

    if (!password) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in your password.',
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        customClass: {
          popup: 'padded-swal' // Custom class for styling
        }
      });
      return;
    }

    try {
      const response = await axios.post(REACT_APP_API_URL, {
        email,
        password
      });

      localStorage.setItem('token', response.data.Token);
      localStorage.setItem('Role', response.data.Role);
      localStorage.setItem('UserId', response.data.UserId);

      setIsLoggedIn(true); // Set login status to true

      switch (response.data.Role) {
        case 'Admin':
          history.push('/dashboards?login=true');
          break;
        case 'HR':
          history.push('/HRDashboard?login=true');
          break;
        case 'Employee':
          history.push('/EmployeeDashboard?login=true');
          break;
        default:
          Swal.fire({
            icon: 'error',
            title: 'Unknown user role',
            text: 'Please contact support for assistance.',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            customClass: {
              popup: 'padded-swal' // Custom class for styling
            }
          });
          break;
      }
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          popup: 'padded-swal' // Custom class for styling
        }
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: 'An error occurred. Please try again later.',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          popup: 'padded-swal' // Custom class for styling
        }
      });
    }
  };

  // If logged in, do not render the login form
  if (isLoggedIn) {
    return null;
  }

  return (
    <section className="gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="login-page card text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-3 p-lg-5 text-center">
                <div className="mt-0 pb-0 mb-0">
                  <h2 className="text-center">Login</h2>
                  <p className="p-heading mb-0">Please enter your email and password!</p>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="email"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </div>
                  <div className='login-page-btn text-center'>
                    <button className="btn btn-outline-light btn-lg px-5 mb-0" type="button" onClick={handleLogin}>
                      Login
                    </button>
                  </div>
                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white">
                      <i className="fab fa-facebook-f fa-lg" />
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-twitter fa-lg mx-3 px-2" />
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-google fa-lg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginView;

