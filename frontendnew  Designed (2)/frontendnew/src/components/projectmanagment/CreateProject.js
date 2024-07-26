// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Button from '@atlaskit/button';
// import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
// import Swal from 'sweetalert2';

// function CreateProject() {
//   const [reports, setReports] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredReports, setFilteredReports] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [formData, setFormData] = useState({
//     ProjectName: '',
//     TaskName: '',
//     TaskDescription: ''
//   });
//   const [validationErrors, setValidationErrors] = useState({});

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const fetchReports = async () => {
//     try {
//       const response = await axios.get("https://localhost:44380/api/ProjectManagement/GetAllProjects", {
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
//       report.TaskName.toLowerCase().includes(query.toLowerCase()) ||
//       report.TaskDescription.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredReports(filtered);
//   };

//   const handleModalOpen = () => {
//     setIsModalOpen(true);
//     setSelectedProject(null);
//     setFormData({
//       ProjectName: '',
//       TaskName: '',
//       TaskDescription: ''
//     });
//     setValidationErrors({});
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setFormData({
//       ProjectName: '',
//       TaskName: '',
//       TaskDescription: ''
//     });
//     setValidationErrors({});
//   };

//   const validateForm = () => {
//     let errors = {};

//     // Validate Length Constraints
//     if (formData.ProjectName.length < 3 || formData.ProjectName.length > 50) {
//       errors.ProjectName = 'Project Name must be between 3 and 50 characters';
//     }
//     if (formData.TaskName.length < 3 || formData.TaskName.length > 50) {
//       errors.TaskName = 'Task Name must be between 3 and 50 characters';
//     }
//     if (formData.TaskDescription.length < 10 || formData.TaskDescription.length > 500) {
//       errors.TaskDescription = 'Task Description must be between 10 and 500 characters';
//     }

//     setValidationErrors(errors);
//     return errors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Validate Length Constraints on change
//     let errors = { ...validationErrors };
//     if (name === 'ProjectName') {
//       if (value.length < 3 || value.length > 50) {
//         errors.ProjectName = 'Project Name must be between 3 and 50 characters';
//       } else {
//         errors.ProjectName = undefined;
//       }
//     }
//     if (name === 'TaskName') {
//       if (value.length < 3 || value.length > 50) {
//         errors.TaskName = 'Task Name must be between 3 and 50 characters';
//       } else {
//         errors.TaskName = undefined;
//       }
//     }
//     if (name === 'TaskDescription') {
//       if (value.length < 10 || value.length > 500) {
//         errors.TaskDescription = 'Task Description must be between 10 and 500 characters';
//       } else {
//         errors.TaskDescription = undefined;
//       }
//     }

//     setValidationErrors(errors);
//   };

//   const createProject = async () => {
//     const token = localStorage.getItem("token");

//     try {
//       const payload = {
//         ProjectName: formData.ProjectName,
//         TaskName: formData.TaskName,
//         TaskDescription: formData.TaskDescription
//       };

//       const response = await axios.post(
//         "https://localhost:44380/api/ProjectManagement/CreateProject",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//         }
//       );

//       if (response.status === 201) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Project created successfully',
//         });

//         // Update state with the complete set of data for the new project
//         const newProject = response.data;
//         setReports([...reports, newProject]); // Append new project to reports
//         setFilteredReports([...filteredReports, newProject]); // Append new project to filteredReports

//         handleModalClose();
//         fetchReports(); // Close modal and reset form
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Failed to create project',
//         });
//         console.log('Response status:', response.status);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'An error occurred',
//       });
//     }
//   };

//   const updateProject = async () => {
//     const token = localStorage.getItem("token");

//     try {
//       const apiUrl = `https://localhost:44380/api/ProjectManagement/UpdateProject/${selectedProject.Id}`;

//       const payload = {
//         ProjectName: formData.ProjectName,
//         TaskName: formData.TaskName,
//         TaskDescription: formData.TaskDescription
//       };

//       const response = await axios.put(
//         apiUrl,
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//         }
//       );

//       if (response.status === 204) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Project updated successfully',
//         });
//         handleModalClose();

//         // Update the reports state immediately
//         const updatedReports = reports.map(report =>
//           report.Id === selectedProject.Id ? { ...report, ...payload } : report
//         );
//         setReports(updatedReports);
//         setFilteredReports(updatedReports); // Update filteredReports as well if needed
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Failed to update project',
//         });
//         console.log('Response status:', response.status);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'An error occurred',
//       });
//     }
//   };

//   const deleteProject = async (projectId) => {
//     const token = localStorage.getItem("token");

//     try {
//       const apiUrl = `https://localhost:44380/api/ProjectManagement/DeleteProject/${projectId}`;

//       const response = await axios.delete(
//         apiUrl,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 204) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Project deleted successfully',
//         });

//         // Remove the project from state immediately
//         const updatedReports = reports.filter(report => report.Id !== projectId);
//         setReports(updatedReports);
//         setFilteredReports(updatedReports); // Update filteredReports as well if needed
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Failed to delete project',
//         });
//         console.log('Response status:', response.status);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'An error occurred',
//       });
//     }
//   };
//   const onSubmit = async (e) => {
//     e.preventDefault();

//     // Validate Required Fields
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

//     // Validate Length Constraints
//     if (!errors.ProjectName && (formData.ProjectName.length < 3 || formData.ProjectName.length > 50)) {
//       errors.ProjectName = 'Project Name must be between 3 and 50 characters';
//     }
//     if (!errors.TaskName && (formData.TaskName.length < 3 || formData.TaskName.length > 50)) {
//       errors.TaskName = 'Task Name must be between 3 and 50 characters';
//     }
//     if (!errors.TaskDescription && (formData.TaskDescription.length < 10 || formData.TaskDescription.length > 500)) {
//       errors.TaskDescription = 'Task Description must be between 10 and 500 characters';
//     }

//     setValidationErrors(errors);

//     if (Object.keys(errors).length === 0) {
//       if (selectedProject) {
//         await updateProject();
//       } else {
//         await createProject();
//       }
//     }
//   };

//   const handleEdit = (report) => {
//     setSelectedProject(report);
//     setIsModalOpen(true);
//     setFormData({
//       ProjectName: report.ProjectName,
//       TaskName: report.TaskName,
//       TaskDescription: report.TaskDescription
//     });
//     setValidationErrors({});
//   };

//   const handleDelete = (projectId) => {
//     Swal.fire({
//       icon: 'warning',
//       title: 'Are you sure?',
//       text: 'You will not be able to recover this project!',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'No, keep it'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteProject(projectId);
//       }
//     });
//   };

//   return (
//     <div className="table-container">
//       <h2 className="table-heading">Project Records</h2>
//       <div className='input-table-container'>
//         <div className="search-container">
//           <div className='row mb-4'>
//             <div className='col-12 col-lg-8 mb-3'>
//               <div className='project-man-input'>
//                 <input
//                   type="text"
//                   className="search-input"
//                   placeholder="Search..."
//                   value={searchQuery}
//                   onChange={handleSearchInputChange}
//                 />
//               </div>
//             </div>
//             <div className='col-12 col-lg-4'>
//               <div className='download-btn-container'>
//                 <Button
//                   className="btn btn-primary create-project-btn"
//                   appearance="primary"
//                   onClick={handleModalOpen}
//                 >
//                   Create Project
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <table className="table table-bordered table-striped table-hover">
//           <thead className="thead-dark">
//             <tr>
//               <th>Project Name</th>
//               <th>Task Name</th>
//               <th>Task Description</th>
//               <th>Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredReports.map(report => (
//               <tr key={report.Id}>
//                 <td>{report.ProjectName}</td>
//                 <td>{report.TaskName}</td>
//                 <td>{report.TaskDescription}</td>
//                 <td>{new Date(report.Date).toLocaleDateString()}</td>

//                 <td>
//                   <Button
//                     appearance="primary"
//                     onClick={() => handleEdit(report)}
//                     className="btn btn-sm btn-primary mr-1"
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     appearance="danger"
//                     onClick={() => handleDelete(report.Id)}
//                     className="btn btn-sm btn-danger"
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal for Creating or Updating Project */}
//       <div>
//         <ModalTransition>
//           {isModalOpen && (
//             <Modal
//               actions={[
//                 { text: 'Cancel', onClick: handleModalClose },
//                 { text: selectedProject ? 'Update Project' : 'Create Project', onClick: onSubmit }
//               ]}
//               onClose={handleModalClose}
//               heading={selectedProject ? 'Edit Project' : 'Create New Project'}
//             >
//               <form onSubmit={onSubmit}>
//                 <div>
//                   <label htmlFor="ProjectName">Project Name</label>
//                   <input
//                     type="text"
//                     name="ProjectName"
//                     value={formData.ProjectName}
//                     onChange={handleChange}
//                     className={validationErrors.ProjectName ? 'is-invalid form-control' : 'form-control'}
//                   />
//                   {validationErrors.ProjectName && <div className="invalid-feedback">{validationErrors.ProjectName}</div>}
//                 </div>
//                 <div>
//                   <label htmlFor="TaskName">Task Name</label>
//                   <input
//                     type="text"
//                     name="TaskName"
//                     value={formData.TaskName}
//                     onChange={handleChange}
//                     className={validationErrors.TaskName ? 'is-invalid form-control' : 'form-control'}
//                   />
//                   {validationErrors.TaskName && <div className="invalid-feedback">{validationErrors.TaskName}</div>}
//                 </div>
//                 <div>
//                   <label htmlFor="TaskDescription">Task Description</label>
//                   <textarea
//                     name="TaskDescription"
//                     value={formData.TaskDescription}
//                     onChange={handleChange}
//                     className={validationErrors.TaskDescription ? 'is-invalid form-control' : 'form-control'}
//                   />
//                   {validationErrors.TaskDescription && <div className="invalid-feedback">{validationErrors.TaskDescription}</div>}
//                 </div>
//                 <div className="mt-3">
//                   <Button type="submit" appearance="primary">
//                     {selectedProject ? 'Update Project' : 'Create Project'}
//                   </Button>
//                 </div>
//               </form>
//             </Modal>
//           )}
//         </ModalTransition>
//       </div>
//     </div>
//   );
// }

// export default CreateProject;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Button from "@atlaskit/button";
// import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
// import Swal from "sweetalert2";

// function CreateProject() {
//   const [reports, setReports] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredReports, setFilteredReports] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [formData, setFormData] = useState({
//     ProjectName: "",
//     TaskName: "",
//     TaskDescription: "",
//   });
//   const [validationErrors, setValidationErrors] = useState({});

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const fetchReports = async () => {
//     try {
//       const response = await axios.get(
//         "https://localhost:44380/api/ProjectManagement/GetAllProjects",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       setReports(response.data);
//       setFilteredReports(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleSearchInputChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     const filtered = reports.filter(
//       (report) =>
//         report.ProjectName.toLowerCase().includes(query.toLowerCase()) ||
//         report.TaskName.toLowerCase().includes(query.toLowerCase()) ||
//         report.TaskDescription.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredReports(filtered);
//   };

//   const handleModalOpen = () => {
//     setIsModalOpen(true);
//     setSelectedProject(null);
//     setFormData({
//       ProjectName: "",
//       TaskName: "",
//       TaskDescription: "",
//     });
//     setValidationErrors({});
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setFormData({
//       ProjectName: "",
//       TaskName: "",
//       TaskDescription: "",
//     });
//     setValidationErrors({});
//   };

//   const validateForm = () => {
//     let errors = {};

//     // Validate Length Constraints
//     if (formData.ProjectName.length < 3 || formData.ProjectName.length > 50) {
//       errors.ProjectName = "Project Name must be between 3 and 50 characters";
//     }
//     if (formData.TaskName.length < 3 || formData.TaskName.length > 50) {
//       errors.TaskName = "Task Name must be between 3 and 50 characters";
//     }
//     if (
//       formData.TaskDescription.length < 10 ||
//       formData.TaskDescription.length > 500
//     ) {
//       errors.TaskDescription =
//         "Task Description must be between 10 and 500 characters";
//     }

//     setValidationErrors(errors);
//     return errors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Validate Length Constraints on change
//     let errors = { ...validationErrors };
//     if (name === "ProjectName") {
//       if (value.length < 3 || value.length > 50) {
//         errors.ProjectName = "Project Name must be between 3 and 50 characters";
//       } else {
//         errors.ProjectName = undefined;
//       }
//     }
//     if (name === "TaskName") {
//       if (value.length < 3 || value.length > 50) {
//         errors.TaskName = "Task Name must be between 3 and 50 characters";
//       } else {
//         errors.TaskName = undefined;
//       }
//     }
//     if (name === "TaskDescription") {
//       if (value.length < 10 || value.length > 500) {
//         errors.TaskDescription =
//           "Task Description must be between 10 and 500 characters";
//       } else {
//         errors.TaskDescription = undefined;
//       }
//     }

//     setValidationErrors(errors);
//   };

//   const createProject = async () => {
//     const token = localStorage.getItem("token");

//     try {
//       const payload = {
//         ProjectName: formData.ProjectName,
//         TaskName: formData.TaskName,
//         TaskDescription: formData.TaskDescription,
//       };

//       const response = await axios.post(
//         "https://localhost:44380/api/ProjectManagement/CreateProject",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 201) {
//         Swal.fire({
//           icon: "success",
//           title: "Project created successfully",
//         });

//         // Update state with the complete set of data for the new project
//         const newProject = response.data;
//         setReports([...reports, newProject]); // Append new project to reports
//         setFilteredReports([...filteredReports, newProject]); // Append new project to filteredReports

//         handleModalClose();
//         fetchReports(); // Close modal and reset form
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Failed to create project",
//         });
//         console.log("Response status:", response.status);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "An error occurred",
//       });
//     }
//   };

//   const updateProject = async () => {
//     const token = localStorage.getItem("token");

//     try {
//       const apiUrl = `https://localhost:44380/api/ProjectManagement/UpdateProject/${selectedProject.Id}`;

//       const payload = {
//         ProjectName: formData.ProjectName,
//         TaskName: formData.TaskName,
//         TaskDescription: formData.TaskDescription,
//       };

//       const response = await axios.put(apiUrl, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.status === 204) {
//         Swal.fire({
//           icon: "success",
//           title: "Project updated successfully",
//         });
//         handleModalClose();

//         // Update the reports state immediately
//         const updatedReports = reports.map((report) =>
//           report.Id === selectedProject.Id ? { ...report, ...payload } : report
//         );
//         setReports(updatedReports);
//         setFilteredReports(updatedReports); // Update filteredReports as well if needed
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Failed to update project",
//         });
//         console.log("Response status:", response.status);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "An error occurred",
//       });
//     }
//   };

//   const deleteProject = async (projectId) => {
//     const token = localStorage.getItem("token");

//     try {
//       const apiUrl = `https://localhost:44380/api/ProjectManagement/DeleteProject/${projectId}`;

//       const response = await axios.delete(apiUrl, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 204) {
//         Swal.fire({
//           icon: "success",
//           title: "Project deleted successfully",
//         });

//         // Remove the project from state immediately
//         const updatedReports = reports.filter(
//           (report) => report.Id !== projectId
//         );
//         setReports(updatedReports);
//         setFilteredReports(updatedReports); // Update filteredReports as well if needed
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Failed to delete project",
//         });
//         console.log("Response status:", response.status);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "An error occurred",
//       });
//     }
//   };
//   const onSubmit = async (e) => {
//     e.preventDefault();

//     // Validate Required Fields
//     let errors = {};
//     if (!formData.ProjectName) {
//       errors.ProjectName = "Project Name is required";
//     }
//     if (!formData.TaskName) {
//       errors.TaskName = "Task Name is required";
//     }
//     if (!formData.TaskDescription) {
//       errors.TaskDescription = "Task Description is required";
//     }

//     // Validate Length Constraints
//     if (
//       !errors.ProjectName &&
//       (formData.ProjectName.length < 3 || formData.ProjectName.length > 50)
//     ) {
//       errors.ProjectName = "Project Name must be between 3 and 50 characters";
//     }
//     if (
//       !errors.TaskName &&
//       (formData.TaskName.length < 3 || formData.TaskName.length > 50)
//     ) {
//       errors.TaskName = "Task Name must be between 3 and 50 characters";
//     }
//     if (
//       !errors.TaskDescription &&
//       (formData.TaskDescription.length < 10 ||
//         formData.TaskDescription.length > 500)
//     ) {
//       errors.TaskDescription =
//         "Task Description must be between 10 and 500 characters";
//     }

//     setValidationErrors(errors);

//     if (Object.keys(errors).length === 0) {
//       if (selectedProject) {
//         await updateProject();
//       } else {
//         await createProject();
//       }
//     }
//   };

//   const handleEdit = (report) => {
//     setSelectedProject(report);
//     setIsModalOpen(true);
//     setFormData({
//       ProjectName: report.ProjectName,
//       TaskName: report.TaskName,
//       TaskDescription: report.TaskDescription,
//     });
//     setValidationErrors({});
//   };

//   const handleDelete = (projectId) => {
//     Swal.fire({
//       icon: "warning",
//       title: "Are you sure?",
//       text: "You will not be able to recover this project!",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "No, keep it",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteProject(projectId);
//       }
//     });
//   };

//   return (
//     <div className="table-container">
//       <h2 className="table-heading mb-3">Project Records</h2>
//       <div className="input-table-container">
//         <div className="search-container">
//           <div className="row mb-3">
//           <div className="col-12 col-lg-4 col-md-4 col-sm-4">
//               <div className="search-container mb-3 mb-lg-0">
//                 <div className="input-btn position-relative">
//                   <input 
//                     type="text" 
//                     placeholder="Search by name ..." 
//                     className="form-control" 
//                     value={searchQuery}  
//                     onChange={handleSearchInputChange} 
//                   />
//                   <button type="button" className="btn btn-primary position-absolute">
//                     <i className="fas fa-search"></i>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="col-12 col-lg-8 col-md-8 col-sm-8 mb-3 mb-lg-3">
//               <div className="download-btn-container">
//                 <Button
//                   className="btn btn-primary create-project-btn"
//                   appearance="primary"
//                   onClick={handleModalOpen}
//                 >
//                   Create Project
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <table className="table table-bordered table-striped table-hover assigntment-table">
//           <thead className="">
//             <tr>
//               <th>Project Name</th>
//               <th>Task Name</th>
//               <th>Task Description</th>
//               <th>Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredReports
//               .sort((a, b) => {
//                 // Sort by Date in descending order
//                 const dateA = a.Date ? new Date(a.Date) : new Date(0);
//                 const dateB = b.Date ? new Date(b.Date) : new Date(0);
//                 return dateB - dateA;
//               })
//               .map((report) => (
//                 <tr key={report.Id}>
//                   <td>{report.ProjectName}</td>
//                   <td>{report.TaskName}</td>
//                   <td className="task-TaskDescription"><p>{report.TaskDescription}</p></td>
//                   <td>
//                     {report.Date
//                       ? new Date(report.Date).toLocaleDateString()
//                       : "-"}
//                   </td>
//                   <td>
//                     <Button
//                       appearance="primary"
//                       onClick={() => handleEdit(report)}
//                       className="btn btn-sm btn-primary mr-1"
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       appearance="danger"
//                       onClick={() => handleDelete(report.Id)}
//                       className="btn btn-sm btn-danger"
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal for Creating or Updating Project */}
//       <div>
//         <ModalTransition>
//           {isModalOpen && (
//             <Modal
//             className="h-auto"
//               actions={[
//                 { text: "Cancel", onClick: handleModalClose },
//                 {
//                   text: selectedProject ? "Update Project" : "Create Project",
//                   onClick: onSubmit,
//                 },
//               ]}
//               onClose={handleModalClose}
//               heading={selectedProject ? "Edit Project" : "Create New Project"}
//             >
//               <form className="comman-form" onSubmit={onSubmit}>
//                 <div>
//                   <label htmlFor="ProjectName">Project Name</label>
//                   <input
//                     type="text"
//                     name="ProjectName"
//                     value={formData.ProjectName}
//                     onChange={handleChange}
//                     className={
//                       validationErrors.ProjectName
//                         ? "is-invalid form-control"
//                         : ""
//                     }
//                   />
//                   {validationErrors.ProjectName && (
//                     <div className="invalid-feedback">
//                       {validationErrors.ProjectName}
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label htmlFor="TaskName">Task Name</label>
//                   <input
//                     type="text"
//                     name="TaskName"
//                     value={formData.TaskName}
//                     onChange={handleChange}
//                     className={
//                       validationErrors.TaskName
//                         ? "is-invalid form-control"
//                         : "form-control"
//                     }
//                   />
//                   {validationErrors.TaskName && (
//                     <div className="invalid-feedback">
//                       {validationErrors.TaskName}
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label htmlFor="TaskDescription">Task Description</label>
//                   <textarea
//                     name="TaskDescription"
//                     value={formData.TaskDescription}
//                     onChange={handleChange}
//                     className={
//                       validationErrors.TaskDescription
//                         ? "is-invalid "
//                         : ""
//                     }
//                   />
//                   {validationErrors.TaskDescription && (
//                     <div className="invalid-feedback">
//                       {validationErrors.TaskDescription}
//                     </div>
//                   )}
//                 </div>
//                 <div className="mt-3 d-flex justify-content-center">
//                   <Button className="comman-btn" type="submit" appearance="primary">
//                     {selectedProject ? "Update Project" : "Create Project"}
//                   </Button>
//                 </div>
//               </form>
//             </Modal>
//           )}
//         </ModalTransition>
//       </div>
//     </div>
//   );
// }

// export default CreateProject;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@atlaskit/button";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import Swal from "sweetalert2";
import { MdModeEdit, MdDelete, MdClose, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";


function CreateProject() {
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredReports, setFilteredReports] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchDate, setSearchDate] = useState(''); 

  const [perPage, setPerPage] = useState(5);

  const [formData, setFormData] = useState({
    ProjectName: "",
    TaskName: "",
    TaskDescription: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(5); /// Number of projects per page

  useEffect(() => {
    fetchReports();
  }, []);


  const totalPages = Math.ceil(filteredReports.length / perPage);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44380/api/ProjectManagement/GetAllProjects",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setReports(response.data);
      setFilteredReports(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = reports.filter(
      (report) =>
        report.ProjectName.toLowerCase().includes(query.toLowerCase()) ||
        report.TaskName.toLowerCase().includes(query.toLowerCase()) ||
        report.TaskDescription.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredReports(filtered);
    setCurrentPage(1); // Reset pagination to first page when searching
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setSelectedProject(null);
    setFormData({
      ProjectName: "",
      TaskName: "",
      TaskDescription: "",
    });
    setValidationErrors({});
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormData({
      ProjectName: "",
      TaskName: "",
      TaskDescription: "",
    });
    setValidationErrors({});
  };


  
  const validateForm = () => {
    let errors = {};

    // Validate Length Constraints
    if (formData.ProjectName.length < 3 || formData.ProjectName.length > 50) {
      errors.ProjectName = "Project Name must be between 3 and 50 characters";
    }
    if (formData.TaskName.length < 3 || formData.TaskName.length > 50) {
      errors.TaskName = "Task Name must be between 3 and 50 characters";
    }
    if (
      formData.TaskDescription.length < 10 ||
      formData.TaskDescription.length > 500
    ) {
      errors.TaskDescription =
        "Task Description must be between 10 and 500 characters";
    }

    setValidationErrors(errors);
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate Length Constraints on change
    let errors = { ...validationErrors };
    if (name === "ProjectName") {
      if (value.length < 3 || value.length > 50) {
        errors.ProjectName = "Project Name must be between 3 and 50 characters";
      } else {
        errors.ProjectName = undefined;
      }
    }
    if (name === "TaskName") {
      if (value.length < 3 || value.length > 50) {
        errors.TaskName = "Task Name must be between 3 and 50 characters";
      } else {
        errors.TaskName = undefined;
      }
    }
    if (name === "TaskDescription") {
      if (value.length < 10 || value.length > 500) {
        errors.TaskDescription =
          "Task Description must be between 10 and 500 characters";
      } else {
        errors.TaskDescription = undefined;
      }
    }

    setValidationErrors(errors);
  };

  const createProject = async () => {
    const token = localStorage.getItem("token");

    try {
      const payload = {
        ProjectName: formData.ProjectName,
        TaskName: formData.TaskName,
        TaskDescription: formData.TaskDescription,
      };

      const response = await axios.post(
        "https://localhost:44380/api/ProjectManagement/CreateProject",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Project created successfully",
        });

        // Update state with the complete set of data for the new project
        const newProject = response.data;
        setReports([...reports, newProject]); // Append new project to reports
        setFilteredReports([...filteredReports, newProject]); // Append new project to filteredReports

        handleModalClose();
        fetchReports(); // Close modal and reset form
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to create project",
        });
        console.log("Response status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "An error occurred",
      });
    }
  };

  const updateProject = async () => {
    const token = localStorage.getItem("token");

    try {
      const apiUrl = `https://localhost:44380/api/ProjectManagement/UpdateProject/${selectedProject.Id}`;

      const payload = {
        ProjectName: formData.ProjectName,
        TaskName: formData.TaskName,
        TaskDescription: formData.TaskDescription,
      };

      const response = await axios.put(apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        Swal.fire({
          icon: "success",
          title: "Project updated successfully",
        });
        handleModalClose();

        // Update the reports state immediately
        const updatedReports = reports.map((report) =>
          report.Id === selectedProject.Id ? { ...report, ...payload } : report
        );
        setReports(updatedReports);
        setFilteredReports(updatedReports); // Update filteredReports as well if needed
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to update project",
        });
        console.log("Response status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "An error occurred",
      });
    }
  };

  const deleteProject = async (projectId) => {
    const token = localStorage.getItem("token");

    try {
      const apiUrl = `https://localhost:44380/api/ProjectManagement/DeleteProject/${projectId}`;

      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        Swal.fire({
          icon: "success",
          title: "Project deleted successfully",
        });

        // Remove the project from state immediately
        const updatedReports = reports.filter(
          (report) => report.Id !== projectId
        );
        setReports(updatedReports);
        setFilteredReports(updatedReports); // Update filteredReports as well if needed
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to delete project",
        });
        console.log("Response status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "An error occurred",
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate Required Fields
    let errors = {};
    if (!formData.ProjectName) {
      errors.ProjectName = "Project Name is required";
    }
    if (!formData.TaskName) {
      errors.TaskName = "Task Name is required";
    }
    if (!formData.TaskDescription) {
      errors.TaskDescription = "Task Description is required";
    }

    // Validate Length Constraints
    if (
      !errors.ProjectName &&
      (formData.ProjectName.length < 3 || formData.ProjectName.length > 50)
    ) {
      errors.ProjectName = "Project Name must be between 3 and 50 characters";
    }
    if (
      !errors.TaskName &&
      (formData.TaskName.length < 3 || formData.TaskName.length > 50)
    ) {
      errors.TaskName = "Task Name must be between 3 and 50 characters";
    }
    if (
      !errors.TaskDescription &&
      (formData.TaskDescription.length < 10 ||
        formData.TaskDescription.length > 500)
    ) {
      errors.TaskDescription =
        "Task Description must be between 10 and 500 characters";
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      if (selectedProject) {
        await updateProject();
      } else {
        await createProject();
      }
    }
  };

  const handleEdit = (report) => {
    setSelectedProject(report);
    setIsModalOpen(true);
    setFormData({
      ProjectName: report.ProjectName,
      TaskName: report.TaskName,
      TaskDescription: report.TaskDescription,
    });
    setValidationErrors({});
  };

  const handleDelete = (projectId) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You will not be able to recover this project!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject(projectId);
      }
    });
  };

  // Pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredReports.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  // Function to handle pagination logic
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };



  return (
    <div className="table-container">
      <h2 className="table-heading mb-3">Project Records</h2>
      <div className="input-table-container">
        <div className="search-container">
          <div className="row mb-3">
            <div className="col-12 col-lg-4 col-md-4 col-sm-4">
              <div className="search-container mb-3 mb-lg-0">
                <div className="input-btn position-relative">
                  <input
                    type="text"
                    placeholder="Search by name ..."
                    className="form-control"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  <button type="button" className="btn btn-primary position-absolute">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-8 col-md-8 col-sm-8 mb-3 mb-lg-3">
              <div className="download-btn-container">
                <Button
                  className="btn btn-primary create-project-btn"
                  appearance="primary"
                  onClick={handleModalOpen}
                >
                  Create Project
                </Button>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-bordered table-striped table-hover">
          <thead className="">
            <tr>
              <th>Project Name</th>
              <th>Task Name</th>
              <th>Task Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects
              .sort((a, b) => {
                // Sort by Date in descending order
                const dateA = a.Date ? new Date(a.Date) : new Date(0);
                const dateB = b.Date ? new Date(b.Date) : new Date(0);
                return dateB - dateA;
              })
              .map((report) => (
                <tr key={report.Id}>
                  <td>{report.ProjectName}</td>
                  <td>{report.TaskName}</td>
                  <td className="task-TaskDescription"><p>{report.TaskDescription}</p></td>
                  <td>
                    {report.Date
                      ? new Date(report.Date).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    <Button
                      appearance="primary"
                      onClick={() => handleEdit(report)}
                      className="btn btn-sm btn-primary mr-1"
                    >
                      Edit
                    </Button>
                    <Button
                      appearance="danger"
                      onClick={() => handleDelete(report.Id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
  {/* Pagination */}
  {filteredReports.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <nav>
            <ul className="pagination justify-content-end">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={goToPreviousPage}>
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }).map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                  <button onClick={() => paginate(index + 1)} className="page-link">
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={goToNextPage}>
                  Next <MdKeyboardArrowRight size={18} />
                </button>
              </li>
            </ul>
          </nav>
          {/* <button className="btn btn-primary" onClick={handleModalOpen}>
            Create Project
          </button> */}
        </div>
      )}

      {/* Modal for Creating or Updating Project */}
      <div>
        <ModalTransition>
          {isModalOpen && (
            <Modal
              actions={[
                { text: "Cancel", onClick: handleModalClose },
                {
                  text: selectedProject ? "Update Project" : "Create Project",
                  onClick: onSubmit,
                },
              ]}
              onClose={handleModalClose}
              heading={selectedProject ? "Edit Project" : "Create New Project"}
            >
              <form onSubmit={onSubmit}>
                <div>
                  <label htmlFor="ProjectName">Project Name</label>
                  <input
                    type="text"
                    name="ProjectName"
                    value={formData.ProjectName}
                    onChange={handleChange}
                    className={
                      validationErrors.ProjectName
                        ? "is-invalid form-control"
                        : "form-control"
                    }
                  />
                  {validationErrors.ProjectName && (
                    <div className="invalid-feedback">
                      {validationErrors.ProjectName}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="TaskName">Task Name</label>
                  <input
                    type="text"
                    name="TaskName"
                    value={formData.TaskName}
                    onChange={handleChange}
                    className={
                      validationErrors.TaskName
                        ? "is-invalid form-control"
                        : "form-control"
                    }
                  />
                  {validationErrors.TaskName && (
                    <div className="invalid-feedback">
                      {validationErrors.TaskName}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="TaskDescription">Task Description</label>
                  <textarea
                    name="TaskDescription"
                    value={formData.TaskDescription}
                    onChange={handleChange}
                    className={
                      validationErrors.TaskDescription
                        ? "is-invalid form-control"
                        : "form-control"
                    }
                  />
                  {validationErrors.TaskDescription && (
                    <div className="invalid-feedback">
                      {validationErrors.TaskDescription}
                    </div>
                  )}
                </div>
                <div className="mt-3 d-flex justify-content-center">
                  <Button type="submit" appearance="primary">
                    {selectedProject ? "Update Project" : "Create Project"}
                  </Button>
                </div>
              </form>
            </Modal>
          )}
        </ModalTransition>
      </div>
    </div>
  );
}

export default CreateProject;
