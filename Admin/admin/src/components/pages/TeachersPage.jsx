import React, { useContext, useEffect, useState } from "react";
import "./TeacherPage.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";

const TeachersPage = () => {
    const { API_URL } = useContext(Context)

    const [teacherid, settecherId] = useState("")
    



    const [openModal, setOpenModal] = useState(false);

    const [teacherData, setTeacherData] = useState({
        name: "",
        email: "",
        phone: "",
        teacherId: "",
        password: "",
        subjects: "",
        classes: "",
        rooms: "",
        timeSlots: "",
        isActive: true,
    });



    const teachers = [
        {
            name: "Dr. Jane Smith",
            teacherId: "T-2024-001",
            email: "jane.smith@edu.com",
            phone: "+1 234-567-8901",
            subjects: ["Physics", "Math"],
            status: "ACTIVE",
            avatar: "JS",
            color: "purple",
        },
        {
            name: "Prof. Mark Brown",
            teacherId: "T-2024-002",
            email: "m.brown@edu.com",
            phone: "+1 234-567-8902",
            subjects: ["Chemistry"],
            status: "ACTIVE",
            avatar: "MB",
            color: "pink",
        },
        {
            name: "Lucy White",
            teacherId: "T-2023-115",
            email: "l.white@edu.com",
            phone: "+1 234-567-8915",
            subjects: ["History"],
            status: "INACTIVE",
            avatar: "LW",
            color: "gray",
        },
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setTeacherData({
            ...teacherData,
            [name]: type === "checkbox" ? checked : value,
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${API_URL}/teacher/create`,
                teacherData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success(response?.data?.message);

            setOpenModal(false);

            setTeacherData({
                name: "",
                email: "",
                phone: "",
                teacherId: "",
                password: "",
                subjects: "",
                classes: "",
                rooms: "",
                timeSlots: "",
                isActive: true,
            });

        } catch (error) {

            console.log(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to create teacher"
            );
        }
    };





    return (
        <div className="teacherPage">

            {/* HEADER */}

            {/* STATS */}
            <div className="teacherStats">

                <div className="statCard">
                    <p>TOTAL TEACHERS</p>
                    <h2>124</h2>
                    <span className="greenText">↑ +4 this month</span>
                </div>

                <div className="statCard">
                    <p>ACTIVE NOW</p>
                    <h2>118</h2>
                    <span>95% Activity Rate</span>
                </div>

                <div className="statCard">
                    <p>ON LEAVE</p>
                    <h2 className="redText">6</h2>
                    <span>Scheduled Returns: 2</span>
                </div>

                <div className="statCard">
                    <p>DEPARTMENTS</p>
                    <h2>12</h2>
                    <span>Average 10/dept</span>
                </div>

            </div>

            {/* TABLE */}
            <div className="teacherTableContainer">

                <div className="tableHeader">

                    <input
                        type="text"
                        placeholder="Search by Name or Teacher ID..."
                        className="searchInput"
                    />

                    <div className="headerRight">

                        <select className="statusSelect">
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>

                        <button
                            className="addTeacherBtn"
                            onClick={() => setOpenModal(true)}
                        >
                            + Add Teacher
                        </button>

                    </div>

                </div>

                <table className="teacherTable">

                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>TEACHER ID</th>
                            <th>EMAIL</th>
                            <th>PHONE</th>
                            <th>SUBJECTS</th>
                            <th>STATUS</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>

                    <tbody>

                        {teachers.map((teacher, index) => (
                            <tr key={index}>

                                <td>
                                    <div className="teacherInfo">

                                        <div className={`teacherAvatar ${teacher.color}`}>
                                            {teacher.avatar}
                                        </div>

                                        <div>
                                            <h4>{teacher.name}</h4>
                                        </div>

                                    </div>
                                </td>

                                <td>{teacher.teacherId}</td>

                                <td className="emailText">
                                    {teacher.email}
                                </td>

                                <td>{teacher.phone}</td>

                                <td>
                                    <div className="subjectContainer">

                                        {teacher.subjects.map((sub, i) => (
                                            <span key={i} className="subjectTag">
                                                {sub}
                                            </span>
                                        ))}

                                    </div>
                                </td>

                                <td>

                                    <span
                                        className={
                                            teacher.status === "ACTIVE"
                                                ? "statusActive"
                                                : "statusInactive"
                                        }
                                    >
                                        ● {teacher.status}
                                    </span>

                                </td>

                                <td>

                                    <div className="actionButtons">
                                        <button>👁️</button>
                                        <button>✏️</button>
                                        <button>🔄</button>
                                        <button>🚫</button>
                                    </div>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

                <div className="paginationContainer">

                    <p>Showing 1 to 3 of 124 teachers</p>

                    <div className="paginationButtons">
                        <button>{"<"}</button>
                        <button className="activePage">1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>{">"}</button>
                    </div>

                </div>

            </div>

            {/* MODAL */}

            {openModal && (
                <div className="modalOverlay">

                    <div className="modalBox">

                        <div className="modalHeader">

                            <h2>Add Teacher</h2>

                            <button
                                onClick={() => setOpenModal(false)}
                                className="closeBtn"
                            >
                                ✕
                            </button>

                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="formGroup">
                                <label>Name</label>

                                <input
                                    type="text"
                                    name="name"
                                    value={teacherData.name}
                                    onChange={handleChange}
                                    placeholder="Enter teacher name"
                                />
                            </div>

                            <div className="formGroup">
                                <label>Email</label>

                                <input
                                    type="email"
                                    name="email"
                                    value={teacherData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                />
                            </div>

                            <div className="formGroup">
                                <label>Phone</label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={teacherData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone"
                                />
                            </div>
                            <div className="formGroup">
                                <label>Subjects</label>

                                <input
                                    type="text"
                                    name="subjects"
                                    value={teacherData.subjects}
                                    onChange={handleChange}
                                    placeholder="Physics, Math"
                                />
                            </div>

                            <div className="formGroup">
                                <label>Classes</label>

                                <input
                                    type="text"
                                    name="classes"
                                    value={teacherData.classes}
                                    onChange={handleChange}
                                    placeholder="Class 10-A"
                                />
                            </div>

                            <div className="formGroup">
                                <label>Rooms</label>

                                <input
                                    type="text"
                                    name="rooms"
                                    value={teacherData.rooms}
                                    onChange={handleChange}
                                    placeholder="Room 101"
                                />
                            </div>

                            <div className="formGroup">
                                <label>Time Slots</label>

                                <input
                                    type="text"
                                    name="timeSlots"
                                    value={teacherData.timeSlots}
                                    onChange={handleChange}
                                    placeholder="10:00 AM - 12:00 PM"
                                />
                            </div>

                            <div className="checkboxGroup">

                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={teacherData.isActive}
                                    onChange={handleChange}
                                />

                                <label>Teacher Active</label>

                            </div>

                            <button type="submit" className="submitBtn">
                                Add Teacher
                            </button>

                        </form>

                    </div>

                </div>
            )}
        </div>
    );
};

export default TeachersPage;