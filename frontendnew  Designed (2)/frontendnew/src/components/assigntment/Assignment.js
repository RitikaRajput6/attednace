


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Button from '@atlaskit/button';
// import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// function Assignment() {
//   const [projects, setProjects] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [reports, setReports] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredReports, setFilteredReports] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     ProjectName: '',
//     TaskName: '',
//     TaskDescription: '',
//     UserName: '',
//     StartDate: new Date(),
//     EndDate: new Date()
//   });

//   useEffect(() => {
//     fetchProjects();
//     fetchEmployees();
//     fetchReports();
//     fetchempReports();
//   }, []);


//   const formatDate = (dateString) => {
//     if (!dateString) return ''; // Handle cases where dateString is null or undefined
  
//     // Extract day, month, and year from ISO date format 'YYYY-MM-DDTHH:mm:ss'
//     const isoDate = new Date(dateString);
//     const day = isoDate.getDate().toString().padStart(2, '0'); // Get day and pad with '0' if necessary
//     const month = (isoDate.getMonth() + 1).toString().padStart(2, '0'); // Get month (zero-based index) and pad with '0' if necessary
//     const year = isoDate.getFullYear(); // Get full year
  
//     return `${day}/${month}/${year}`;
//   };
  
//   const formatTime = (timeString) => {
//     if (!timeString) return ''; // Handle cases where timeString is null or undefined
    
//     const [hours, minutes] = timeString.split(':');
//     let formattedTime = '';
  
//     // Convert hours to 12-hour format
//     let hours12 = parseInt(hours, 10);
//     const ampm = hours12 >= 12 ? 'PM' : 'AM';
//     hours12 = hours12 % 12;
//     hours12 = hours12 ? hours12 : 12; // Handle midnight (00:xx) as 12 AM
//     formattedTime = `${hours12}:${minutes} ${ampm}`;
  
//     return formattedTime;
//   };
//   const fetchProjects = async () => {
//     try {
//       const response = await axios.get("https://localhost:44380/api/ProjectAssignments/GetAllProjects", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setProjects(response.data);
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//     }
//   };

//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get("https://localhost:44380/api/ProjectAssignments/GetAllEmployees", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setEmployees(response.data);
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     }
//   };

//   const fetchReports = async () => {
//     try {
//       const response = await axios.get("https://localhost:44380/api/ProjectAssignments/GetAllProjectAssignments", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setReports(response.data);
//       setFilteredReports(response.data);
//     } catch (error) {
//       console.error('Error fetching reports:', error);
//     }
//   };
//   const fetchempReports = async () => {
//     try {
//       const response = await axios.get("https://localhost:44380/api/ProjectAssignments/GetAllProjectAssignmentsByUserId", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setReports(response.data);
//       setFilteredReports(response.data);
//     } catch (error) {
//       console.error('Error fetching reports:', error);
//     }
//   };

//   const handleSearchInputChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     const filtered = reports.filter(report =>
//       report.ProjectName.toLowerCase().includes(query.toLowerCase())
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

//   const handleStartDateChange = (date) => {
//     setFormData({ ...formData, StartDate: date });
//   };

//   const handleEndDateChange = (date) => {
//     setFormData({ ...formData, EndDate: date });
//   };

//   const onSubmit = async (formData) => {
//     const token = localStorage.getItem("token");

//     // Validate form fields
//     let errors = {};
//     if (!formData.ProjectName) {
//       errors.ProjectName = 'Project Name is required';
//     }
//     if (!formData.TaskName) {
//       errors.TaskName = 'Task Name is required';
//     }
//     if (!formData.TaskDescription) {
//       errors.TaskDescription = 'Task Description is required';
//     }
//     if (!formData.UserName) {
//       errors.UserName = 'Assign To is required';
//     }

//     // Update errors state
//     setFormErrors(errors);

//     // If there are errors, stop form submission
//     if (Object.keys(errors).length > 0) {
//       return;
//     }

//     try {
//       const payload = {
//         ProjectName: formData.ProjectName,
//         TaskName: formData.TaskName,
//         TaskDescription: formData.TaskDescription,
//         StartDate: formData.StartDate.toISOString(),
//         EndDate: formData.EndDate.toISOString(),
//         UserName: formData.UserName,
//       };

//       const response = await axios.post(
//         "https://localhost:44380/api/ProjectAssignments/AssignProject",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//         }
//       );

//       if (response.status === 201) {
//         alert('Saved Successfully');
//         handleModalClose();
//         fetchReports();
//       } else {
//         alert('Failed to save');
//         console.log('Response status:', response.status);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred');
//     }
//   };


//   const ReportForm = ({ onClose }) => {
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       onSubmit(formData);
//     };

//     return (
//       <form onSubmit={handleSubmit}>
//         <div>
//           <h3>Assign Project</h3>
//           <label htmlFor="ProjectName">Project Name</label>
//           <select name="ProjectName" onChange={handleChange} value={formData.ProjectName} >
//             <option value="">Select Project</option>
//             {projects.map(project => (
//               <option key={project.id} value={project.ProjectName}>{project.ProjectName}</option>
//             ))}
//           </select>
//         </div>
       
//         <div>
//           <label>Start Date</label>
//           <DatePicker
//             selected={formData.StartDate}
//             onChange={handleStartDateChange}
//             dateFormat="yyyy-MM-dd"
//             className="form-control"
//           />
//         </div>
//         <div>
//           <label>End Date</label>
//           <DatePicker
//             selected={formData.EndDate}
//             onChange={handleEndDateChange}
//             dateFormat="yyyy-MM-dd"
//             className="form-control"
//           />
//         </div>
//         <div>
//           <label htmlFor="UserName">Assign To</label>
//           <select name="UserName" onChange={handleChange} value={formData.UserName} >
//             <option value="">Select Employee</option>
//             {employees.map(employee => (
//               <option key={employee.id} value={employee.UserName}>{employee.UserName}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <button type="submit">Submit</button>
//         </div>
//       </form>
//     );
//   };

//   const handleDownloadExcel = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       console.error("Authorization token is missing.");
//       return;
//     }

//     try {
//       const response = await axios.get('https://localhost:44380/api/ProjectAssignments/DownloadAllProjectAssignmentsExcel', {
//         responseType: 'blob',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.status === 200 && response.data) {
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', 'attendance.xlsx');
//         document.body.appendChild(link);
//         link.click();
//         window.URL.revokeObjectURL(url);
//         link.remove();
//         alert("Downloaded successfully");
//       } else {
//         alert("Failed to download Excel file. Invalid response data.");
//       }
//     } catch (error) {
//       alert("Error downloading Excel file:", error);
//     }
//   };
//   const isAdmin = localStorage.getItem('Role') == 'HR';
//   const isAdmins = localStorage.getItem('Role') == 'Employee';
//   const isAdminee = localStorage.getItem('Role') === 'Admin';
  
//   return (
//     <div className="table-container">
//       <h2 className="table-heading">Project Assigned Record</h2>
//       <div className='row'>
     
//         <div className='col-12 col-lg-4 col-md-12 m-0 mb-md-3'>
//           <Button  hidden={isAdmins || isAdmin} appearance="primary"   onClick={handleModalOpen}>Project Assign</Button>
//         </div>
    
//       <div className='col-12 col-lg-4 col-md-12'>
  
//   </div>
//       <div className='col-12 col-lg-4 col-md-12'>

//         <div className="search-container input-btn position-relative  mb-4">
//           <input
//             type="text"
//             placeholder="Search by project name..."
//             value={searchQuery}
//             onChange={handleSearchInputChange}
//           />
//           <button type="button" class="btn btn-primary position-absolute" data-mdb-ripple-init="true"><i class="fas fa-search"></i></button>
//         </div>
//       </div>
  
//       </div>
     
//       <ModalTransition>
//         {isModalOpen && (
//           <Modal onClose={handleModalClose} heading="Assign Project">
//             <ReportForm onClose={handleModalClose} />
//           </Modal>
//         )}
//       </ModalTransition>
//       <div className="input-table-container">
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//             <th scope="col">Date</th>
//               <th scope="col">Project Name</th>
//               <th scope="col">Task Name</th>
//               <th scope="col">Task Description</th>
//               <th scope="col">Start Date</th>
//               <th scope="col">End Date</th>
//               <th hidden={isAdmins} scope="col">Assigned To</th>
              
//               <th scope="col">Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredReports.map(report => (
//               <tr key={report.id}>
//                 <td>{formatDate(report.Date)}</td>
//                 <td>{report.ProjectName}</td>
//                 <td>{report.TaskName}</td>
//                 <td>{report.TaskDescription}</td>
             
//                 <td>{formatDate(report.StartDate)}</td>
//                 <td>{formatDate(report.EndDate)}</td>
              
//                 <th hidden={isAdmins}>{report.UserName}</th>
               
//                 <td>{formatTime(report.Time) }</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className='col-12 col-lg-12'>
//          <div className='download-btn mt-3'>
//             <Button appearance="primary" hidden={isAdmins?true:false} onClick={handleDownloadExcel}>Download Excel</Button>
//          </div>
//       </div>
//     </div>
//   );
// }

// export default Assignment;









import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@atlaskit/button';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import 'sweetalert2/dist/sweetalert2.css';


function Assignment() {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredReports, setFilteredReports] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    ProjectName: '',
    TaskName: '',
    TaskDescription: '',
    UserName: '',
    StartDate: new Date(),
    EndDate: new Date()
  });

  useEffect(() => {
    fetchProjects();
    fetchEmployees();
    fetchReports();
    fetchempReports();
  }, []);


  const formatDate = (dateString) => {
    if (!dateString) return ''; // Handle cases where dateString is null or undefined
  
    // Extract day, month, and year from ISO date format 'YYYY-MM-DDTHH:mm:ss'
    const isoDate = new Date(dateString);
    const day = isoDate.getDate().toString().padStart(2, '0'); // Get day and pad with '0' if necessary
    const month = (isoDate.getMonth() + 1).toString().padStart(2, '0'); // Get month (zero-based index) and pad with '0' if necessary
    const year = isoDate.getFullYear(); // Get full year
  
    return `${day}/${month}/${year}`;
  };
  
  const formatTime = (timeString) => {
    if (!timeString) return ''; // Handle cases where timeString is null or undefined
    
    const [hours, minutes] = timeString.split(':');
    let formattedTime = '';
  
    // Convert hours to 12-hour format
    let hours12 = parseInt(hours, 10);
    const ampm = hours12 >= 12 ? 'PM' : 'AM';
    hours12 = hours12 % 12;
    hours12 = hours12 ? hours12 : 12; // Handle midnight (00:xx) as 12 AM
    formattedTime = `${hours12}:${minutes} ${ampm}`;
  
    return formattedTime;
  };
  const fetchProjects = async () => {
    try {
      const response = await axios.get("https://localhost:44380/api/ProjectAssignments/GetAllProjects", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("https://localhost:44380/api/ProjectAssignments/GetAllEmployees", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchReports = async () => {
    try {
      const response = await axios.get("https://localhost:44380/api/ProjectAssignments/GetAllProjectAssignments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setReports(response.data);
      setFilteredReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };
  const fetchempReports = async () => {
    try {
      const response = await axios.get("https://localhost:44380/api/ProjectAssignments/GetAllProjectAssignmentsByUserId", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setReports(response.data);
      setFilteredReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = reports.filter(report =>
      report.ProjectName.toLowerCase().includes(query) ||
      report.UserName.toLowerCase().includes(query)  // Include search by UserName
    );
    setFilteredReports(filtered);
  };
  
  const handleModalOpen = () => {
    setIsModalOpen(true);
    setFormData({
      ProjectName: '',
      TaskName: '',
      TaskDescription: '',
      UserName: '',
      StartDate: new Date(),
      EndDate: new Date()
    });
    setFormErrors({});
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    // Clear corresponding error when user starts typing again
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };
  
  const handleStartDateChange = (date) => {
    setFormData({ ...formData, StartDate: date });
    // Clear start date error when a valid date is selected
    if (formErrors.StartDate) {
      setFormErrors({ ...formErrors, StartDate: '' });
    }
  };
  
  const handleEndDateChange = (date) => {
    setFormData({ ...formData, EndDate: date });
    // Clear end date error when a valid date is selected
    if (formErrors.EndDate) {
      setFormErrors({ ...formErrors, EndDate: '' });
    }
  };
  
  
  const onSubmit = async (formData) => {
    const token = localStorage.getItem("token");
  
    // Validate form fields
    let errors = {};
    if (!formData.ProjectName) {
      errors.ProjectName = 'Project Name is required';
    }
    if (!formData.StartDate) {
      errors.StartDate = 'Start Date is required';
    }
    if (!formData.EndDate) {
      errors.EndDate = 'End Date is required';
    }
    if (!formData.UserName) {
      errors.UserName = 'Assign is required';
    }
  
    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill out all required fields.',
      });
      return;
    }
  
    try {
      const payload = {
        ProjectName: formData.ProjectName,
        TaskName: formData.TaskName,
        TaskDescription: formData.TaskDescription,
        StartDate: formData.StartDate.toISOString(),
        EndDate: formData.EndDate.toISOString(),
        UserName: formData.UserName,
      };
  
      const response = await axios.post(
        "https://localhost:44380/api/ProjectAssignments/AssignProject",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
  
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Saved Successfully',
        }).then(() => {
          handleModalClose();
          fetchReports();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to save',
        });
        console.log('Response status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred',
      });
    }
  };
  
  

  const ReportForm = ({ onClose }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData); // Calls the onSubmit function defined in the parent component (Assignment)
    };
    return (
      <form onSubmit={handleSubmit}>

<style>
        {`
        .error-message {
          color: red;
          font-size: 0.8rem;
          margin-top: 0.2rem;
        }
        `}
      </style>
      <div className="comman-form">
        <h3>Assign Project</h3>
        <label htmlFor="ProjectName">Project Name</label>
        <select name="ProjectName" className='mb-2' onChange={handleChange} value={formData.ProjectName} >
          <option value="">Select Project</option>
          {projects.map(project => (
            <option key={project.id} value={project.ProjectName}>{project.ProjectName}</option>
          ))}
        </select>
        {formErrors.ProjectName && <p className="error-message">{formErrors.ProjectName}</p>}
      <div className='mb-0'>
        <label>Start Date</label>
        <DatePicker
          selected={formData.StartDate}
          onChange={handleStartDateChange}
          dateFormat="yyyy-MM-dd"
          className="form-control"
          required
        />
        {formErrors.StartDate && <p className="error-message">{formErrors.StartDate}</p>}
      </div>
        <div className='mb-0'>
          <label>End Date</label>
          <DatePicker
            selected={formData.EndDate}
            onChange={handleEndDateChange}
            dateFormat="yyyy-MM-dd"
            className="form-control"
          />
          {formErrors.EndDate && <p className="error-message">{formErrors.EndDate}</p>}
        </div>
        <div className='mb-4'>
          <label htmlFor="UserName">Assign To</label>
          <select name="UserName" onChange={handleChange} value={formData.UserName} >
            <option value="">Select Employee</option>
            {employees.map(employee => (
              <option key={employee.id} value={employee.UserName}>{employee.UserName}</option>
            ))}
          </select>
          {formErrors.UserName && <p className="error-message">{formErrors.UserName}</p>}

        </div>
        <div className='d-flex justify-content-center'>
          <button type="submit">Submit</button>
        </div>
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
      const response = await axios.get('https://localhost:44380/api/ProjectAssignments/DownloadAllProjectAssignmentsExcel', {
        responseType: 'blob',
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
        alert("Failed to download Excel file. Invalid response data.");
      }
    } catch (error) {
      alert("Error downloading Excel file:", error);
    }
  };
  const isAdmin = localStorage.getItem('Role') == 'HR';
  const isAdmins = localStorage.getItem('Role') == 'Employee';
  const isAdminee = localStorage.getItem('Role') === 'Admin';
  
  return (
    <div className="table-container">
      <h2 className="table-heading mb-3">Project Assigned Record</h2>
      <div className='row'>
        <div className='col-12 col-lg-4 col-md-5 col-sm-6'>
            <div   hidden={isAdmins}  className="search-container input-btn position-relative  mb-4">
              <input
                type="text"
                placeholder="Search by project name & UserName "
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <button   hidden={isAdmins} type="button" class="btn btn-primary position-absolute" data-mdb-ripple-init="true"><i class="fas fa-search"></i></button>
            </div>
        </div>
        <div className='col-12 col-lg-8 col-md-7 col-sm-6 mb-3 mb-lg-3'>
          <div className='download-btn-container'>
          <Button className='create-project-btn' hidden={isAdmins || isAdmin} appearance="primary" onClick={handleModalOpen}>Project Assign</Button>
          </div>
        </div>
      </div>
      <ModalTransition>
        {isModalOpen && (
          <Modal onClose={handleModalClose} heading="Assign Project">
            <ReportForm onClose={handleModalClose} />
          </Modal>
        )}
      </ModalTransition>
      <div className="input-table-container">
        <table className="table table-bordered">
          <thead>
            <tr>
            <th scope="col">Date</th>
              <th scope="col">Project Name</th>
              <th scope="col">Task Name</th>
              <th scope="col">Task Description</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th hidden={isAdmins} scope="col">Assigned To</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
  {filteredReports
    .sort((a, b) => {
      // Sort by Date in descending order
      const dateA = a.Date ? new Date(a.Date) : new Date(0);
      const dateB = b.Date ? new Date(b.Date) : new Date(0);
      return dateB - dateA;
    })
    .map(report => (
      <tr key={report.id}>
        <td>{formatDate(report.Date)}</td>
        <td>{report.ProjectName}</td>
        <td>{report.TaskName}</td>
        <td className="task-TaskDescription"><p>{report.TaskDescription}</p></td>
        <td>{formatDate(report.StartDate)}</td>
        <td>{formatDate(report.EndDate)}</td>
        <th hidden={isAdmins}>{report.UserName}</th>
        <td>{formatTime(report.Time)}</td>
      </tr>
    ))}
</tbody>

        </table>
      </div>
      <div className='col-12 col-lg-12'>
         <div className='download-btn mt-3 d-flex justify-content-center'>
            <Button appearance="primary" className='comman-btn' hidden={isAdmins?true:false} onClick={handleDownloadExcel}>Download Excel</Button>
         </div>
      </div>
    </div>
  );
}

export default Assignment;
