import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import axios from 'axios';

const EmpAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("UserId");
    setToken(storedToken);
    setUserId(storedUserId);

    // Fetch attendance data from the API
    if (storedToken && storedUserId) {
      axios.get('https://localhost:44380/api/Attendance/GetAllAttendanceByUserId', {
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
  
      if (response.status === 200 && response.data.inTime && response.data.userId === userId) {
        console.log("In-time marked successfully");
        const newAttendanceRecord = {
          date: new Date().toISOString().split('T')[0],
          inTime: response.data.inTime,
          outTime: "", // Assuming out-time is not available at this point
          workingHours: "" // You can calculate working hours based on in and out times
        };
        setAttendanceData([...attendanceData, newAttendanceRecord]);
      } else {
        console.error("Failed to mark in-time");
      }
    } catch (error) {
      console.error("Error marking in-time:", error);
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
  
      if (response.status === 200 && response.data.outTime && response.data.userId === userId) {
        console.log("Out-time marked successfully");
  
        setAttendanceData(prevAttendanceData => {
          return prevAttendanceData.map(record => {
            if (record.date === new Date().toISOString().split('T')[0] && record.outTime === "") {
              const workingHours = calculateWorkingHours(record.inTime, response.data.outTime);
              return {
                ...record,
                outTime: response.data.outTime,
                workingHours: workingHours
              };
            }
            return record;
          });
        });
      } else {
        console.error("Failed to mark out-time");
      }
    } catch (error) {
      console.error("Error marking out-time:", error);
    }
  };

  const isAdmin = localStorage.getItem('Role') === 'Admin';

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h2 className="mb-4">Take Attendance</h2>
      {!isAdmin && (
        <div>
          <Button onClick={handleInTimeSubmit} className="mt-4 me-2">IN</Button>
          <Button onClick={handleOutTimeSubmit} className="mt-4">OUT</Button>
        </div>
      )}

      <table className="table mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>In Time</th>
            <th>Out Time</th>
            <th>Working Hours</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{record.date}</td>
              <td>{record.inTime}</td>
              <td>{record.outTime}</td>
              <td>{record.workingHours}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button onClick={handleDownloadExcel} className="mt-4">Download All</Button>
    </Container>
  );
};

export default EmpAttendance;
