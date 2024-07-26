


import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@atlaskit/button";
import ModalDialog, { ModalTransition } from "@atlaskit/modal-dialog";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import "sweetalert2/dist/sweetalert2.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const AttendanceTable = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [searchByNameQuery, setsearchByNameQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [userData, setUserData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedViewReport, setSelectedViewReport] = useState(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false); // State for update modal
  const [newReport, setNewReport] = useState({
    ProjectName: "",
    Task: "",
    TaskDescription: EditorState.createEmpty(), // Initialize editor state
    Status: "",
  });

  const [updateReport, setUpdateReport] = useState({
    Id: "",
    ProjectName: "",
    Task: "",
    TaskDescription: EditorState.createEmpty(), // Initialize editor state
    Status: "",
  });

  const [errors, setErrors] = useState({
    ProjectName: "",
    TaskDescription: "",
    Status: "",
    // Other fields in errors
  });
  useEffect(() => {
    fetchReports();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const isoDate = new Date(dateString);
    const day = isoDate.getDate().toString().padStart(2, "0");
    const month = (isoDate.getMonth() + 1).toString().padStart(2, "0");
    const year = isoDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    let hours12 = parseInt(hours, 10);
    const ampm = hours12 >= 12 ? "PM" : "AM";
    hours12 = hours12 % 12;
    hours12 = hours12 ? hours12 : 12;
    return `${hours12}:${minutes} ${ampm}`;
  };

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");
      const endpoint =
        isAdmin || ishr ? "/GetAllReports" : "/GetAllReportsByUserId";
      const response = await axios.get(
        `https://localhost:44380/api/DailyReports${endpoint}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReports(response.data);
      setFilteredReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to fetch reports",
      });
    }
  };
  const handleAddReportEditorChange = (editorState) => {
    setNewReport((prevReport) => ({
      ...prevReport,
      TaskDescription: editorState,
    }));

    const plainText = editorState.getCurrentContent().getPlainText("");
    let error = "";

    if (plainText.trim().length === 0) {
      error = "Task Description is required.";
    } else if (plainText.length < 40) {
      error = "Task Description must be at least 40 characters long.";
    } else if (plainText.length > 200) {
      error = "Task Description cannot exceed 200 characters.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      TaskDescription: error,
    }));
  };

  const handleUpdateReportEditorChange = (editorState) => {
    setUpdateReport((prevReport) => ({
      ...prevReport,
      TaskDescription: editorState,
    }));
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value.trim().toLowerCase(); // Get the trimmed and lowercase search query
    setSearchQuery(query); // Set the search query state for potential future use

    const filtered = reports.filter((report) =>
      report.ProjectName.toLowerCase().includes(query)
    );

    setFilteredReports(filtered);
  };

  const handleSearchByName = (e) => {
    const query = e.target.value.trim().toLowerCase(); // Get the trimmed and lowercase search query
    setsearchByNameQuery(query); // Set the search query state for potential future use

    // Filter the reports array based on ProjectName or Task containing the query
    const filtered = reports.filter((report) =>
      report.FullName.toLowerCase().includes(query)
    );

    setFilteredReports(filtered); // Set the filtered reports state to update the UI
  };

  const handleViewDetails = async (report, x) => {
    debugger;

    try {
      const token = localStorage.getItem("token");
      const userId = report.UserId;
      setSelectedReport(report);
      setSelectedViewReport(report);
      setShowViewModal(x);

      if (!userId) {
        console.error("User ID is missing in the report:", report);
        return;
      }

      const response = await axios.get(
        `https://localhost:44380/api/DailyReports/GetAllReportsByCustomUserId/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData(response.data);
      setShowDetails(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to fetch user data",
      });
    }
  };

  const handleDownloadUserSpecificData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }

    try {
      const userId = selectedReport.UserId;
      const response = await axios.get(
        `https://localhost:44380/api/DailyReports/DownloadDailyReportsExcelForUser/${userId}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `user_specific_data_${userId}.xlsx`);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        link.remove();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Downloaded user specific data successfully",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to download user specific data. Invalid response data.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error downloading user specific data",
      });
    }
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAddReportInputChange = (e) => {
    const { name, value } = e.target;

    // Update state with user input
    setNewReport((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));

    // Validate fields
    if (name === "ProjectName") {
      let error = "";

      if (value.length < 4) {
        error = "Project Name must be at least 4 characters long.";
      } else if (value.length > 20) {
        error = "Project Name cannot exceed 20 characters.";
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    } else if (name === "TaskDescription") {
      let error = "";

      if (value.length < 10) {
        error = "Task Description must be at least 10 characters long.";
      } else if (value.length > 200) {
        error = "Task Description cannot exceed 200 characters.";
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    } else if (name === "Status") {
      let error = "";

      if (!value.trim()) {
        error = "Status is required.";
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    } else {
      // Clear the error for other fields if any
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleAddReport = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }

    // Check if ProjectName is empty
    if (!newReport.ProjectName.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ProjectName: "Project Name is required.",
      }));
      return;
    }

    if (!newReport.TaskDescription.getCurrentContent().hasText()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        TaskDescription: "Task Description is required.",
      }));
      return;
    }

    if (!newReport.Status.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        Status: "Status is required.",
      }));
      return;
    }

    try {
      const contentState = newReport.TaskDescription.getCurrentContent();
      const taskDescription = JSON.stringify(convertToRaw(contentState));

      const response = await axios.post(
        "https://localhost:44380/api/DailyReports/DailyReport",
        {
          ...newReport,
          TaskDescription: taskDescription,
        },
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
          title: "Success!",
          text: "Report added successfully",
        });

        setReports((prevReports) => [...prevReports, response.data]);
        fetchReports();
        setNewReport({
          ProjectName: "",
          TaskDescription: EditorState.createEmpty(),
          Status: "",
        });
        setShowModal(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add report. Invalid response status.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error adding report",
      });
    }
  };

  const handleUpdateReport = async (reportId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authorization token is missing.");
      return;
    }

    try {
      const response = await axios.put(
        `https://localhost:44380/api/DailyReports/UpdateReportById${reportId}`,
        updateReport, // Send updateReport state as request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Report updated successfully",
        });
        // Refresh the reports after update
        fetchReports();
        setShowUpdateModal(false); // Close update modal after successful update
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to update report. Invalid response status.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error updating report",
      });
    }
  };

  const handleOpenUpdateModal = (report) => {
    setUpdateReport(report);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleUpdateReportInputChange = (e) => {
    const { name, value } = e.target;

    // Validate ProjectName field
    if (name === "ProjectName") {
      // Minimum 4 characters and maximum 20 characters
      if (value.length < 4) {
        // Throw error or handle validation feedback
        console.error("Project Name must be at least 4 characters long.");
        // Optionally, prevent further state update or actions
        return;
      } else if (value.length > 20) {
        console.error("Project Name cannot exceed 20 characters.");
        // Optionally, prevent further state update or actions
        return;
      }
    }

    // Update state with user input
    setUpdateReport((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));
  };
  const isAdmin = localStorage.getItem("Role") === "Admin";
  const ishr = localStorage.getItem("Role") === "HR";
  const isAdmins = localStorage.getItem("Role") === "Employee";

  const ViewDetailsModal = ({ report, onClose }) => {
    return (
      <div className="daily-report-modal">
    <ModalTransition>
  <ModalDialog className="custom-modal" onClose={onClose} heading="Report Details">
    <div className="modal-body">
      <div className="container">
        <div className="row">
          <div className="col-md-12 Report-Details-p-tag">
            <p className="mb-2">
              <strong>Project Name:</strong> {report.ProjectName}
            </p>
            {/* <p className="mb-2"><strong>Task:</strong> {report.Task}</p> */}
            <p className="mb-2">
              <strong>Task Description:</strong> {report.TaskDescription}
            </p>
            <p className="mb-2">
              <strong>Status:</strong> {report.Status}
            </p>
            <p className="mb-2">
              <strong>Task Time:</strong> {formatTime(report.TaskTime)}
            </p>
            <p className="mb-0 pb-0">
              <strong>Today Date:</strong> {formatDate(report.TodayDate)}
            </p>
            {/* Add more details as needed */}
          </div>
        </div>
      </div>
    </div>
  </ModalDialog>
</ModalTransition>

      </div>
    );
  };
  useEffect(() => {
    // Example of setting default content programmatically
    const initialContent = EditorState.createWithContent(
      ContentState.createFromText("Dear Sir/Mam\n Subject : ")
    );

    setNewReport((prevReport) => ({
      ...prevReport,
      TaskDescription: initialContent,
      Subject: "", // Initialize Subject as blank
    }));
  }, []);

  return (
    <div className="table-container Daily-Reports-Information">
      <h2 className="table-heading mb-2">Daily Reports Information</h2>
      <div className="row mb-3">
        <div className="col-12 col-lg-8 col-md-8 col-sm-8 mb-2">
          <Button
            className="comman-btn"
            appearance="primary"
            hidden={isAdmin}
            onClick={handleModalOpen}
          >
            Add Daily Report
          </Button>
        </div>
        <div className="col-12 col-lg-4 col-md-4 col-sm-4">
          <div className="search-container mb-2">
            <div className="input-btn position-relative">
              <input
                type="text"
                placeholder="Search by name ..."
                value={searchByNameQuery}
                onChange={handleSearchByName}
                className="form-control"
                hidden={isAdmins}
              />

              <button
               hidden={isAdmins}
                type="button"
                className="btn btn-primary position-absolute"
              >
                <i    className="fas fa-search"></i>
              </button>
            </div>

            {/* {showDetails ? (
              <div className="input-btn position-relative">
                <input
                  type="text"
                  placeholder="Search by project name ..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="form-control"
                />

                <button type="button" className="btn btn-primary position-absolute">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            ) : null} */}
          </div>
        </div>
      </div>

      {showDetails ? (
        <div className="report-details-container">
          <h3 className="table-heading User-Specific-Data pb-3">User Specific Data
          </h3>
          <div className="input-table-container">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Project Name</th>
                  {/* <th scope="col">Task</th>  */}
                  <th scope="col">Task Description</th>
                  <th scope="col">Status</th>
                  <th scope="col">Task Time</th>
                  <th scope="col">Today Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.ProjectName}</td>
                    {/* <td>{data.Task}</td> */}
                    <td className="TaskDescription">{data.TaskDescription}</td>
                    <td>{data.Status}</td>
                    <td>{formatTime(data.TaskTime)}</td>
                    <td>{formatDate(data.TodayDate)}</td>
                    {/* <td>
                      {isAdmin || ishr ? (
                        <>
                          <Button onClick={() => handleOpenUpdateModal(data)}>
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button onClick={() => handleDeleteReport(data.Id)}>
                            <i className="fas fa-trash-alt"></i>
                          </Button>
                        </>
                      ) : null}
                    </td> */}
                    <td>
                    <Button onClick={() => handleViewDetails(data, true)}>
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row justify-content-center mt-3">
            <div className="col-12 d-flex gap-2">
              <Button className="comman-btn" onClick={handleDownloadUserSpecificData}>
                Download
              </Button>
              <Button className="comman-btn brown-color" onClick={() => setShowDetails(false)}>
                Back to List
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="input-table-container">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th hidden={isAdmins}>FullName</th>
                <th hidden={isAdmins}>EmployeeId</th>
                <th hidden={isAdmins}>Action</th>
                <th hidden={isAdmin || ishr}>Project Name</th>
                {/* <th hidden={isAdmin || ishr}>Task</th> */}
                <th hidden={isAdmin || ishr}>Task Description</th>
                <th hidden={isAdmin || ishr}>Status</th>
                <th hidden={isAdmin || ishr}>Task Time</th>
                <th hidden={isAdmin || ishr}>Today Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report, index) => (
                <tr key={index}>
                  <td hidden={isAdmins}>{report.FullName}</td>
                  <td hidden={isAdmins}>{report.EmployeeId}</td>
                  <td hidden={isAdmins}>
                    <Button onClick={() => handleViewDetails(report, false)}>
                      View Details
                    </Button>
                  </td>
                  <td hidden={isAdmin || ishr}>{report.ProjectName}</td>
                  {/* <td hidden={isAdmin || ishr}>{report.Task}</td> */}
                  <td hidden={isAdmin || ishr}>{report.TaskDescription}</td>
                  <td hidden={isAdmin || ishr}>{report.Status}</td>
                  <td hidden={isAdmin || ishr}>
                    {formatTime(report.TaskTime)}
                  </td>
                  <td hidden={isAdmin || ishr}>
                    {formatDate(report.TodayDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showViewModal && selectedViewReport && (
        <ViewDetailsModal
          report={selectedViewReport}
          onClose={() => setShowViewModal(false)}
        />
      )}

      {showModal && (
        <ModalTransition>
          <ModalDialog
            onClose={handleModalClose}
            heading="Add Daily Report"
            components={{
              Header: () => null,
            }}
          >
            <div className="modal-body p-0">
              <form onSubmit={handleAddReport} className="comman-form daily-report-modal">
                {/* Other input fields */}
                <div className="form-group">
                  <label htmlFor="ProjectName">Project Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ProjectName"
                    name="ProjectName"
                    value={newReport.ProjectName}
                    onChange={handleAddReportInputChange}
                  />
                  {errors.ProjectName && (
                    <div className="text-danger">{errors.ProjectName}</div>
                  )}
                </div>

                {/* <div className="mb-3">
                  <label htmlFor="Task" className="form-label">
                    Task
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="Task"
                    name="Task"
                    value={newReport.Task}
                    onChange={handleAddReportInputChange}
                    required
                    rows="3"
                  />
                </div> */}
                <div className="mb-3">
                  <label htmlFor="TaskDescription" className="form-label">
                    Task Description
                  </label>
                  <Editor
                    editorState={newReport.TaskDescription}
                    wrapperClassName="editor-wrapper"
                    editorClassName="editor-main"
                    toolbarClassName="editor-toolbar"
                    onEditorStateChange={handleAddReportEditorChange}
                    // Apply style based on error condition
                    style={{ borderColor: errors.TaskDescription ? "red" : "" }}
                  />
                  {errors.TaskDescription && (
                    <div style={{ color: "red" }}>{errors.TaskDescription}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="Status" className="form-label">
                    Status
                  </label>
                  <select
                    id="Status"
                    name="Status"
                    value={newReport.Status}
                    onChange={handleAddReportInputChange}
                    className="form-select"
                    style={{ borderColor: errors.Status ? "red" : "" }}
                  >
                    <option value="">Select Status</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    {/* Add more options as needed */}
                  </select>
                  {errors.Status && (
                    <div style={{ color: "red", marginTop: "0.5rem" }}>
                      {errors.Status}
                    </div>
                  )}
                </div>

                <div className="d-flex justify-content-center">
                <Button type="submit" className="comman-btn" appearance="primary">
                  Add Report
                </Button>
                </div>
              </form>
            </div>
          </ModalDialog>
        </ModalTransition>
      )}

      {showUpdateModal && (
        <ModalTransition>
          <ModalDialog
            onClose={handleCloseUpdateModal}
            heading="Update Daily Report"
            components={{
              Header: () => null,
            }}
          >
            <div className="modal-body">
              <form onSubmit={(e) => handleUpdateReport(updateReport.Id)}>
                <div className="mb-3">
                  <label htmlFor="ProjectName" className="form-label">
                    Project Name
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="ProjectName"
                    name="ProjectName"
                    value={updateReport.ProjectName}
                    onChange={handleUpdateReportInputChange}
                    rows="3"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Task" className="form-label">
                    Task
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="Task"
                    name="Task"
                    value={updateReport.Task}
                    onChange={handleUpdateReportInputChange}
                    rows="3"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="TaskDescription" className="form-label">
                    Task Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="TaskDescription"
                    name="TaskDescription"
                    value={updateReport.TaskDescription}
                    onChange={handleUpdateReportInputChange}
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="Status" className="form-label">
                    Status
                  </label>
                  <select
                    className="form-select"
                    id="Status"
                    name="Status"
                    value={updateReport.Status}
                    onChange={handleUpdateReportInputChange}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    {/* Add more options as needed */}
                  </select>
                </div>

                <Button type="submit" appearance="primary">
                  Update Report
                </Button>
              </form>
            </div>
          </ModalDialog>
        </ModalTransition>
      )}
    </div>
  );
};

export default AttendanceTable;

























// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Button from "@atlaskit/button";
// import ModalDialog, { ModalTransition } from "@atlaskit/modal-dialog";
// import Swal from "sweetalert2";
// import "sweetalert2/dist/sweetalert2.css";
// import "sweetalert2/dist/sweetalert2.css";
// import { EditorState, convertToRaw, ContentState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// const AttendanceTable = () => {
//   const [reports, setReports] = useState([]);
//   const [filteredReports, setFilteredReports] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const [searchByNameQuery, setsearchByNameQuery] = useState("");
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [userData, setUserData] = useState([]);
//   const [showDetails, setShowDetails] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedViewReport, setSelectedViewReport] = useState(null);
//   const [status, setStatus] = useState('');
//   const [statusFilled, setStatusFilled] = useState(false);
//   const handleStatusChange = (e) => {
//     const { value } = e.target;
//     setStatus(value);
//     setStatusFilled(value.trim() !== ''); // Check if status is filled
//   };


//   const [showUpdateModal, setShowUpdateModal] = useState(false); // State for update modal
//   const [newReport, setNewReport] = useState({
//     ProjectName: "",
//     Task: "",
//     TaskDescription: EditorState.createEmpty(), // Initialize editor state
//     Status: "",
//   });

//   const [updateReport, setUpdateReport] = useState({
//     Id: "",
//     ProjectName: "",
//     Task: "",
//     TaskDescription: EditorState.createEmpty(), // Initialize editor state
//     Status: "",
//   });

//   const [errors, setErrors] = useState({
//     ProjectName: "",
//     TaskDescription: "",
//     Status: "",
//     // Other fields in errors
//   });
//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const isoDate = new Date(dateString);
//     const day = isoDate.getDate().toString().padStart(2, "0");
//     const month = (isoDate.getMonth() + 1).toString().padStart(2, "0");
//     const year = isoDate.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const formatTime = (timeString) => {
//     if (!timeString) return "";
//     const [hours, minutes] = timeString.split(":");
//     let hours12 = parseInt(hours, 10);
//     const ampm = hours12 >= 12 ? "PM" : "AM";
//     hours12 = hours12 % 12;
//     hours12 = hours12 ? hours12 : 12;
//     return `${hours12}:${minutes} ${ampm}`;
//   };

//   const fetchReports = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const endpoint =
//         isAdmin || ishr ? "/GetAllReports" : "/GetAllReportsByUserId";
//       const response = await axios.get(
//         `https://localhost:44380/api/DailyReports${endpoint}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setReports(response.data);
//       setFilteredReports(response.data);
//     } catch (error) {
//       console.error("Error fetching reports:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Failed to fetch reports",
//       });
//     }
//   };
//   const handleAddReportEditorChange = (editorState) => {
//     setNewReport((prevReport) => ({
//       ...prevReport,
//       TaskDescription: editorState,
//     }));

//     const plainText = editorState.getCurrentContent().getPlainText("");
//     let error = "";

//     // if (plainText.trim().length === 0) {
//     //   error = "Task Description is required.";
//     // } else if (plainText.length < 40) {
//     //   error = "Task Description must be at least 40 characters long.";
//     // } else if (plainText.length > 200) {
//     //   error = "Task Description cannot exceed 200 characters.";
//     // }

//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       TaskDescription: error,
//     }));
//   };

//   const handleUpdateReportEditorChange = (editorState) => {
//     setUpdateReport((prevReport) => ({
//       ...prevReport,
//       TaskDescription: editorState,
//     }));
//   };

//   const handleSearchInputChange = (e) => {
//     const query = e.target.value.trim().toLowerCase(); // Get the trimmed and lowercase search query
//     setSearchQuery(query); // Set the search query state for potential future use

//     const filtered = reports.filter((report) =>
//       report.ProjectName.toLowerCase().includes(query)
//     );

//     setFilteredReports(filtered);
//   };

//   const handleSearchByName = (e) => {
//     const query = e.target.value.trim().toLowerCase(); // Get the trimmed and lowercase search query
//     setsearchByNameQuery(query); // Set the search query state for potential future use

//     // Filter the reports array based on ProjectName or Task containing the query
//     const filtered = reports.filter((report) =>
//       report.FullName.toLowerCase().includes(query)
//     );

//     setFilteredReports(filtered); // Set the filtered reports state to update the UI
//   };

//   const handleViewDetails = async (report, x) => {
//     debugger;

//     try {
//       const token = localStorage.getItem("token");
//       const userId = report.UserId;
//       setSelectedReport(report);
//       setSelectedViewReport(report);
//       setShowViewModal(x);

//       if (!userId) {
//         console.error("User ID is missing in the report:", report);
//         return;
//       }

//       const response = await axios.get(
//         `https://localhost:44380/api/DailyReports/GetAllReportsByCustomUserId/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setUserData(response.data);
//       setShowDetails(true);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Failed to fetch user data",
//       });
//     }
//   };

//   const handleDownloadUserSpecificData = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       console.error("Authorization token is missing.");
//       return;
//     }

//     try {
//       const userId = selectedReport.UserId;
//       const response = await axios.get(
//         `https://localhost:44380/api/DailyReports/DownloadDailyReportsExcelForUser/${userId}`,
//         {
//           responseType: "blob",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200 && response.data) {
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const link = document.createElement("a");
//         link.href = url;
//         link.setAttribute("download", `user_specific_data_${userId}.xlsx`);
//         document.body.appendChild(link);
//         link.click();
//         window.URL.revokeObjectURL(url);
//         link.remove();
//         Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: "Downloaded user specific data successfully",
//         });
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Failed to download user specific data. Invalid response data.",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Error downloading user specific data",
//       });
//     }
//   };

//   const handleModalOpen = () => {
//     setShowModal(true);
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     setErrors({ // Reset errors when the modal is closed
//       ProjectName: "",
//       TaskDescription: "",
//       Status: "",
//     });
//   };

//   const handleAddReportInputChange = (e) => {
//     const { name, value } = e.target;
  
//     // Update state with user input
//     setNewReport((prevReport) => ({
//       ...prevReport,
//       [name]: value,
//     }));
  
//     // Validate fields
//     if (name === "ProjectName") {
//       let error = "";
  
//       if (value.trim().length === 0) {
//         error = "Project Name is required.";
//       } else if (value.length < 4) {
//         error = "Project Name must be at least 4 characters long.";
//       } else if (value.length > 20) {
//         error = "Project Name cannot exceed 20 characters.";
//       }
  
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         ProjectName: error,
//       }));
//     } else if (name === "Status") {
//       let error = "";
  
//       if (value.trim().length === 0) {
//         error = "Status is required.";
//       } else {
//         error = ""; // Clear the error when the field is filled
//       }
  
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         Status: error,
//       }));
//     } else {
//       // Clear the error for other fields if any
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: "",
//       }));
//     }
//   };
  

//   const handleAddReport = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     if (!token) {
//       console.error("Authorization token is missing.");
//       return;
//     }

//     // Check if ProjectName or Status are empty
//     if (newReport.ProjectName.trim().length === 0) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         ProjectName: "Project Name is required.",
//       }));
//     }
//     if (newReport.Status.trim().length === 0) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         Status: "Status is required.",
//       }));
//     }

//     // Check if there are any validation errors
//     if (errors.ProjectName || errors.Status) {
//       Swal.fire({
//         icon: "error",
//         title: "Validation Error",
//         text: "Please fill in all required fields correctly.",
//       });
//       return;
//     }

//     // Continue with your API call and submission logic
//     try {
//       const contentState = newReport.TaskDescription.getCurrentContent();
//       const taskDescription = JSON.stringify(convertToRaw(contentState));

//       const response = await axios.post(
//         "https://localhost:44380/api/DailyReports/DailyReport",
//         {
//           ...newReport,
//           TaskDescription: taskDescription,
//         },
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
//           title: "Success!",
//           text: "Report added successfully",
//         });

//         setReports((prevReports) => [...prevReports, response.data]);
//         fetchReports();
//         setNewReport({
//           ProjectName: "",
//           TaskDescription: EditorState.createEmpty(),
//           Status: "",
//         });
//         setShowModal(false);
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Failed to add report. Invalid response status.",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Failed to add report. Please fill in all required fields correctly.",
//       });
//     }
//   };

//   const handleUpdateReport = async (reportId) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       console.error("Authorization token is missing.");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `https://localhost:44380/api/DailyReports/UpdateReportById${reportId}`,
//         updateReport, // Send updateReport state as request body
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: "Report updated successfully",
//         });
//         // Refresh the reports after update
//         fetchReports();
//         setShowUpdateModal(false); // Close update modal after successful update
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Failed to update report. Invalid response status.",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Error updating report",
//       });
//     }
//   };

//   const handleOpenUpdateModal = (report) => {
//     setUpdateReport(report);
//     setShowUpdateModal(true);
//   };

//   const handleCloseUpdateModal = () => {
//     setShowUpdateModal(false);
//   };

//   const handleUpdateReportInputChange = (e) => {
//     const { name, value } = e.target;

//     // Validate ProjectName field
//     if (name === "ProjectName") {
//       // Minimum 4 characters and maximum 20 characters
//       if (value.length < 4) {
//         // Throw error or handle validation feedback
//         console.error("Project Name must be at least 4 characters long.");
//         // Optionally, prevent further state update or actions
//         return;
//       } else if (value.length > 20) {
//         console.error("Project Name cannot exceed 20 characters.");
//         // Optionally, prevent further state update or actions
//         return;
//       }
//     }

//     // Update state with user input
//     setUpdateReport((prevReport) => ({
//       ...prevReport,
//       [name]: value,
//     }));
//   };
  
//   const isAdmin = localStorage.getItem("Role") === "Admin";
//   const ishr = localStorage.getItem("Role") === "HR";
//   const isAdmins = localStorage.getItem("Role") === "Employee";

//   const ViewDetailsModal = ({ report, onClose }) => {
//     return (
//       <ModalTransition>
//         <ModalDialog onClose={onClose} heading="Report Details">
//           <div className="modal-body">
//             <div className="container">
//               <div className="row">
//                 <div className="col-md-12">
//                   <p className="mb-2">
//                     <strong>Project Name:</strong> {report.ProjectName}
//                   </p>
//                   {/* <p className="mb-2"><strong>Task:</strong> {report.Task}</p> */}
//                   <p className="mb-2">
//                     <strong>Task Description:</strong> {report.TaskDescription}
//                   </p>
//                   <p className="mb-2">
//                     <strong>Status:</strong> {report.Status}
//                   </p>
//                   <p className="mb-2">
//                     <strong>Task Time:</strong> {formatTime(report.TaskTime)}
//                   </p>
//                   <p className="mb-2">
//                     <strong>Today Date:</strong> {formatDate(report.TodayDate)}
//                   </p>
//                   {/* Add more details as needed */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </ModalDialog>
//       </ModalTransition>
//     );
//   };
//   useEffect(() => {
//     // Example of setting default content programmatically
//     const initialContent = EditorState.createWithContent(
//       ContentState.createFromText("Dear Sir/Mam\n Subject : ")
//     );

//     setNewReport((prevReport) => ({
//       ...prevReport,
//       TaskDescription: initialContent,
//       Subject: "", // Initialize Subject as blank
//     }));
//   }, []);

//   return (
//     <div className="table-container Daily-Reports-Information">
//       <h2 className="table-heading">Daily Reports Information</h2>
//       <div className="row mb-3">
//         <div className="col-12 col-lg-8 mb-3">
//           <Button
//             appearance="primary"
//             hidden={isAdmin}
//             onClick={handleModalOpen}
//           >
//             Add Daily Report
//           </Button>
//         </div>
//         <div className="col-12 col-lg-4">
//           <div className="search-container mb-3 mb-lg-0">
//             <div className="input-btn position-relative">
//               <input
//                 type="text"
//                 placeholder="Search by name ..."
//                 value={searchByNameQuery}
//                 onChange={handleSearchByName}
//                 className="form-control"
//               />

//               <button
//                 type="button"
//                 className="btn btn-primary position-absolute"
//               >
//                 <i className="fas fa-search"></i>
//               </button>
//             </div>

//             {/* {showDetails ? (
//               <div className="input-btn position-relative">
//                 <input
//                   type="text"
//                   placeholder="Search by project name ..."
//                   value={searchQuery}
//                   onChange={handleSearchInputChange}
//                   className="form-control"
//                 />

//                 <button type="button" className="btn btn-primary position-absolute">
//                   <i className="fas fa-search"></i>
//                 </button>
//               </div>
//             ) : null} */}
//           </div>
//         </div>
//       </div>

//       {showDetails ? (
//         <div className="report-details-container">
//           <h3 className="table-heading User-Specific-Data">
//             User Specific Data
//           </h3>
//           <div className="input-table-container">
//             <table className="table table-bordered">
//               <thead>
//                 <tr>
//                   <th scope="col">Project Name</th>
//                   {/* <th scope="col">Task</th>  */}
//                   <th scope="col">Task Description</th>
//                   <th scope="col">Status</th>
//                   <th scope="col">Task Time</th>
//                   <th scope="col">Today Date</th>
//                   <th scope="col">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {userData.map((data, index) => (
//                   <tr key={index}>
//                     <td>{data.ProjectName}</td>
//                     {/* <td>{data.Task}</td> */}
//                     <td>{data.TaskDescription}</td>
//                     <td>{data.Status}</td>
//                     <td>{formatTime(data.TaskTime)}</td>
//                     <td>{formatDate(data.TodayDate)}</td>
//                     {/* <td>
//                       {isAdmin || ishr ? (
//                         <>
//                           <Button onClick={() => handleOpenUpdateModal(data)}>
//                             <i className="fas fa-edit"></i>
//                           </Button>
//                           <Button onClick={() => handleDeleteReport(data.Id)}>
//                             <i className="fas fa-trash-alt"></i>
//                           </Button>
//                         </>
//                       ) : null}
//                     </td> */}
//                     <Button onClick={() => handleViewDetails(data, true)}>
//                       View Details
//                     </Button>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="row justify-content-center mt-3">
//             <div className="col-12">
//               <Button onClick={handleDownloadUserSpecificData}>
//                 Download User Specific Data
//               </Button>
//               <Button onClick={() => setShowDetails(false)}>
//                 Back to List
//               </Button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="input-table-container">
//           <table className="table table-bordered">
//             <thead>
//               <tr>
//                 <th hidden={isAdmins}>FullName</th>
//                 <th hidden={isAdmins}>EmployeeId</th>
//                 <th hidden={isAdmins}>Action</th>
//                 <th hidden={isAdmin || ishr}>Project Name</th>
//                 {/* <th hidden={isAdmin || ishr}>Task</th> */}
//                 <th hidden={isAdmin || ishr}>Task Description</th>
//                 <th hidden={isAdmin || ishr}>Status</th>
//                 <th hidden={isAdmin || ishr}>Task Time</th>
//                 <th hidden={isAdmin || ishr}>Today Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredReports.map((report, index) => (
//                 <tr key={index}>
//                   <td hidden={isAdmins}>{report.FullName}</td>
//                   <td hidden={isAdmins}>{report.EmployeeId}</td>
//                   <td hidden={isAdmins}>
//                     <Button onClick={() => handleViewDetails(report, false)}>
//                       View Details
//                     </Button>
//                   </td>
//                   <td hidden={isAdmin || ishr}>{report.ProjectName}</td>
//                   {/* <td hidden={isAdmin || ishr}>{report.Task}</td> */}
//                   <td hidden={isAdmin || ishr}>{report.TaskDescription}</td>
//                   <td hidden={isAdmin || ishr}>{report.Status}</td>
//                   <td hidden={isAdmin || ishr}>
//                     {formatTime(report.TaskTime)}
//                   </td>
//                   <td hidden={isAdmin || ishr}>
//                     {formatDate(report.TodayDate)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {showViewModal && selectedViewReport && (
//         <ViewDetailsModal
//           report={selectedViewReport}
//           onClose={() => setShowViewModal(false)}
//         />
//       )}

//       {showModal && (
//         <ModalTransition>
//           <ModalDialog
//             onClose={handleModalClose}
//             heading="Add Daily Report"
//             components={{
//               Header: () => null,
//             }}
//           >
//             <div className="modal-body">
//               <form onSubmit={handleAddReport}>
//                 {/* Other input fields */}
//                 <div className="form-group">
//                   <label htmlFor="ProjectName">Project Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="ProjectName"
//                     name="ProjectName"
//                     value={newReport.ProjectName}
//                     onChange={handleAddReportInputChange}
//                   />
//                   {errors.ProjectName && (
//                     <div className="text-danger">{errors.ProjectName}</div>
//                   )}
//                 </div>

//                 {/* <div className="mb-3">
//                   <label htmlFor="Task" className="form-label">
//                     Task
//                   </label>
//                   <textarea
//                     type="text"
//                     className="form-control"
//                     id="Task"
//                     name="Task"
//                     value={newReport.Task}
//                     onChange={handleAddReportInputChange}
//                     required
//                     rows="3"
//                   />
//                 </div> */}
//                 <div className="mb-3">
//                   <label htmlFor="TaskDescription" className="form-label">
//                     Task Description
//                   </label>
//                   <Editor
//                     editorState={newReport.TaskDescription}
//                     wrapperClassName="editor-wrapper"
//                     editorClassName="editor-main"
//                     toolbarClassName="editor-toolbar"
//                     onEditorStateChange={handleAddReportEditorChange}
//                     // Apply style based on error condition
//                     style={{ borderColor: errors.TaskDescription ? "red" : "" }}
//                   />
//                   {errors.TaskDescription && (
//                     <div style={{ color: "red" }}>{errors.TaskDescription}</div>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="status">Status:</label>
//                   <select id="status" name="status" className="form-control">
//                     <option value="">Select status</option>
//                     <option value="InProgress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                     <option value="Pending">Pending</option>
//                   </select>
//                   {errors.Status && (
//                     <div className="text-danger">{errors.Status}</div>
//                   )}
//                 </div>

//                 <Button type="submit" appearance="primary">
//                   Add Report
//                 </Button>
//               </form>
//             </div>
//           </ModalDialog>
//         </ModalTransition>
//       )}

//       {showUpdateModal && (
//         <ModalTransition>
//           <ModalDialog
//             onClose={handleCloseUpdateModal}
//             heading="Update Daily Report"
//             components={{
//               Header: () => null,
//             }}
//           >
//             <div className="modal-body">
//               <form onSubmit={(e) => handleUpdateReport(updateReport.Id)}>
//                 <div className="mb-3">
//                   <label htmlFor="ProjectName" className="form-label">
//                     Project Name
//                   </label>
//                   <textarea
//                     type="text"
//                     className="form-control"
//                     id="ProjectName"
//                     name="ProjectName"
//                     value={updateReport.ProjectName}
//                     onChange={handleUpdateReportInputChange}
//                     rows="3"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="Task" className="form-label">
//                     Task
//                   </label>
//                   <textarea
//                     type="text"
//                     className="form-control"
//                     id="Task"
//                     name="Task"
//                     value={updateReport.Task}
//                     onChange={handleUpdateReportInputChange}
//                     rows="3"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="TaskDescription" className="form-label">
//                     Task Description
//                   </label>
//                   <textarea
//                     type="text"
//                     className="form-control"
//                     id="TaskDescription"
//                     name="TaskDescription"
//                     value={updateReport.TaskDescription}
//                     onChange={handleUpdateReportInputChange}
//                     rows="4"
//                     required
//                   ></textarea>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="Status" className="form-label">
//                     Status
//                   </label>
//                   <select
//                     className="form-select"
//                     id="Status"
//                     name="Status"
//                     value={updateReport.Status}
//                     onChange={handleUpdateReportInputChange}
//                     required
//                   >
//                     <option value="">Select Status</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                     <option value="Pending">Pending</option>
//                     {/* Add more options as needed */}
//                   </select>
//                 </div>

//                 <Button type="submit" appearance="primary">
//                   Update Report
//                 </Button>
//               </form>
//             </div>
//           </ModalDialog>
//         </ModalTransition>
//       )}
//     </div>
//   );
// };

// export default AttendanceTable;
