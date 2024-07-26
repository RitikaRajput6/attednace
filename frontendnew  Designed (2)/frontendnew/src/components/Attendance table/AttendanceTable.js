// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useForm } from "react-hook-form";
// import { MdModeEdit, MdDelete, MdClose } from "react-icons/md";
// import Button from "@atlaskit/button";
// import Modal, {
//   ModalTransition,
//   ModalHeader,
//   ModalTitle,
//   ModalBody,
// } from "@atlaskit/modal-dialog";

// import "../../css/index.css";

// const AttendanceTable = () => {
//   const [employees, setEmployees] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editEmployee, setEditEmployee] = useState(null);
//   // const { register, handleSubmit, reset, setValue, formState: { errors }, trigger } = useForm({
//   //   mode: 'onChange', // Trigger validation on change
//   // });
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors },
//     trigger,
//     getValues,
//   } = useForm({
//     mode: "onChange", // Trigger validation on change
//   });
//   const token = localStorage.getItem("token");

//   const designations = [
//     { value: "UI/UX Designer", label: "UI/UX Designer" },
//     { value: "Software Engineer", label: "Software Engineer" },
//     {
//       value: "Quality Assurance (QA) Engineer",
//       label: "Quality Assurance (QA) Engineer",
//     },
//     { value: "Business Analyst", label: "Business Analyst" },
//     { value: "Content Writer", label: "Content Writer" },
//     { value: "DevOps Engineer", label: "DevOps Engineer" },
//     {
//       value: "Database Administrator (DBA)",
//       label: "Database Administrator (DBA)",
//     },
//   ];

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const isoDate = new Date(dateString);
//     const day = isoDate.getDate().toString().padStart(2, "0");
//     const month = (isoDate.getMonth() + 1).toString().padStart(2, "0");
//     const year = isoDate.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get(
//         "https://localhost:44380/api/UserManagement/GetAllEmployee",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setEmployees(response.data);
//       setFilteredEmployees(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const onSubmit = async (data) => {
//     try {
//       const endpoint = editEmployee
//         ? `UpdateEmployee/${editEmployee.Id}`
//         : "AddEmployee";
//       const method = editEmployee ? "put" : "post";
//       const response = await axios[method](
//         `https://localhost:44380/api/UserManagement/${endpoint}`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200 || response.status === 201) {
//         const action = editEmployee ? "Updated" : "Added";
//         Swal.fire({
//           icon: "success",
//           title: `${action} Successfully`,
//           text: `Employee details have been ${action.toLowerCase()} successfully.`,
//           confirmButtonText: "OK",
//         }).then(() => {
//           fetchEmployees();
//           handleModalClose();
//         });
//       } else {
//         console.error("Failed to add/update employee:", response);
//         Swal.fire({
//           icon: "error",
//           title: `Failed to ${editEmployee ? "update" : "add"} employee`,
//           text: response.data.message || "Something went wrong!",
//         });
//       }
//     } catch (error) {
//       console.error("Error adding/updating employee:", error);
//       Swal.fire({
//         icon: "error",
//         title: "An error occurred",
//         text: error.message,
//       });
//     }
//   };

//   const handleDelete = async (Id) => {
//     try {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "You will not be able to recover this employee record!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, Delete it!",
//         cancelButtonText: "No, Cancel",
//         reverseButtons: true,
//       });

//       if (result.isConfirmed) {
//         const response = await axios.delete(
//           `https://localhost:44380/api/UserManagement/SoftDeleteUser/${Id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         if (response.status === 200) {
//           Swal.fire({
//             icon: "success",
//             title: "Employee deleted successfully",
//             showConfirmButton: false,
//             timer: 1500,
//           });
//           fetchEmployees();
//         } else {
//           Swal.fire({
//             icon: "error",
//             title: "Failed to delete employee",
//             text: response.data.message || "Something went wrong!",
//           });
//         }
//       } else if (result.dismiss === Swal.DismissReason.cancel) {
//         Swal.fire("Cancelled", "Your employee record is safe", "error");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "An error occurred",
//         text: error.message,
//       });
//     }
//   };

//   const handleSearchInputChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     const filtered = employees.filter(
//       (employee) =>
//         employee.FirstName.toLowerCase().includes(query.toLowerCase()) ||
//         employee.LastName.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredEmployees(filtered);
//   };

//   const handleModalOpen = () => {
//     setIsModalOpen(true);
//     setEditEmployee(null);
//     reset();
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setEditEmployee(null);
//     reset();
//   };

//   const handleEditOpen = (employee) => {
//     setEditEmployee(employee);
//     setIsModalOpen(true);
//     // Set form values for editing
//     setValue("FirstName", employee.FirstName);
//     setValue("LastName", employee.LastName);
//     setValue("Email", employee.Email);
//     setValue("PhoneNumber", employee.PhoneNumber);
//     setValue("Role", employee.Role);
//     setValue("Designation", employee.Designation);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValue(name, value);
//     trigger(name); // Trigger validation for the field
//   };

//   const validatePasswordMatch = (value, { Password }) => {
//     return value === Password || "Passwords do not match";
//   };

//   const validateStrongPassword = (value) => {
//     // Password should contain at least one lowercase letter, one uppercase letter, one number, and one special character
//     if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s])/.test(value)) {
//       return "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character";
//     }
//     return true;
//   };

//   const isAdmin = localStorage.getItem("Role") === "Admin";

  // return (
  //   <div className="table-container">
  //     <h2 className="table-heading mb-3">Employees Details</h2>

  //     <div className="row align-items-center mb-3">
  //       <div className="col-12 col-lg-8 col-md-8 col-sm-8 mb-3 mb-lg-3">
  //         {isAdmin && (
  //           <Button className="comman-btn" appearance="primary" onClick={handleModalOpen}>
  //             Add User
  //           </Button>
  //         )}
  //       </div>
  //       <div className="col-12 col-lg-4 col-md-4 col-sm-4">
  //         <div className="search-container mb-3">
  //           <div className="input-btn position-relative">
  //             <input
  //               type="text"
  //               placeholder="Search by name..."
  //               value={searchQuery}
  //               onChange={handleSearchInputChange}
  //             />
  //             <button
  //               type="button"
  //               className="btn btn-primary position-absolute"
  //             >
  //               <i className="fas fa-search"></i>
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

      // <ModalTransition>
      //   {isModalOpen && (
      //     <Modal onClose={handleModalClose}>
      //       <ModalHeader>
      //         <ModalTitle>
      //           {editEmployee ? "Edit User" : "Create New User"}
      //         </ModalTitle>
      //         <div style={{ position: "absolute", top: 10, right: 10 }}>
      //           <MdClose
      //             size={24}
      //             onClick={handleModalClose}
      //             style={{ cursor: "pointer" }}
      //           />
      //         </div>
      //       </ModalHeader>
      //       <ModalBody className="body-padding">
      //         <form onSubmit={handleSubmit(onSubmit)}>
      //           <div className="row">
      //             <div className="col-12 col-lg-6 col-md-6 col-padding">
      //               <div className="form-group">
      //               <label htmlFor="FirstName">First Name:</label>
      //               <input
      //                 id="FirstName"
      //                 type="text"
      //                 name="FirstName"
      //                 {...register("FirstName", {
      //                   required: "First Name is required",
      //                   minLength: {
      //                     value: 3,
      //                     message: "First Name should be at least 3 characters",
      //                   },
      //                   maxLength: {
      //                     value: 20,
      //                     message: "First Name should not exceed 10 characters",
      //                   },
      //                   pattern: {
      //                     value: /^[A-Za-z]+$/i,
      //                     message:
      //                       "First Name should only contain alphabetic characters",
      //                   },
      //                 })}
      //                 onChange={handleChange}
      //               />
      //               {errors.FirstName && (
      //                 <span className="required-field">
      //                   {errors.FirstName.message}
      //                 </span>
      //               )}
      //             </div>
      //             </div>

      //             <div className="col-12 col-lg-6 col-md-6 col-padding">
      //               <div className="form-group">
      //               <label htmlFor="LastName">Last Name:</label>
      //               <input
      //                 id="LastName"
      //                 type="text"
      //                 name="LastName"
      //                 {...register("LastName", {
      //                   required: {
      //                     value: true,
      //                     message: "Last Name is required",
      //                   },
      //                   minLength: {
      //                     value: 3,
      //                     message: "Last Name should be at least 3 characters",
      //                   },
      //                   maxLength: {
      //                     value: 20,
      //                     message: "Last Name should not exceed 10 characters",
      //                   },
      //                   pattern: {
      //                     value: /^[A-Za-z]+$/i,
      //                     message:
      //                       "Last Name should only contain alphabetic characters",
      //                   },
      //                 })}
      //                 onChange={handleChange}
      //               />
      //               {errors.LastName && (
      //                 <span className="required-field">
      //                   {errors.LastName.message}
      //                 </span>
      //               )}
      //             </div>
      //             </div>

      //             <div className="col-12 col-lg-6 col-md-6 col-padding">
      //               <div className="form-group">
      //               <label htmlFor="Email">Email:</label>
      //               <input
      //                 id="Email"
      //                 type="email"
      //                 name="Email"
      //                 {...register("Email", {
      //                   required: { value: true, message: "Email is required" },
      //                   pattern: {
      //                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      //                     message: "Invalid email address",
      //                   },
      //                 })}
      //                 onChange={handleChange}
      //               />
      //               {errors.Email && (
      //                 <span className="required-field">{errors.Email.message}</span>
      //               )}
      //             </div>
      //             </div>

      //             <div className="col-12 col-lg-6 col-md-6 col-padding">
      //               <div className="form-group">
      //               <label htmlFor="PhoneNumber">Phone Number:</label>
      //               <input
      //                 id="PhoneNumber"
      //                 type="tel"
      //                 name="PhoneNumber"
      //                 {...register("PhoneNumber", {
      //                   required: {
      //                     value: true,
      //                     message: "Phone Number is required",
      //                   },
      //                   pattern: {
      //                     value: /^\d{10}$/,
      //                     message: "Invalid phone number format",
      //                   },
      //                 })}
      //                 onChange={handleChange}
      //               />
      //               {errors.PhoneNumber && (
      //                 <span className="required-field">
      //                   {errors.PhoneNumber.message}
      //                 </span>
      //               )}
      //             </div>
      //             </div>

      //             <div className="col-12 col-lg-6 col-md-6 col-padding">
      //               <div className="form-group">
      //                   <label htmlFor="Role">Role:</label>
      //                   <select
      //                     id="Role"
      //                     name="Role"
      //                     {...register("Role", { required: true })}
      //                     onChange={handleChange}
      //                   >
      //                     <option value="">Select Role</option>
      //                     <option value="Admin">Admin</option>
      //                     <option value="Employee">Employee</option>
      //                     <option value="HR">HR</option>
      //                   </select>
      //                   {errors.Role && (
      //                     <span className="required-field">Role is required</span>
      //                   )}
      //                 </div>
                     
      //             </div>

      //             <div className="col-12 col-lg-6 col-md-6 col-padding">
      //               <div className="form-group">
      //                   <label htmlFor="Designation">Designation:</label>
      //                   <select
      //                     id="Designation"
      //                     name="Designation"
      //                     {...register("Designation", {
      //                       required: "Designation is required",
      //                     })}
      //                     onChange={handleChange}
      //                   >
      //                     <option value="">Select Designation</option>
      //                     {designations.map((designation, index) => (
      //                       <option key={index} value={designation.value}>
      //                         {designation.label}
      //                       </option>
      //                     ))}
      //                   </select>
      //                   {errors.Designation && (
      //                     <span className="required-field">
      //                       {errors.Designation.message}
      //                     </span>
      //                   )}
      //                 </div>
      //             </div>
      //             <div className="col-12 col-lg-6 col-md-6 col-padding">
      //             {editEmployee === null && (
      //                 <div>
      //                   <div className="form-group">
      //                     <label htmlFor="Password">Password:</label>
      //                     <input
      //                       id="Password"
      //                       type="password"
      //                       name="Password"
      //                       {...register("Password", {
      //                         required: "Password is required",
      //                         minLength: {
      //                           value: 6,
      //                           message: "Password should be at least 6 characters",
      //                         },
      //                         maxLength: {
      //                           value: 30,
      //                           message: "Password should not exceed 30 characters",
      //                         },
      //                         validate: {
      //                           strongPassword: validateStrongPassword,
      //                         },
      //                       })}
      //                       onChange={handleChange}
      //                     />
      //                     {errors.Password && (
      //                       <span className="required-field">
      //                         {errors.Password.message}
      //                       </span>
      //                     )}
      //                   </div>
                    
      //                   </div>
      //                 )}
      //             </div>

      //             <div className="col-12 col-lg-6 col-md-6 col-padding">
      //             <div className="form-group">
      //                     <label htmlFor="ConfirmPassword">Confirm Password:</label>
      //                       <input
      //                         id="ConfirmPassword"
      //                         type="password"
      //                         name="ConfirmPassword"
      //                         {...register("ConfirmPassword", {
      //                           required: "Confirm Password is required",
      //                           validate: {
      //                             passwordMatch: (value) =>
      //                               validatePasswordMatch(value, {
      //                                 Password: getValues("Password"),
      //                               }),
      //                           },
      //                         })}
      //                         onChange={handleChange}
      //                       />
      //                       {errors.ConfirmPassword && (
      //                         <span className="required-field">
      //                           {errors.ConfirmPassword.message}
      //                         </span>
      //                       )}
      //                     </div>
      //             </div>
      //           </div>
      //           <div className="form-btn">
      //             <Button className="comman-btn mt-3" type="submit" appearance="primary">
      //               {editEmployee ? "Update" : "Add"}
      //             </Button>
      //           </div>
      //         </form>
      //       </ModalBody>
      //     </Modal>
      //   )}
      // </ModalTransition>

//       <div className="table-responsive">
//         <table className="table table-striped table-bordered">
//           <thead>
//             <tr>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Email</th>
//               <th>Phone Number</th>
//               <th>Role</th>
//               <th>Designation</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEmployees.map((employee) => (
//               <tr key={employee.Id}>
//                 <td>{employee.FirstName}</td>
//                 <td>{employee.LastName}</td>
//                 <td>{employee.Email}</td>
//                 <td>{employee.PhoneNumber}</td>
//                 <td>{employee.Role}</td>
//                 <td>{employee.Designation}</td>
//                 <td>
//                   {isAdmin && (
//                     <>
//                       <MdModeEdit
//                         size={20}
//                         onClick={() => handleEditOpen(employee)}
//                         style={{ cursor: "pointer", marginRight: "5px" }}
//                       />
//                       <MdDelete
//                         size={20}
//                         onClick={() => handleDelete(employee.Id)}
//                         style={{ cursor: "pointer" }}
//                       />
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AttendanceTable;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { MdModeEdit, MdDelete, MdClose, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Button from "@atlaskit/button";
import Modal, { ModalTransition, ModalHeader, ModalTitle, ModalBody } from "@atlaskit/modal-dialog";
import { useForm } from "react-hook-form";
import "../../css/index.css";

const AttendanceTable = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(); 
  const [searchDate, setSearchDate] = useState(''); 

  const [perPage, setPerPage] = useState(5); // Default items per page
  // const { register, handleSubmit, reset, setValue, formState: { errors }, trigger } = useForm({
  //   mode: 'onChange', // Trigger validation on change
  // });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    trigger,
    getValues,
  } = useForm({
    mode: "onChange", // Trigger validation on change
  });
  const token = localStorage.getItem("token");

  const designations = [
    { value: "UI/UX Designer", label: "UI/UX Designer" },
    { value: "Software Engineer", label: "Software Engineer" },
    {
      value: "Quality Assurance (QA) Engineer",
      label: "Quality Assurance (QA) Engineer",
    },
    { value: "Business Analyst", label: "Business Analyst" },
    { value: "Content Writer", label: "Content Writer" },
    { value: "DevOps Engineer", label: "DevOps Engineer" },
    {
      value: "Database Administrator (DBA)",
      label: "Database Administrator (DBA)",
    },
  ];

  useEffect(() => {
    fetchEmployees();
  }, [searchDate]);
  

  const totalPages = Math.ceil(filteredEmployees.length / perPage);


  const formatDate = (dateString) => {
    if (!dateString) return "";
    const isoDate = new Date(dateString);
    const day = isoDate.getDate().toString().padStart(2, "0");
    const month = (isoDate.getMonth() + 1).toString().padStart(2, "0");
    const year = isoDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleNextButtonClick = () => {
    // Call goToNextPage function when the next button is clicked
    goToNextPage();
  };
  

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44380/api/UserManagement/GetAllEmployee",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);


  const handleAddData = () => {
    // Implement your logic here for adding data
    console.log('Adding data...');
    // Example: You might update the state or call an API to add new data
  };

  // Calculate total pages
  // const totalPages = Math.ceil(filteredEmployees.length / perPage);

  // // Example function to paginate
  // const paginate = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  //   // Logic to fetch or filter data based on pageNumber
  // };

  // // Example function to go to previous page
  // const goToPreviousPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //     // Logic to fetch or filter data for previous page
  //   }
  // };

  // // Example function to go to next page
  // const goToNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //     // Logic to fetch or filter data for next page
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      const endpoint = editEmployee
        ? `UpdateEmployee/${editEmployee.Id}`
        : "AddEmployee";
      const method = editEmployee ? "put" : "post";
      const response = await axios[method](
        `https://localhost:44380/api/UserManagement/${endpoint}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const action = editEmployee ? "Updated" : "Added";
        Swal.fire({
          icon: "success",
          title: `${action} Successfully`,
          text: `Employee details have been ${action.toLowerCase()} successfully.`,
          confirmButtonText: "OK",
        }).then(() => {
          fetchEmployees();
          handleModalClose();
        });
      } else {
        console.error("Failed to add/update employee:", response);
        Swal.fire({
          icon: "error",
          title: `Failed to ${editEmployee ? "update" : "add"} employee`,
          text: response.data.message || "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Error adding/updating employee:", error);
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: error.message,
      });
    }
  };

  const handleDelete = async (Id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this employee record!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "No, Cancel",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          `https://localhost:44380/api/UserManagement/SoftDeleteUser/${Id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Employee deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          fetchEmployees();
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to delete employee",
            text: response.data.message || "Something went wrong!",
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your employee record is safe", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: error.message,
      });
    }
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = employees.filter(
      (employee) =>
        employee.FirstName.toLowerCase().includes(query.toLowerCase()) ||
        employee.LastName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmployees(filtered);
    setCurrentPage(1); // Reset pagination to first page when search query changes
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setEditEmployee(null);
    reset();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditEmployee(null);
    reset();
  };

  const handleEditOpen = (employee) => {
    setEditEmployee(employee);
    setIsModalOpen(true);
    // Set form values for editing
    setValue("FirstName", employee.FirstName);
    setValue("LastName", employee.LastName);
    setValue("Email", employee.Email);
    setValue("PhoneNumber", employee.PhoneNumber);
    setValue("Role", employee.Role);
    setValue("Designation", employee.Designation);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value);
    trigger(name); // Trigger validation for the field
  };

  const validatePasswordMatch = (value, { Password }) => {
    return value === Password || "Passwords do not match";
  };

  const validateStrongPassword = (value) => {
    // Password should contain at least one lowercase letter, one uppercase letter, one number, and one special character
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s])/.test(value)) {
      return "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character";
    }
    return true;
  };

  const isAdmin = localStorage.getItem("Role") === "Admin";
  const indexOfLastEmployee = currentPage * perPage;
  const indexOfFirstEmployee = indexOfLastEmployee - perPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Change items per page
  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Previous page handler
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next page handler
  const goToNextPage = () => {
    if (currentPage < Math.ceil(filteredEmployees.length / perPage)) {
      setCurrentPage(currentPage + 1);
    }
  };


  return (
    <div className="table-container">
      <h2 className="table-heading mb-3">Employees Details</h2>

      <div className="row align-items-center mb-3">
        <div className="col-12 col-lg-8 col-md-8 col-sm-8 mb-3 mb-lg-3">
          {isAdmin && (
            <Button className="comman-btn" appearance="primary" onClick={handleModalOpen}>
              Add User
            </Button>
          )}
        </div>
        <div className="col-12 col-lg-4 col-md-4 col-sm-4">
          <div className="search-container mb-3">
            <div className="input-btn position-relative">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <button
                type="button"
                className="btn btn-primary position-absolute"
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ModalTransition>
        {isModalOpen && (
          <Modal onClose={handleModalClose}>
            <ModalHeader>
              <ModalTitle>
                {editEmployee ? "Edit User" : "Create New User"}
              </ModalTitle>
              <div style={{ position: "absolute", top: 10, right: 10 }}>
                <MdClose
                  size={24}
                  onClick={handleModalClose}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </ModalHeader>
            <ModalBody className="body-padding">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-12 col-lg-6 col-md-6 col-padding">
                    <div className="form-group">
                    <label htmlFor="FirstName">First Name:</label>
                    <input
                      id="FirstName"
                      type="text"
                      name="FirstName"
                      {...register("FirstName", {
                        required: "First Name is required",
                        minLength: {
                          value: 3,
                          message: "First Name should be at least 3 characters",
                        },
                        maxLength: {
                          value: 20,
                          message: "First Name should not exceed 10 characters",
                        },
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message:
                            "First Name should only contain alphabetic characters",
                        },
                      })}
                      onChange={handleChange}
                    />
                    {errors.FirstName && (
                      <span className="required-field">
                        {errors.FirstName.message}
                      </span>
                    )}
                  </div>
                  </div>

                  <div className="col-12 col-lg-6 col-md-6 col-padding">
                    <div className="form-group">
                    <label htmlFor="LastName">Last Name:</label>
                    <input
                      id="LastName"
                      type="text"
                      name="LastName"
                      {...register("LastName", {
                        required: {
                          value: true,
                          message: "Last Name is required",
                        },
                        minLength: {
                          value: 3,
                          message: "Last Name should be at least 3 characters",
                        },
                        maxLength: {
                          value: 20,
                          message: "Last Name should not exceed 10 characters",
                        },
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message:
                            "Last Name should only contain alphabetic characters",
                        },
                      })}
                      onChange={handleChange}
                    />
                    {errors.LastName && (
                      <span className="required-field">
                        {errors.LastName.message}
                      </span>
                    )}
                  </div>
                  </div>

                  <div className="col-12 col-lg-6 col-md-6 col-padding">
                    <div className="form-group">
                    <label htmlFor="Email">Email:</label>
                    <input
                      id="Email"
                      type="email"
                      name="Email"
                      {...register("Email", {
                        required: { value: true, message: "Email is required" },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      onChange={handleChange}
                    />
                    {errors.Email && (
                      <span className="required-field">{errors.Email.message}</span>
                    )}
                  </div>
                  </div>

                  <div className="col-12 col-lg-6 col-md-6 col-padding">
                    <div className="form-group">
                    <label htmlFor="PhoneNumber">Phone Number:</label>
                    <input
                      id="PhoneNumber"
                      type="tel"
                      name="PhoneNumber"
                      {...register("PhoneNumber", {
                        required: {
                          value: true,
                          message: "Phone Number is required",
                        },
                        pattern: {
                          value: /^\d{10}$/,
                          message: "Invalid phone number format",
                        },
                      })}
                      onChange={handleChange}
                    />
                    {errors.PhoneNumber && (
                      <span className="required-field">
                        {errors.PhoneNumber.message}
                      </span>
                    )}
                  </div>
                  </div>

                  <div className="col-12 col-lg-6 col-md-6 col-padding">
                    <div className="form-group">
                        <label htmlFor="Role">Role:</label>
                        <select
                          id="Role"
                          name="Role"
                          {...register("Role", { required: true })}
                          onChange={handleChange}
                        >
                          <option value="">Select Role</option>
                          <option value="Admin">Admin</option>
                          <option value="Employee">Employee</option>
                          <option value="HR">HR</option>
                        </select>
                        {errors.Role && (
                          <span className="required-field">Role is required</span>
                        )}
                      </div>
                     
                  </div>

                  <div className="col-12 col-lg-6 col-md-6 col-padding">
                    <div className="form-group">
                        <label htmlFor="Designation">Designation:</label>
                        <select
                          id="Designation"
                          name="Designation"
                          {...register("Designation", {
                            required: "Designation is required",
                          })}
                          onChange={handleChange}
                        >
                          <option value="">Select Designation</option>
                          {designations.map((designation, index) => (
                            <option key={index} value={designation.value}>
                              {designation.label}
                            </option>
                          ))}
                        </select>
                        {errors.Designation && (
                          <span className="required-field">
                            {errors.Designation.message}
                          </span>
                        )}
                      </div>
                  </div>
                  <div className="col-12 col-lg-6 col-md-6 col-padding">
                  {editEmployee === null && (
                      <div>
                        <div className="form-group">
                          <label htmlFor="Password">Password:</label>
                          <input
                            id="Password"
                            type="password"
                            name="Password"
                            {...register("Password", {
                              required: "Password is required",
                              minLength: {
                                value: 6,
                                message: "Password should be at least 6 characters",
                              },
                              maxLength: {
                                value: 30,
                                message: "Password should not exceed 30 characters",
                              },
                              validate: {
                                strongPassword: validateStrongPassword,
                              },
                            })}
                            onChange={handleChange}
                          />
                          {errors.Password && (
                            <span className="required-field">
                              {errors.Password.message}
                            </span>
                          )}
                        </div>
                    
                        </div>
                      )}
                  </div>

                  <div className="col-12 col-lg-6 col-md-6 col-padding">
                  <div className="form-group ConfirmPassword">
                          <label htmlFor="ConfirmPassword">Confirm Password:</label>
                            <input
                              id="ConfirmPassword"
                              type="password"
                              name="ConfirmPassword"
                              {...register("ConfirmPassword", {
                                required: "Confirm Password is required",
                                validate: {
                                  passwordMatch: (value) =>
                                    validatePasswordMatch(value, {
                                      Password: getValues("Password"),
                                    }),
                                },
                              })}
                              onChange={handleChange}
                            />
                            {errors.ConfirmPassword && (
                              <span className="required-field">
                                {errors.ConfirmPassword.message}
                              </span>
                            )}
                          </div>
                  </div>
                </div>
                <div className="form-btn">
                  <Button className="comman-btn mt-3" type="submit" appearance="primary">
                    {editEmployee ? "Update" : "Add"}
                  </Button>
                </div>
              </form>
            </ModalBody>
          </Modal>
        )}
      </ModalTransition>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
           
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Designation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {currentEmployees.map((employee, index) => (
              <tr key={employee.Id}>
               
                <td>{employee.FirstName}</td>
                <td>{employee.LastName}</td>
                <td>{employee.Email}</td>
                <td>{employee.PhoneNumber}</td>
                <td>{employee.Role}</td>
                <td>{employee.Designation}</td>
                <td>
                  {isAdmin && (
                    <>
                      <MdModeEdit
                        size={20}
                        onClick={() => handleEditOpen(employee)}
                        style={{ cursor: "pointer", marginRight: "5px" }}
                      />
                      <MdDelete
                        size={20}
                        onClick={() => handleDelete(employee.Id)}
                        style={{ cursor: "pointer" }}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
     {/* Pagination */}
     {filteredEmployees.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <nav>
            <ul className="pagination justify-content-end">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={goToPreviousPage}>
                  <MdKeyboardArrowLeft size={18} /> Previous
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
          {/* <button onClick={handleAddData} className="btn btn-primary">
            Add Data
          </button> */}
        </div>
      )}

    </div>
  );
};

export default AttendanceTable;
