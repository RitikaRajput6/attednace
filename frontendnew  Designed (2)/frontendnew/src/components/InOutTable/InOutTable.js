
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InOutTable = ({ attendanceData }) => {
  const [reports, setReports] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [allDates, setAllDates] = useState([]);
  const [allDatesFromSecondAPI, setAllDatesFromSecondAPI] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedInTime, setSelectedInTime] = useState(null);
  const [selectedOutTime, setSelectedOutTime] = useState(null);
  const [selectedWorkingHours, setSelectedWorkingHours] = useState(null);
  const [totalWorkingHours, setTotalWorkingHours] = useState({ hours: 0, minutes: 0 });
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'details'

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const isoDate = new Date(dateString);
    const day = isoDate.getDate().toString().padStart(2, '0');
    const month = (isoDate.getMonth() + 1).toString().padStart(2, '0');
    const year = isoDate.getFullYear();
    return `${day}/${month}/${year}`;
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

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const fetchReports = async (userId) => {
    try {
      const response = await axios.get(`https://localhost:44380/api/Attendance/GetAllAttendanceByCustomUserId?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(response.data);
      const dates = response.data.map(record => formatDate(record.Date));
      setAllDates(dates);

      if (dates.length > 0) {
        setSelectedDate(dates[0]);
        setSelectedInTime(response.data[0].InTime);
        setSelectedOutTime(response.data[0].OutTime);
        const { hours, minutes } = calculateHoursAndMinutes(response.data[0].WorkingHours);
        setSelectedWorkingHours({ hours, minutes });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setReports([]);
    }
  };

  const fetchWorkingHoursFromSecondAPI = async (userId) => {
    try {
      const storedToken = localStorage.getItem("token");
      const response = await axios.get(`https://localhost:44380/api/Attendance/GetAllAttendancesForDailyDate?customId=${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      if (response.status === 200) {
        const datesAndHours = response.data.map(record => ({
          date: formatDate(record.Date),
          hours: record.WorkingHours
        }));
        setAllDatesFromSecondAPI(datesAndHours);

        if (datesAndHours.length > 0) {
          setSelectedDate(datesAndHours[0].date);
          setSelectedWorkingHours(calculateHoursAndMinutes(datesAndHours[0].hours));
        }
      } else {
        console.error('Error fetching data from second API - Unexpected status:', response.status);
        setAllDatesFromSecondAPI([]);
      }
    } catch (error) {
      console.error('Error fetching data from second API:', error);
      setAllDatesFromSecondAPI([]);
    }
  };

  const handleView = async (userId) => {
    setSelectedEmployeeId(userId);
    await fetchReports(userId);
    await fetchWorkingHoursFromSecondAPI(userId);
    setViewMode('details');
  };

  const handleDropdownChange = async (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
    const filteredReport = reports.find(report => formatDate(report.Date) === selectedDate);
    if (filteredReport) {
      setSelectedInTime(filteredReport.InTime);
      setSelectedOutTime(filteredReport.OutTime);
      const { hours, minutes } = calculateHoursAndMinutes(filteredReport.WorkingHours);
      setSelectedWorkingHours({ hours, minutes });
    }

    const selectedHoursFromSecondAPI = allDatesFromSecondAPI.find(item => item.date === selectedDate);
    if (selectedHoursFromSecondAPI) {
      setSelectedWorkingHours(calculateHoursAndMinutes(selectedHoursFromSecondAPI.hours));
    }
  };

  const calculateTotalWorkingHours = () => {
    let totalHours = 0;
    let totalMinutes = 0;
    reports.forEach(report => {
      const { hours, minutes } = calculateHoursAndMinutes(report.WorkingHours);
      totalHours += hours;
      totalMinutes += minutes;
    });
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;
    return { hours: totalHours, minutes: totalMinutes };
  };

  const handleClose = () => {
    setSelectedEmployeeId(null);
    setReports([]);
    setSelectedDate(null);
    setAllDates([]);
    setAllDatesFromSecondAPI([]);
    setTotalWorkingHours({ hours: 0, minutes: 0 });
    setViewMode('list');
  };

  useEffect(() => {
    const { hours, minutes } = calculateTotalWorkingHours();
    setTotalWorkingHours({ hours, minutes });
  }, [reports]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData([]);
    } else {
      const filtered = attendanceData.filter((record) =>
        record.FullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, attendanceData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const dataToDisplay = searchQuery.trim() === '' ? attendanceData : filteredData;
  const isAdmin = localStorage.getItem('Role') === 'Admin';
  const isEmployee = localStorage.getItem('Role') === 'Employee';

  return (
    <div>
      {viewMode === 'list' && (
        <div>
          <div className='attendance-record'>
            <div className='row'>
              <div className='col-12 col-lg-8'></div>
              <div className='col-12 col-lg-4 col-md-5 col-sm-6 mb-4'>
                <div className='input-btn position-relative'>
                  <input hidden={isEmployee} type="text" placeholder="Search by named..." value={searchQuery} onChange={handleSearchChange} />
                  <button hidden={isEmployee} type="button" className="btn btn-primary position-absolute w-auto" data-mdb-ripple-init>
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Employee ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataToDisplay.map((record, index) => (
                <tr key={index}>
                  <td>{record.FullName}</td>
                  <td>{record.EmployeeId}</td>
                  <td>
                    <button hidden={isEmployee} onClick={() => handleView(record.UserId)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewMode === 'details' && (
        <div>
          <h3 className='Attendance-Records'>Attendance Records</h3>
          <div className="row">
            <div className="col-12 col-lg-2 col-md-12">
              <h6>Daily Date</h6>
              <select className="form-select" value={selectedDate} onChange={handleDropdownChange}>
                {allDates.map((date, index) => (
                  <option key={index} value={date}>{date}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-lg-2 col-md-12">
              <h6 className="mt-3 mt-lg-0">Daily Working Hrs</h6>
              <select className="form-select" value={`${selectedWorkingHours.hours} hr ${selectedWorkingHours.minutes} min`} onChange={(e) => setSelectedWorkingHours(e.target.value)}>
                {reports.map((report, index) => (
                  <option key={index} value={`${calculateHoursAndMinutes(report.WorkingHours).hours} hr ${calculateHoursAndMinutes(report.WorkingHours).minutes} min`}>
                    {`${calculateHoursAndMinutes(report.WorkingHours).hours} hr ${calculateHoursAndMinutes(report.WorkingHours).minutes} min`}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12 col-lg-2 col-md-12">
              <h6 className="mt-3 mt-lg-0">In Time</h6>
              <select className="form-select" value={selectedInTime} onChange={(e) => setSelectedInTime(e.target.value)}>
                {reports.map((report, index) => (
                  <option key={index} value={report.InTime}>{formatTime(report.InTime)}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-lg-2 col-md-12">
              <h6 className="mt-3 mt-lg-0">Out Time</h6>
              <select className="form-select" value={selectedOutTime} onChange={(e) => setSelectedOutTime(e.target.value)}>
                {reports.map((report, index) => (
                  <option key={index} value={report.OutTime}>{formatTime(report.OutTime)}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-lg-2 col-md-12">
              <h6 className="mt-3 mt-lg-0">Date</h6>
              <select className="form-select" value={selectedDate} onChange={handleDropdownChange}>
                {allDatesFromSecondAPI.map((item, index) => (
                  <option key={index} value={item.date}>{item.date}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-lg-2 col-md-12">
              <h6 className="mt-3 mt-lg-0">Total Working Hrs</h6>
              <select className="form-select" value={`${selectedWorkingHours.hours} hr ${selectedWorkingHours.minutes} min`} onChange={(e) => setSelectedWorkingHours(e.target.value)}>
                {allDatesFromSecondAPI.map((item, index) => (
                  <option key={index} value={`${calculateHoursAndMinutes(item.hours).hours} hr ${calculateHoursAndMinutes(item.hours).minutes} min`}>
                    {`${calculateHoursAndMinutes(item.hours).hours} hr ${calculateHoursAndMinutes(item.hours).minutes} min`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Date</th>
                  {/* <th>In Time</th>
                  <th>Out Time</th> */}
                  <th>Total Working hrs</th>
             
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedDate}</td>
                  {/* <td>{formatTime(selectedInTime)}</td>
                  <td>{formatTime(selectedOutTime)}</td> */}
                  <td>{`${selectedWorkingHours.hours} hr ${selectedWorkingHours.minutes} min`}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="btn comman-btn brown-color mt-3" onClick={handleClose}>Back to List</button>
        </div>
      )}
    </div>
  );
};

export default InOutTable;
