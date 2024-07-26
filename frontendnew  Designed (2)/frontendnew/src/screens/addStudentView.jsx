// import React, { useState, useEffect } from "react";
// import { Button, Form } from "react-bootstrap";
// import { Link, useHistory } from "react-router-dom";
// import FormContainer from "../components/formContainer";
// import { useDispatch, useSelector } from "react-redux";
// import { addStudent, updateStudent } from "../actions/studentActions";
// import Loading from "../components/loader.jsx";
// import Message from "../components/message.jsx";
// import { STUDENT_UPDATE_RESET } from "../constants/studentConstant";
// import Loader from "../components/loader";

// const AddStudentView = () => {
//   const history = useHistory();
//   const [isEdit, setIsEdit] = useState(false);
//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [category, setCategory] = useState("");
//   const [city, setCity] = useState("");
//   const [contact, setContact] = useState("");
//   const [fatherContact, setFatherContact] = useState("");
//   const [image, setImage] = useState("");
//   const [roomNo, setRoomNo] = useState("");
//   const [blockNo, setBlockNo] = useState("");
//   const [status, setStatus] = useState("Hostel");

//   const dispatch = useDispatch();
//   const studentAdd = useSelector((state) => state.studentAdd);
//   const { loading, error, success } = studentAdd;
//   const studentUpdate = useSelector((state) => state.studentUpdate);
//   const {
//     loading: loadingUpdate,
//     error: errorUpdate,
//     success: successUpdate,
//   } = studentUpdate;

//   useEffect(() => {
//     if (successUpdate) {
//       dispatch({ type: STUDENT_UPDATE_RESET });
//       history.push("/");
//     }
//     if (history.location.state && history.location.state.studentProps) {
//       setIsEdit(true);
//       const student = history.location.state.studentProps;
//       setName(student.name);
//       setAddress(student.address);
//       setCategory(student.category);
//       setCity(student.city);
//       setContact(student.contact);
//       setFatherContact(student.fatherContact);
//       setImage(student.image);
//       setRoomNo(student.roomNo);
//       setBlockNo(student.blockNo);
//       setStatus(student.status);
//     }
//     if (success) {
//       history.push("/");
//     }
//   }, [dispatch, history, success, successUpdate]);

//   const submitHandler = () => {
//     if (isEdit === true) {
//       const _id = history.location.state.studentProps._id;
//       dispatch(
//         updateStudent({
//           _id,
//           name,
//           address,
//           category,
//           city,
//           contact,
//           fatherContact,
//           image,
//           roomNo,
//           blockNo,
//           status,
//         })
//       );
//     } else {
//       dispatch(
//         addStudent({
//           name,
//           address,
//           category,
//           city,
//           contact,
//           fatherContact,
//           image,
//           roomNo,
//           blockNo,
//           status,
//         })
//       );
//     }
//   };

//   return (
//     <>
//       <Link to="/" className="btn btn-light my-3">
//         Go Back
//       </Link>

//       {loading || loadingUpdate ? (
//         <Loader />
//       ) : (
//         <>
//           {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
//           <FormContainer>
//             <h1>{isEdit ? "Edit Student" : "Add Student"}</h1>
//             {loading && <Loading />}
//             {error && <Message variant="danger">{error}</Message>}
//             <Form onSubmit={submitHandler}></Form>
//             <Form.Group controlId="name">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="name"
//                 placeholder="Enter name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               ></Form.Control>
//             </Form.Group>
//             <Form.Group controlId="status">
//               <Form.Label>Status</Form.Label>
//               <Form.Control
//                 as="select"
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//               >
//                 {["Hostel", "Outside", "Home"].map((x) => (
//                   <option key={x + 1} value={x + 1}>
//                     {x}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//             <Form.Group controlId="address">
//               <Form.Label>Address</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter address"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//               ></Form.Control>
//             </Form.Group>
//             <Form.Group controlId="city">
//               <Form.Label>City</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter city"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//               ></Form.Control>
//             </Form.Group>
//             <Form.Group controlId="contact">
//               <Form.Label>Contact</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter phone number"
//                 value={contact}
//                 onChange={(e) => setContact(e.target.value)}
//               ></Form.Control>
//             </Form.Group>
//             <Form.Group controlId="fatherContact">
//               <Form.Label>Father Contact</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter Father Phone Number"
//                 value={fatherContact}
//                 onChange={(e) => setFatherContact(e.target.value)}
//               ></Form.Control>
//             </Form.Group>
//             <Form.Group controlId="roomNo">
//               <Form.Label>Room No</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Room no"
//                 value={roomNo}
//                 onChange={(e) => setRoomNo(e.target.value)}
//               ></Form.Control>
//             </Form.Group>
//             <Form.Group controlId="b">
//               <Form.Label>Block Number</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Block Number"
//                 value={blockNo}
//                 onChange={(e) => setBlockNo(e.target.value)}
//               ></Form.Control>
//             </Form.Group>
//             <Form.Group controlId="image">
//               <Form.Label>Image Url</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Image Url"
//                 value={image}
//                 onChange={(e) => setImage(e.target.value)}
//               ></Form.Control>
//             </Form.Group>
//             <Form.Group controlId="category">
//               <Form.Label>Category</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Stream"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//               ></Form.Control>
//             </Form.Group>
//             <Button type="submit" variant="primary" onClick={submitHandler}>
//               {isEdit ? "Update" : "Add Student"}
//             </Button>
//           </FormContainer>
//         </>
//       )}
//     </>
//   );
// };

// export default AddStudentView;




// DailyReportModal.js

// DailyReportModal.js

// DailyReportModal.js

// DailyReportModal.js

// DailyReportModal.js

// import React, { useState, useEffect } from 'react';
// import { Button, Container, Table, Modal, Form } from 'react-bootstrap';
// import axios from 'axios';

// const DailyReport = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [reports, setReports] = useState([]);
//   const [formData, setFormData] = useState({
//     FullName: '',
//     EmployeeId: '',
//     ProjectName: '',
//     Task: '',
//     TaskDescription: '',
//     Status: '',
//     TaskTime: '',
//     TodayDate: ''
//   });

//   const handleShow = () => setShowModal(true);
//   const handleClose = () => setShowModal(false);

//   const fetchReports = async () => {
//     try {
//       const token = localStorage.getItem('token'); // Ensure the token is available
//       const response = await axios.get('https://localhost:44380/api/DailyReports', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       setReports(response.data);
//     } catch (error) {
//       console.error("Error fetching reports:", error);
//     }
//   };

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token'); // Ensure the token is available
//       const response = await axios.post('https://localhost:44380/api/DailyReports', formData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
//       setReports([...reports, response.data]); // Add the new report to the table
//       handleClose(); // Close the modal
//     } catch (error) {
//       console.error("Error submitting report:", error);
//     }
//   };

//   return (
//     <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
//       <h2 className="mb-4">Daily Reports</h2>
//       <Button variant="primary" onClick={handleShow} className="mb-4">
//         Add Report
//       </Button>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             {reports.length > 0 && Object.keys(reports[0]).map((key) => (
//               <th key={key}>{key}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {reports.map((report, index) => (
//             <tr key={index}>
//               {Object.values(report).map((value, idx) => (
//                 <td key={idx}>{value}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Daily Report</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             {Object.keys(formData).map((key) => (
//               <Form.Group controlId={key} key={key}>
//                 <Form.Label>{key}</Form.Label>
//                 <Form.Control
//                   type={key === "TodayDate" ? "date" : key === "TaskTime" ? "time" : "text"}
//                   name={key}
//                   value={formData[key]}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>
//             ))}
//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default DailyReport;




