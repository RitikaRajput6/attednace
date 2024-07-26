
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import Button from '@atlaskit/button';
// import 'sweetalert2/dist/sweetalert2.css';

// function Attendanceemp() {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [detailedAttendance, setDetailedAttendance] = useState([]);
//   const [userId, setUserId] = useState('');
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [showDetailedAttendance, setShowDetailedAttendance] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null); // State to store selected date

//   useEffect(() => {
//     fetchAttendanceData();
//   }, []);

//   const fetchAttendanceData = async () => {
//     try {
//       if (!token) {
//         throw new Error('No token found, user is not authenticated');
//       }

//       const response = await axios.get('https://localhost:44380/api/Attendance/GetAllAttendanceDetailsByUserId', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (!response.data) {
//         throw new Error('Failed to fetch attendance data');
//       }

//       setAttendanceData(response.data);
//     } catch (error) {
//       console.error('Error fetching attendance data:', error);
//     }
//   };

//   const fetchDetailedAttendance = async (userId, date) => {
//     try {
//       if (!token) {
//         throw new Error('No token found, user is not authenticated');
//       }

//       const response = await axios.get(`https://localhost:44380/api/Attendance/GetAllAttendanceByUserId?userId=${userId}&date=${date}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (!response.data) {
//         throw new Error('Failed to fetch detailed attendance data');
//       }

//       // Filter detailed attendance data by selected date
//       const filteredData = response.data.filter(item => item.Date === date);
//       setDetailedAttendance(filteredData);
//       setShowDetailedAttendance(true);
//       setSelectedDate(date); // Store selected date
//     } catch (error) {
//       console.error('Error fetching detailed attendance data:', error);
//     }
//   };

//   const formatTime = (timeString) => {
//     if (!timeString) return ''; // Handle cases where timeString is null or undefined
//     const [hours, minutes] = timeString.split(':');
//     let formattedTime = '';
//     let hours12 = parseInt(hours, 10);
//     const ampm = hours12 >= 12 ? 'PM' : 'AM';
//     hours12 = hours12 % 12;
//     hours12 = hours12 ? hours12 : 12; // Handle midnight (00:xx) as 12 AM
//     formattedTime = `${hours12}:${minutes} ${ampm}`;
//     return formattedTime;
//   };

//   const calculateHoursAndMinutes = (timeString) => {
//     if (!timeString) return { hours: 0, minutes: 0 };
//     const [hours, minutes] = timeString.split(':');
//     return { hours: parseInt(hours, 10), minutes: parseInt(minutes, 10) };
//   };

//   const handleInTimeSubmit = async () => {
//     const inTime = formatTime();

//     if (!token) {
//       console.error('Authorization token is missing.');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'https://localhost:44380/api/Attendance/markInTime',
//         { userId: userId, inTime: inTime },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       if (response.status === 200 && response.data === 'InTime marked successfully') {
//         fetchAttendanceData();
//         setAttendanceData(prevAttendanceData => {
//           const newAttendanceRecord = {
//             date: new Date().toISOString().split('T')[0],
//             inTime: inTime,
//             outTime: "",
//             workingHours: ""
//           };
//           return [...prevAttendanceData, newAttendanceRecord];
//         });

//         Swal.fire({
//           icon: 'success',
//           title: 'In-time Marked Successfully!',
//           showConfirmButton: false,
//           timer: 1500
//         });
//       } else {
//         console.error('Failed to mark in-time or unexpected response:', response.data);
//         Swal.fire({
//           icon: 'error',
//           title: 'Failed to Mark In-time',
//           text: 'Please try again later.'
//         });
//       }
//     } catch (error) {
//       console.error('Error marking in-time:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error!',
//         text: 'Mark out time first.'
//       });
//     }
//   };

//   const handleOutTimeSubmit = async () => {
//     const outTime = formatTime();

//     if (!token) {
//       console.error('Authorization token is missing.');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'https://localhost:44380/api/Attendance/markOutTime',
//         { userId: userId, outTime: outTime },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       if (response.status === 200 && response.data === 'OutTime marked successfully') {
//         fetchAttendanceData();
//         setAttendanceData(prevAttendanceData => {
//           return prevAttendanceData.map(record => {
//             if (record.date === new Date().toISOString().split('T')[0] && record.outTime === "") {
//               const workingHours = calculateHoursAndMinutes(record.inTime, outTime); // Update working hours
//               return {
//                 ...record,
//                 outTime: outTime,
//                 workingHours: workingHours
//               };
//             }
//             return record;
//           });
//         });

//         Swal.fire({
//           icon: 'success',
//           title: 'Out-time Marked Successfully!',
//           showConfirmButton: false,
//           timer: 1500
//         });
//       } else {
//         console.error('Failed to mark out-time or unexpected response:', response.data);
//         Swal.fire({
//           icon: 'error',
//           title: 'Failed to Mark Out-time',
//           text: 'Please try again later.'
//         });
//       }
//     } catch (error) {
//       console.error('Error marking out-time:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error!',
//         text: 'Please mark in-time first.'
//       });
//     }
//   };

//   const handleViewAll = (userId, date) => {
//     if (!userId || !date) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Please select a user and date first.'
//       });
//       return;
//     }

//     fetchDetailedAttendance(userId, date);
//   };

//   const handleBack = () => {
//     setShowDetailedAttendance(false);
//     setSelectedDate(null); // Clear selected date when going back
//   };

//   return (
//     <div className="App">
//       <h2 className="my-4">Attendance Data</h2>
//       <div>
//         <Button appearance="primary" onClick={handleInTimeSubmit}>In</Button>
//         <Button appearance="primary" onClick={handleOutTimeSubmit}>Out</Button>
//       </div>

//       {showDetailedAttendance ? (
//         <div>
//           <table className="table table-striped table-bordered">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>In Time</th>
//                 <th>Out Time</th>
//                 <th>Working Hours</th>
//               </tr>
//             </thead>
//             <tbody>
//               {detailedAttendance.map(detail => (
//                 <tr key={detail.Id}>
//                   <td>{new Date(detail.Date).toLocaleDateString()}</td>
//                   <td>{formatTime(detail.InTime)}</td>
//                   <td>{formatTime(detail.OutTime)}</td>
//                   <td>{`${calculateHoursAndMinutes(detail.WorkingHours).hours} hr ${calculateHoursAndMinutes(detail.WorkingHours).minutes} min`}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button className="btn btn-secondary" onClick={handleBack}>Back</button>
//         </div>
//       ) : (
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Date</th>
      
//               <th>Working Hours</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attendanceData.map((record, index) => (
//               <tr key={index}>
//                 <td>{new Date(record.Date).toLocaleDateString()}</td>
           
//                 <td>{`${calculateHoursAndMinutes(record.WorkingHours).hours} hr ${calculateHoursAndMinutes(record.WorkingHours).minutes} min`}</td>
//                 <td>
//                   <Button appearance="primary" onClick={() => handleViewAll(record.UserId, record.Date)}>View All</Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default Attendanceemp;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import Button from '@atlaskit/button';
// import 'sweetalert2/dist/sweetalert2.css';

// function Attendanceemp() {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [detailedAttendance, setDetailedAttendance] = useState([]);
//   const [userId, setUserId] = useState('');
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [showDetailedAttendance, setShowDetailedAttendance] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null); // State to store selected date

//   useEffect(() => {
//     fetchAttendanceData();
//   }, []);

//   const fetchAttendanceData = async () => {
//     try {
//       if (!token) {
//         throw new Error('No token found, user is not authenticated');
//       }

//       const response = await axios.get('https://localhost:44380/api/Attendance/GetAllAttendanceDetailsByUserId', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (!response.data) {
//         throw new Error('Failed to fetch attendance data');
//       }

//       setAttendanceData(response.data);
//     } catch (error) {
//       console.error('Error fetching attendance data:', error);
//     }
//   };

//   const fetchDetailedAttendance = async (userId, date) => {
//     try {
//       if (!token) {
//         throw new Error('No token found, user is not authenticated');
//       }

//       const response = await axios.get(`https://localhost:44380/api/Attendance/GetAllAttendanceByUserId?userId=${userId}&date=${date}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (!response.data) {
//         throw new Error('Failed to fetch detailed attendance data');
//       }

//       // Filter detailed attendance data by selected date
//       const filteredData = response.data.filter(item => item.Date === date);
//       setDetailedAttendance(filteredData);
//       setShowDetailedAttendance(true);
//       setSelectedDate(date); // Store selected date
//     } catch (error) {
//       console.error('Error fetching detailed attendance data:', error);
//     }
//   };

//   const formatTime = (timeString) => {
//     if (!timeString) return ''; // Handle cases where timeString is null or undefined
//     const [hours, minutes] = timeString.split(':');
//     let formattedTime = '';
//     let hours12 = parseInt(hours, 10);
//     const ampm = hours12 >= 12 ? 'PM' : 'AM';
//     hours12 = hours12 % 12;
//     hours12 = hours12 ? hours12 : 12; // Handle midnight (00:xx) as 12 AM
//     formattedTime = `${hours12}:${minutes} ${ampm}`;
//     return formattedTime;
//   };

//   const calculateHoursAndMinutes = (timeString) => {
//     if (!timeString) return { hours: 0, minutes: 0 };
//     const [hours, minutes] = timeString.split(':');
//     return { hours: parseInt(hours, 10), minutes: parseInt(minutes, 10) };
//   };

//   const handleInTimeSubmit = async () => {
//     const inTime = formatTime();

//     if (!token) {
//       console.error('Authorization token is missing.');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'https://localhost:44380/api/Attendance/markInTime',
//         { userId: userId, inTime: inTime },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       if (response.status === 200 && response.data === 'InTime marked successfully') {
//         fetchAttendanceData();
//         setAttendanceData(prevAttendanceData => {
//           const newAttendanceRecord = {
//             date: new Date().toISOString().split('T')[0],
//             inTime: inTime,
//             outTime: "",
//             workingHours: ""
//           };
//           return [...prevAttendanceData, newAttendanceRecord];
//         });

//         Swal.fire({
//           icon: 'success',
//           title: 'In-time Marked Successfully!',
//           showConfirmButton: false,
//           timer: 1500
//         });
//       } else {
//         console.error('Failed to mark in-time or unexpected response:', response.data);
//         Swal.fire({
//           icon: 'error',
//           title: 'Failed to Mark In-time',
//           text: 'Please try again later.'
//         });
//       }
//     } catch (error) {
//       console.error('Error marking in-time:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error!',
//         text: 'Mark out time first.'
//       });
//     }
//   };

//   const handleOutTimeSubmit = async () => {
//     const outTime = formatTime();

//     if (!token) {
//       console.error('Authorization token is missing.');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'https://localhost:44380/api/Attendance/markOutTime',
//         { userId: userId, outTime: outTime },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       if (response.status === 200 && response.data === 'OutTime marked successfully') {
//         fetchAttendanceData();
//         setAttendanceData(prevAttendanceData => {
//           return prevAttendanceData.map(record => {
//             if (record.date === new Date().toISOString().split('T')[0] && record.outTime === "") {
//               const workingHours = calculateHoursAndMinutes(record.inTime, outTime); // Update working hours
//               return {
//                 ...record,
//                 outTime: outTime,
//                 workingHours: workingHours
//               };
//             }
//             return record;
//           });
//         });

//         Swal.fire({
//           icon: 'success',
//           title: 'Out-time Marked Successfully!',
//           showConfirmButton: false,
//           timer: 1500
//         });
//       } else {
//         console.error('Failed to mark out-time or unexpected response:', response.data);
//         Swal.fire({
//           icon: 'error',
//           title: 'Failed to Mark Out-time',
//           text: 'Please try again later.'
//         });
//       }
//     } catch (error) {
//       console.error('Error marking out-time:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error!',
//         text: 'Please mark in-time first.'
//       });
//     }
//   };

//   const handleViewAll = (userId, date) => {
//     if (!userId || !date) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Please select a user and date first.'
//       });
//       return;
//     }

//     fetchDetailedAttendance(userId, date);
//   };

//   const handleBack = () => {
//     setShowDetailedAttendance(false);
//     setSelectedDate(null); // Clear selected date when going back
//   };

//   return (
//     <div className="App">
//       <h2 className="my-4">Attendance Data</h2>
//       {!showDetailedAttendance && (
//         <div>
//           <Button appearance="primary" onClick={handleInTimeSubmit}>In</Button>
//           <Button appearance="primary" onClick={handleOutTimeSubmit}>Out</Button>
//         </div>
//       )}

//       {showDetailedAttendance ? (
//         <div>
//           <table className="table table-striped table-bordered">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>In Time</th>
//                 <th>Out Time</th>
//                 <th>Working Hours</th>
//               </tr>
//             </thead>
//             <tbody>
//               {detailedAttendance.map(detail => (
//                 <tr key={detail.Id}>
//                   <td>{new Date(detail.Date).toLocaleDateString()}</td>
//                   <td>{formatTime(detail.InTime)}</td>
//                   <td>{formatTime(detail.OutTime)}</td>
//                   <td>{`${calculateHoursAndMinutes(detail.WorkingHours).hours} hr ${calculateHoursAndMinutes(detail.WorkingHours).minutes} min`}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button className="btn btn-secondary" onClick={handleBack}>Back</button>
//         </div>
//       ) : (
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Working Hours</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attendanceData.map((record, index) => (
//               <tr key={index}>
//                 <td>{new Date(record.Date).toLocaleDateString()}</td>
//                 <td>{`${calculateHoursAndMinutes(record.WorkingHours).hours} hr ${calculateHoursAndMinutes(record.WorkingHours).minutes} min`}</td>
//                 <td>
//                   <Button appearance="primary" onClick={() => handleViewAll(record.UserId, record.Date)}>View All</Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default Attendanceemp;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from '@atlaskit/button';
import 'sweetalert2/dist/sweetalert2.css';

function Attendanceemp() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [detailedAttendance, setDetailedAttendance] = useState([]);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showDetailedAttendance, setShowDetailedAttendance] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // State to store selected date

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      if (!token) {
        throw new Error('No token found, user is not authenticated');
      }

      const response = await axios.get('https://localhost:44380/api/Attendance/GetAllAttendanceDetailsByUserId', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.data) {
        throw new Error('Failed to fetch attendance data');
      }

      // Reverse the order of attendanceData to display latest first
      setAttendanceData(response.data.reverse());
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const fetchDetailedAttendance = async (userId, date) => {
    try {
      if (!token) {
        throw new Error('No token found, user is not authenticated');
      }

      const response = await axios.get(`https://localhost:44380/api/Attendance/GetAllAttendanceByUserId?userId=${userId}&date=${date}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.data) {
        throw new Error('Failed to fetch detailed attendance data');
      }

      // Filter detailed attendance data by selected date
      const filteredData = response.data.filter(item => item.Date === date);
      setDetailedAttendance(filteredData);
      setShowDetailedAttendance(true);
      setSelectedDate(date); // Store selected date
    } catch (error) {
      console.error('Error fetching detailed attendance data:', error);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return ''; // Handle cases where timeString is null or undefined
    const [hours, minutes] = timeString.split(':');
    let formattedTime = '';
    let hours12 = parseInt(hours, 10);
    const ampm = hours12 >= 12 ? 'PM' : 'AM';
    hours12 = hours12 % 12;
    hours12 = hours12 ? hours12 : 12; // Handle midnight (00:xx) as 12 AM
    formattedTime = `${hours12}:${minutes} ${ampm}`;
    return formattedTime;
  };

  const calculateHoursAndMinutes = (timeString) => {
    if (!timeString) return { hours: 0, minutes: 0 };
    const [hours, minutes] = timeString.split(':');
    return { hours: parseInt(hours, 10), minutes: parseInt(minutes, 10) };
  };

  const handleInTimeSubmit = async () => {
    const inTime = formatTime();

    if (!token) {
      console.error('Authorization token is missing.');
      return;
    }

    try {
      const response = await axios.post(
        'https://localhost:44380/api/Attendance/markInTime',
        { userId: userId, inTime: inTime },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200 && response.data === 'InTime marked successfully') {
        fetchAttendanceData();
        setAttendanceData(prevAttendanceData => {
          const newAttendanceRecord = {
            date: new Date().toISOString().split('T')[0],
            inTime: inTime,
            outTime: "",
            workingHours: ""
          };
          return [newAttendanceRecord, ...prevAttendanceData]; // Add new record to the beginning
        });

        Swal.fire({
          icon: 'success',
          title: 'In-time Marked Successfully!',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        console.error('Failed to mark in-time or unexpected response:', response.data);
        Swal.fire({
          icon: 'error',
          title: 'Failed to Mark In-time',
          text: 'Please try again later.'
        });
      }
    } catch (error) {
      console.error('Error marking in-time:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Mark out time first.'
      });
    }
  };

  const handleOutTimeSubmit = async () => {
    const outTime = formatTime();

    if (!token) {
      console.error('Authorization token is missing.');
      return;
    }

    try {
      const response = await axios.post(
        'https://localhost:44380/api/Attendance/markOutTime',
        { userId: userId, outTime: outTime },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200 && response.data === 'OutTime marked successfully') {
        fetchAttendanceData();
        setAttendanceData(prevAttendanceData => {
          return prevAttendanceData.map(record => {
            if (record.date === new Date().toISOString().split('T')[0] && record.outTime === "") {
              const workingHours = calculateHoursAndMinutes(record.inTime, outTime); // Update working hours
              return {
                ...record,
                outTime: outTime,
                workingHours: workingHours
              };
            }
            return record;
          });
        });

        Swal.fire({
          icon: 'success',
          title: 'Out-time Marked Successfully!',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        console.error('Failed to mark out-time or unexpected response:', response.data);
        Swal.fire({
          icon: 'error',
          title: 'Failed to Mark Out-time',
          text: 'Please try again later.'
        });
      }
    } catch (error) {
      console.error('Error marking out-time:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Please mark in-time first.'
      });
    }
  };

  const handleViewAll = (userId, date) => {
    if (!userId || !date) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select a user and date first.'
      });
      return;
    }

    fetchDetailedAttendance(userId, date);
  };

  const handleBack = () => {
    setShowDetailedAttendance(false);
    setSelectedDate(null); // Clear selected date when going back
  };

  return (
    <div className='attendance-dashboard'>
      <div className='table-container'>
        <div className="App">
          <h2 class="table-heading mb-3">Attendance Data</h2>
          {!showDetailedAttendance && (
            <div class="row">
              <div class="col-12 col-lg-12 d-flex Take-attendance">
                <div class="attendence-btn pt-0 d-flex gap-3 mb-4">
                <Button appearance="primary" className='in-btn btn btn-primary' onClick={handleInTimeSubmit}>In</Button>
                <Button appearance="primary" className='out-btn btn btn-primary' onClick={handleOutTimeSubmit}>Out</Button>
                </div>
                </div>
              </div>
          )}

          {showDetailedAttendance ? (
            <div>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>In Time</th>
                    <th>Out Time</th>
                    <th>Working Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedAttendance.map(detail => (
                    <tr key={detail.Id}>
                      <td>{new Date(detail.Date).toLocaleDateString()}</td>
                      <td>{formatTime(detail.InTime)}</td>
                      <td>{formatTime(detail.OutTime)}</td>
                      <td>{`${calculateHoursAndMinutes(detail.WorkingHours).hours} hr ${calculateHoursAndMinutes(detail.WorkingHours).minutes} min`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="btn comman-btn brown-color mt-3" onClick={handleBack}>Back</button>
            </div>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Working Hours</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((record, index) => (
                  <tr key={index}>
                    <td>{new Date(record.Date).toLocaleDateString()}</td>
                    <td>{`${calculateHoursAndMinutes(record.WorkingHours).hours} hr ${calculateHoursAndMinutes(record.WorkingHours).minutes} min`}</td>
                    <td>
                      <Button appearance="primary" onClick={() => handleViewAll(record.UserId, record.Date)}>View All</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Attendanceemp;
