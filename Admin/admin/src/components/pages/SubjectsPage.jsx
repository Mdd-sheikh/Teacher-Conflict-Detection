// SubjectPage.jsx

import React, { useContext, useState } from "react";
import "./SubjectPage.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";

const SubjectsPage = () => {

    const { API_URL } = useContext(Context)

    const [showSubjectModel, setShowSubjectModel] = useState(false)

    const [subjects, setSubjects] = useState([
        {
            id: 1,
            code: "CS-101",
            name: "Introduction to Computer Science",
            department: "Computer Science",
            teacher: "Dr. Jane Doe",
            initials: "JD",
            color: "purple",
        },
        {
            id: 2,
            code: "MATH-202",
            name: "Advanced Linear Algebra",
            department: "Mathematics",
            teacher: "Prof. Alan Smith",
            initials: "AS",
            color: "green",
        },
        {
            id: 3,
            code: "PHY-301",
            name: "Quantum Physics Foundations",
            department: "Physics",
            teacher: "",
            initials: "",
            color: "",
        },
        {
            id: 4,
            code: "ENG-105",
            name: "Technical Communication",
            department: "English",
            teacher: "Emily Brown",
            initials: "EB",
            color: "pink",
        },
        {
            id: 5,
            code: "BIO-201",
            name: "Molecular Biology",
            department: "Biology",
            teacher: "Robert Wilson",
            initials: "RW",
            color: "blue",
        },
    ]);

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        department: "",
        assignteacher: ""
    });
    console.log(formData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddSubject = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                `${API_URL}/subjects/createsubject`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(response?.data?.message);

            // RESET FORM
            setFormData({
                name: "",
                code: "",
                department: "",
                assignteacher: "",
            });

            // CLOSE MODAL
            setShowSubjectModel(false);

        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Frontend problem"
            );
        }
    };

    const GetSubject = () =>{
        
    }
    return (
        <div className="subject-page">
            {/* TABLE CARD */}
            <div className="subject-card">
                {/* TOPBAR */}
                <div className="subject-topbar">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search by name or code..."
                        />
                    </div>

                    <button
                        className="add-btn"
                        onClick={() => setShowSubjectModel(true)}
                    >
                        + Add Subject
                    </button>
                </div>

                {/* TABLE */}
                <div className="table-wrapper">
                    <table className="subject-table">
                        <thead>
                            <tr>
                                <th>SUBJECT CODE</th>
                                <th>SUBJECT NAME</th>
                                <th>DEPARTMENT</th>
                                <th>ASSIGNED TEACHER</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>

                        <tbody>
                            {subjects.map((subject) => (
                                <tr key={subject.id}>
                                    <td className="subject-code">
                                        {subject.code}
                                    </td>

                                    <td>{subject.name}</td>

                                    <td>{subject.department}</td>

                                    <td>
                                        {subject.teacher ? (
                                            <div className="teacher-box">
                                                <div
                                                    className={`teacher-avatar ${subject.color}`}
                                                >
                                                    {subject.initials}
                                                </div>

                                                <span>{subject.teacher}</span>
                                            </div>
                                        ) : (
                                            <span className="unassigned">
                                                Unassigned
                                            </span>
                                        )}
                                    </td>

                                    <td>
                                        <div className="action-buttons">
                                            <button className="edit-btn">
                                                ✏️
                                            </button>

                                            <button className="delete-btn">
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Subject Popup */}
                {showSubjectModel ? (
                    <div className="subject-modal-overlay">
                        <div className="subject-modal">
                            <h2>Add Subject</h2>

                            <div className="subject-form-group">
                                <label>Subject Code</label>
                                <input
                                    type="text"
                                    name="code"
                                    placeholder="Enter subject code"
                                    required
                                    onChange={handleChange}
                                    value={formData.code}
                                />
                            </div>

                            <div className="subject-form-group">
                                <label>Subject Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter subject name"
                                    required
                                    name="name"
                                    onChange={handleChange}
                                    value={formData.name}
                                />
                            </div>

                            <div className="subject-form-group">
                                <label>Department</label>
                                <input
                                    type="text"
                                    placeholder="Enter department"
                                    required
                                    name="department"
                                    onChange={handleChange}
                                    value={formData.department}
                                />
                            </div>

                            <div className="subject-form-group">
                                <label>Assigned Teacher</label>
                                <input
                                    type="text"
                                    placeholder="Enter teacher name"
                                    required
                                    name="assignteacher"
                                    onChange={handleChange}
                                    value={formData.assignteacher}
                                />
                            </div>

                            <div className="subject-modal-buttons">
                                <button
                                    className="cancel-btn"
                                    onClick={() => setShowSubjectModel(false)}
                                >
                                    Cancel
                                </button>

                                <button onClick={handleAddSubject} className="add-btn">
                                    Add Subject
                                </button>
                            </div>
                        </div>
                    </div>
                ) : ""}

                {/* FOOTER */}
                <div className="table-footer">
                    <p>Showing 5 of 42 subjects</p>

                    <div className="pagination">
                        <button>{"<"}</button>
                        <button className="active">1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>{">"}</button>
                    </div>
                </div>
            </div>

            {/* STATS */}
            <div className="stats-grid">
                <div className="stats-card">
                    <div className="stats-header">
                        <span>TOTAL SUBJECTS</span>
                        <span>📚</span>
                    </div>

                    <h1>42</h1>
                </div>

                <div className="stats-card">
                    <div className="stats-header">
                        <span>FACULTY COVERAGE</span>
                        <span>👤</span>
                    </div>

                    <h1>94%</h1>
                </div>

                <div className="stats-card danger">
                    <div className="stats-header">
                        <span>CONFLICTS DETECTED</span>
                        <span>⚠️</span>
                    </div>

                    <h1>3</h1>
                </div>
            </div>



        </div>
    );
};

export default SubjectsPage;