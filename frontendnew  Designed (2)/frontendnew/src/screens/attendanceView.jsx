import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import InOutTable from "../components/InOutTable/InOutTable";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


// your existing code...

const formatCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
  const microseconds = (now.getTime() % 1000).toString().padStart(7, '0').slice(3);
  return `${hours}:${minutes}:${seconds}.${milliseconds}${microseconds}`;
};

const calculateWorkingHours = (inTime, outTime) => {
  const [inHours, inMinutes, inSeconds] = inTime.split(':');
  const [outHours, outMinutes, outSeconds] = outTime.split(':');
 

  const inDate = new Date();
  const outDate = new Date();

  inDate.setHours(inHours, inMinutes, inSeconds);
  outDate.setHours(outHours, outMinutes, outSeconds);

  const diffMs = outDate - inDate;
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffMins = Math.floor((diffMs % 3600000) / 60000);
  const diffSecs = Math.floor((diffMs % 60000) / 1000);

  return `${String(diffHrs).padStart(2, '0')}:${String(diffMins).padStart(2, '0')}:${String(diffSecs).padStart(2, '0')}`;
};


const AttendanceView = (reports) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
 
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("UserId");
    setToken(storedToken);
    setUserId(storedUserId);
    console.log("Retrieved token from localStorage:", storedToken);
    console.log("Retrieved userId from localStorage:", storedUserId);
  
    // Fetch attendance data from the API only for employee acess
    if (storedToken && storedUserId) {
      axios.get('https://localhost:44380/api/Attendance/GetAllAttendances', {
        headers: {
          'Authorization': `Bearer ${storedToken}`
        }
      })
      .then(response => {
        console.log("API Response:", response);
        setAttendanceData(response.data);
      })
      .catch(error => {
        console.error("Error fetching attendance data:", error);
      });
    }
  }, []);



  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("UserId");
    setToken(storedToken);
    setUserId(storedUserId);
    console.log("Retrieved token from localStorage:", storedToken);
    console.log("Retrieved userId from localStorage:", storedUserId);
  
    // Fetch attendance data from the API
    if (storedToken && storedUserId) {
      axios.get('https://localhost:44380/api/Attendance/GetAllAttendances', {
        headers: {
          'Authorization': `Bearer ${storedToken}`
        }
      })
      .then(response => {
        console.log("API Response:", response);
        setAttendanceData(response.data);
      })
      .catch(error => {
        console.error("Error fetching attendance data:", error);
      });
    }
  }, []);


  // Function to handle downloading Excel file
  const handleDownloadExcel = async () => {
    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }
  
    try {
      const response = await axios.get('https://localhost:44380/api/Attendance/DownloadExcelForAll', {
        responseType: 'blob', // Ensure response type is set to blob
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      // Check if the response is valid and contains data
      if (response.status === 200 && response.data) {
        // Create a blob URL for the Excel file
        const url = window.URL.createObjectURL(new Blob([response.data]));
  
        // Create a link element and trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'attendance.xlsx');
        document.body.appendChild(link);
        link.click();
  
        // Clean up
        window.URL.revokeObjectURL(url);
        link.remove();
        alert("download sucessfully");
      } else {
        alert("Failed to download Excel file. Invalid response data.", response);
      }
    } catch (error) {
      alert("Error downloading Excel file:", error);
    }
  };
  

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = attendanceData.filter(employee =>
      employee.FirstName.toLowerCase().includes(query.toLowerCase()) ||
      employee.LastName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };
  
  const handleInTimeSubmit = async () => {
    const inTime = formatCurrentTime();
  
    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }
  
    console.log("Submitting In Time:", { userId, inTime });
  
    try {
      const response = await axios.post('https://localhost:44380/api/Attendance/markInTime', {
        userId: userId,
        inTime: inTime
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      console.log("API Response:", response);
  
      if (response.status === 200 && response.data === 'InTime marked successfully') {
        console.log("In-time marked successfully");
  
        // Update attendance data
        setAttendanceData(prevAttendanceData => {
          const newAttendanceRecord = {
            date: new Date().toISOString().split('T')[0],
            inTime: inTime,
            outTime: "", // Assuming out-time is not available at this point
            workingHours: "" // You can calculate working hours based on in and out times
          };
          return [...prevAttendanceData, newAttendanceRecord];
        });
  
        // Show success message with SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'In-time Marked Successfully!',
          showConfirmButton: false,
          timer: 1500
        });
  
      } else {
        console.error("Failed to mark in-time or unexpected response:", response.data);
        // Show error message with SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Failed to Mark In-time',
          text: 'Please try again later.',
        });
      }
    } catch (error) {
      console.error("Error marking in-time:", error);
      // Show error message with SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'mark out time first .',
      });
    }
  };
  
  const handleOutTimeSubmit = async () => {
    const outTime = formatCurrentTime();
  
    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }
  
    console.log("Submitting Out Time:", { userId, outTime });
  
    try {
      const response = await axios.post('https://localhost:44380/api/Attendance/markOutTime', {
        userId: userId,
        outTime: outTime
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      console.log("API Response:", response);
  
      if (response.status === 200 && response.data === 'OutTime marked successfully') {
        console.log("Out-time marked successfully");
  
        setAttendanceData(prevAttendanceData => {
          return prevAttendanceData.map(record => {
            if (record.date === new Date().toISOString().split('T')[0] && record.outTime === "") {
              const workingHours = calculateWorkingHours(record.inTime, outTime);
              return {
                ...record,
                outTime: outTime,
                workingHours: workingHours
              };
            }
            return record;
          });
        });
  
        // Show success message with SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Out-time Marked Successfully!',
          showConfirmButton: false,
          timer: 1500
        });
  
      } else {
        console.error("Failed to mark out-time or unexpected response:", response.data);
        // Show error message with SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Failed to Mark Out-time',
          text: 'Please try again later.',
        });
      }
    } catch (error) {
      console.error("Error marking out-time:", error);
      // Show error message with SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: ' Please mark in time first.',
      });
    }
  };
  
  
  const isAdmin = localStorage.getItem('Role') == 'Admin';
  const isAdmins = localStorage.getItem('Role') == 'Employee';
  return (
    <div className="attendance-dashboard">
      <Container>
          <h2 className="mb-3 mb-lg-0 text-center">Take Attendance</h2>
            <div className="row">
              <div className="col-12 col-lg-12 d-none Take-attendance ">
                <div className="attendence-btn d-flex gap-3 mb-4">
                    {/* <div className='col-12 col-lg-6'>
                      <div className="search-container mb-3">
                      
                      </div>
                    </div> */}
                    <Button hidden={isAdmin?true:false} onClick={handleInTimeSubmit} className="in-btn">
                    In
                  </Button>

                  <Button hidden={isAdmin?true:false} onClick={handleOutTimeSubmit} className="out-btn">
                    Out
                  </Button>
                </div>
              </div>
              </div>
            <div className="input-table-container">
              <InOutTable attendanceData={attendanceData} />
            </div>
          {/* <div className="download-excel-btn text-center ">
              <Button onClick={handleDownloadExcel} hidden={isAdmins} className="mt-4 download-excel justify-content-center">Download Excel</Button>
          </div> */}
         
        </Container>
    </div>
  );
};

export default AttendanceView;











