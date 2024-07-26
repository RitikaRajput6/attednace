// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Button from '@atlaskit/button';
// // import Modal, { ModalTransition } from '@atlaskit/modal-dialog';

// // function DailyReportsem() {
// //     const [reports, setReports] = useState([]);
// //     const [searchQuery, setSearchQuery] = useState('');
// //     const [filteredReports, setFilteredReports] = useState([]);
// //     const [isModalOpen, setIsModalOpen] = useState(false);
// //     useEffect(() => {
// //         fetchReports();
// //       }, []);
// //       const fetchReports = async () => {
// //         try {
// //           const response = await axios.get("https://localhost:44380/api/DailyReports/GetAllReportsByUser", {
// //             headers: {
// //               Authorization: `Bearer ${localStorage.getItem("token")}`,
// //             },
// //           });
// //           setReports(response.data);
// //           setFilteredReports(response.data);
// //         } catch (error) {
// //           console.error('Error fetching data:', error);
// //         }
// //       };


// //       const handleSearchInputChange = (e) => {
// //         const query = e.target.value;
// //         setSearchQuery(query);
// //         const filtered = reports.filter(report =>
// //           report.ProjectName.toLowerCase().includes(query.toLowerCase()) ||
// //           report.Task.toLowerCase().includes(query.toLowerCase())
// //         );
// //         setFilteredReports(filtered);
// //       };

// //       const handleModalOpen = () => {
// //         setIsModalOpen(true);
// //       };

// //       const handleModalClose = () => {
// //         setIsModalOpen(false);
// //       };


// //       const onSubmit = async (formData) => {
// //         debugger;
// //         try {
// //             console.log("FormData being sent:", formData);
// //             const response = await axios.post("https://localhost:44380/api/DailyReports", formData, {
// //                 headers: {
// //                     Authorization: `Bearer ${localStorage.getItem("token")}`,
// //                     'Content-Type': 'application/json', // Ensure content type is set correctly
// //                 },
// //             });

// //             if (response.status === 201) {
// //                 alert('Saved Successfully');
// //                 handleModalClose();
// //                 fetchReports(); // Fetch reports again to update the table
// //             } else {
// //                 alert('Failed to save');
// //                 console.log('Response status:', response.status);
// //             }
// //         } catch (error) {
// //             console.error('Error:', error);
// //             alert('An error occurred');
// //         }
// //     };

// //       const ReportForm = ({ onClose }) => {
// //         const [formData, setFormData] = useState({
// //           ProjectName: '',
// //           Task: '',
// //           TaskDescription: '',
// //           Status: '',
// //         });

// //         const handleChange = (e) => {
// //           const { name, value } = e.target;
// //           setFormData({ ...formData, [name]: value });
// //         };

// //         const handleSubmit = (e) => {
// //             e.preventDefault();
// //             onSubmit(formData);
// //           };

// //           return (
// //             <form onSubmit={handleSubmit}>
// //               <div>
// //                 <label htmlFor="ProjectName">Project Name</label>
// //                 <input type="text" name="ProjectName" onChange={handleChange} value={formData.ProjectName} required />
// //               </div>
// //               <div>
// //                 <label htmlFor="Task">Task</label>
// //                 <input type="text" name="Task" onChange={handleChange} value={formData.Task} required />
// //               </div>
// //               <div>
// //                 <label htmlFor="TaskDescription">Task Description</label>
// //                 <input type="text" name="TaskDescription" onChange={handleChange} value={formData.TaskDescription} required />
// //               </div>
// //               <div>
// //                 <label htmlFor="Status">Status</label>
// //                 <input type="text" name="Status" onChange={handleChange} value={formData.Status} required />
// //               </div>
// //               <div>
// //                 <button type="submit">Submit</button>
// //               </div>
// //             </form>
// //           );
// //         };


// //         const handleDownloadExcel = async () => {
// //           const token = localStorage.getItem("token");

// //           if (!token) {
// //             console.error("Authorization token is missing.");
// //             return;
// //           }

// //           try {
// //             const response = await axios.get('https://localhost:44380/api/Attendance/download-excel', {
// //               responseType: 'blob', // Ensure response type is set to blob
// //               headers: {
// //                 'Authorization': `Bearer ${token}`
// //               }
// //             });

// //             if (response.status === 200 && response.data) {
// //               const url = window.URL.createObjectURL(new Blob([response.data]));
// //               const link = document.createElement('a');
// //               link.href = url;
// //               link.setAttribute('download', 'attendance.xlsx');
// //               document.body.appendChild(link);
// //               link.click();
// //               window.URL.revokeObjectURL(url);
// //               link.remove();
// //               alert("Downloaded successfully");
// //             } else {
// //               alert("Failed to download Excel file. Invalid response data.", response);
// //             }
// //           } catch (error) {
// //             alert("Error downloading Excel file:", error);
// //           }
// //         };

// //         return (
// //             <div className="table-container">
// //               <h2 className="table-heading">Daily Reports Information</h2>
// //               <div className="search-container">
// //                 <input
// //                   type="text"
// //                   placeholder="Search by project name or task..."
// //                   value={searchQuery}
// //                   onChange={handleSearchInputChange}
// //                 />
// //               </div>
// //               <Button appearance="primary" onClick={handleModalOpen}>Add Daily Report</Button>

// //               <Button appearance="primary" onClick={handleDownloadExcel}>Download Excel</Button>
// //               <ModalTransition></ModalTransition>
// //               <ModalTransition>
// //                 {isModalOpen && (
// //                   <Modal onClose={handleModalClose} heading="Add Daily Report">
// //                     <ReportForm onClose={handleModalClose} />
// //                   </Modal>
// //                 )}
// //               </ModalTransition>
// //               <div className="table-responsive">
// //                 <table className="table table-bordered">
// //                   <thead>
// //                     <tr>
// //                       <th scope="col">Project Name</th>
// //                       <th scope="col">Task</th>
// //                       <th scope="col">Task Description</th>
// //                       <th scope="col">Status</th>
// //                       <th scope="col">Task Time</th>
// //                       <th scope="col">Today Date</th>
// //                       <th scope="col">FullName</th>
// //                       <th scope="col">EmployeeId</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {filteredReports.map(report => (
// // <tr key={report.id}>
// //   <td>{report.ProjectName}</td>
// //   <td>{report.Task}</td>
// //   <td>{report.TaskDescription}</td>
// //   <td>{report.Status}</td>
//   // <td>{report.TaskTime}</td>
//   // <td>{report.TodayDate}</td>
//   // <td>{report.FullName}</td>
//   // <td>{report.EmployeeId}</td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           );
// //         }

// //         export default DailyReportsem;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Button from '@atlaskit/button';
// import Modal, { ModalTransition } from '@atlaskit/modal-dialog';

// function DailyReportsem() {
//   const [reports, setReports] = useState([]);
//   const [formData, setFormData] = useState({
//     ProjectName: '',
//     Task: '',
//     TaskDescription: '',
//     Status: '',
//   });
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredReports, setFilteredReports] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const fetchReports = async () => {
//     try {
//       const response = await axios.get("https://localhost:44380/api/DailyReports/GetAllReportsByUser", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setReports(response.data);
//       setFilteredReports(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleSearchInputChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     const filtered = reports.filter(report =>
//       report.ProjectName.toLowerCase().includes(query.toLowerCase()) ||
//       report.Task.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredReports(filtered);
//   };

//   const handleModalOpen = () => {
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     debugger;
//     e.preventDefault();
//     try {
//       const response = await axios.post("https://localhost:44380/api/DailyReports", formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 201) {
//         alert('Saved Successfully');
//         handleModalClose();
//         fetchReports(); // Fetch reports again to update the table
//       } else {
//         alert('Failed to save');
//         console.log('Response status:', response.status);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred');
//     }
//   };

//   const handleDownloadExcel = async () => {
//     // Your code for downloading Excel
//   };

//   return (
//     <div className="table-container">
//       <h2 className="table-heading">Daily Reports Information</h2>
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search by project name or task..."
//           value={searchQuery}
//           onChange={handleSearchInputChange}
//         />
//       </div>
//       <Button appearance="primary" onClick={handleModalOpen}>Add Daily Report</Button>
//       <Button appearance="primary" onClick={handleDownloadExcel}>Download Excel</Button>

//       <ModalTransition>
//         {isModalOpen && (
//           <Modal onClose={handleModalClose} heading="Add Daily Report">
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <label htmlFor="ProjectName">Project Name</label>
//                 <input type="text" name="ProjectName" onChange={handleChange} value={formData.ProjectName} required />
//               </div>
//               <div>
//                 <label htmlFor="Task">Task</label>
//                 <input type="text" name="Task" onChange={handleChange} value={formData.Task} required />
//               </div>
//               <div>
//                 <label htmlFor="TaskDescription">Task Description</label>
//                 <input type="text" name="TaskDescription" onChange={handleChange} value={formData.TaskDescription} required />
//               </div>
//               <div>
//                 <label htmlFor="Status">Status</label>
//                 <input type="text" name="Status" onChange={handleChange} value={formData.Status} required />
//               </div>
//               <div>
//                 <button type="submit">Submit</button>
//               </div>
//             </form>
//           </Modal>
//         )}
//       </ModalTransition>

//       <div className="table-responsive">
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th scope="col">Project Name</th>
//               <th scope="col">Task</th>
//               <th scope="col">Task Description</th>
//               <th scope="col">Status</th>
//               <th scope="col">Task Time</th>
//               <th scope="col">Today Date</th>
//               <th scope="col">FullName</th>
//               <th scope="col">EmployeeId</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredReports.map(report => (
//               <tr key={report.id}>
//                 <td>{report.ProjectName}</td>
//                 <td>{report.Task}</td>
//                 <td>{report.TaskDescription}</td>
//                 <td>{report.Status}</td>
//                 <td>{report.TaskTime}</td>
//   <td>{report.TodayDate}</td>
//   <td>{report.FullName}</td>
//   <td>{report.EmployeeId}</td>
//                 {/* Add more columns as needed */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default DailyReportsem;











import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@atlaskit/button';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';

function DailyReportsem() {
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredReports, setFilteredReports] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchReports();
    // fetchReportss();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get("https://localhost:44380/api/DailyReports/GetAllReportsByUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setReports(response.data);
      setFilteredReports(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // const fetchReportss = async () => {
  //   try {
  //     const response = await axios.get("https://localhost:44380/api/Attendance/GetAllAttendanceByUserId", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     setReports(response.data);
  //     setFilteredReports(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = reports.filter(report =>
      report.ProjectName.toLowerCase().includes(query.toLowerCase()) ||
      report.Task.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredReports(filtered);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (formData) => {
    const token = localStorage.getItem("token");
  
    try {
      const payload = {
        ProjectName: formData.ProjectName,
        Task: formData.Task,
        TaskDescription: formData.TaskDescription,
        Status: formData.Status
      };
  
      const response = await axios.post(
        "https://localhost:44380/api/DailyReports",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' // Set content type to application/json
          },
        }
      );
  
      if (response.status === 201) {
        alert('Saved Successfully');
        handleModalClose();
        fetchReports(); // Fetch reports again to update the table
      } else {
        alert('Failed to save');
        console.log('Response status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };
  
  
console.log(filteredReports);

  const ReportForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
      ProjectName: '',
      Task: '',
      TaskDescription: '',
      Status: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ProjectName">Project Name</label>
          <input type="text" name="ProjectName" onChange={handleChange} value={formData.ProjectName} required />
        </div>
        <div>
          <label htmlFor="Task">Task</label>
          <input type="text" name="Task" onChange={handleChange} value={formData.Task} required />
        </div>
        <div>
          <label htmlFor="TaskDescription">Task Description</label>
          <input type="text" name="TaskDescription" onChange={handleChange} value={formData.TaskDescription} required />
        </div>
        <div>
          <label htmlFor="Status">Status</label>
          <input type="text" name="Status" onChange={handleChange} value={formData.Status} required />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  };


  const handleDownloadExcel = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }

    try {
      const response = await axios.get('https://localhost:44380/api/DailyReports/download-excel-report', {
        responseType: 'blob', // Ensure response type is set to blob
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200 && response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'attendance.xlsx');
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        link.remove();
        alert("Downloaded successfully");
      } else {
        alert("Failed to download Excel file. Invalid response data.", response);
      }
    } catch (error) {
      alert("Error downloading Excel file:", error);
    }
  };


  return (
    <div className="table-container">
      <h2 className="table-heading">Daily Reports Information</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by project name or task..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <Button appearance="primary" onClick={handleModalOpen}>Add Daily Report</Button>
      <Button appearance="primary" onClick={handleDownloadExcel}>Download Excel</Button>
      <ModalTransition></ModalTransition>
      <ModalTransition>
        {isModalOpen && (
          <Modal onClose={handleModalClose} heading="Add Daily Report">
            <ReportForm onClose={handleModalClose} />
          </Modal>
        )}
      </ModalTransition>
      <div className="input-table-container">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Project Name</th>
              <th scope="col">Task</th>
              <th scope="col">Task Description</th>
              <th scope="col">Status</th>
              <th scope="col">Task Time</th>
              <th scope="col">Today Date</th>
              <th scope="col">FullName</th>
              <th scope="col">EmployeeId</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map(report => (
              <tr key={report.id}>
                <td>{report.ProjectName}</td>
                <td>{report.Task}</td>
                <td>{report.TaskDescription}</td>
                <td>{report.Status}</td>
                <td>{report.TaskTime}</td>
                <td>{report.TodayDate}</td>
                <td>{report.FullName}</td>
                <td>{report.EmployeeId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DailyReportsem;

