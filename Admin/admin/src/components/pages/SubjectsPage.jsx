// SubjectPage.jsx

import React, { useState } from "react";
import "./SubjectPage.css";

const SubjectsPage = () => {
    const [showModal, setShowModal] = useState(false);

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
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddSubject = () => {
        if (!formData.name || !formData.code) {
            alert("Please fill all fields");
            return;
        }

        const newSubject = {
            id: Date.now(),
            code: formData.code,
            name: formData.name,
            department: "General",
            teacher: "",
            initials: "",
            color: "",
        };

        setSubjects([newSubject, ...subjects]);

        setFormData({
            name: "",
            code: "",
        });

        setShowModal(false);
    };

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
                        onClick={() => setShowModal(true)}
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

            {/* MODAL */}
            {/* MODAL */}
            {/* MODAL */}
            {
                showModal && (
                    <div className="modal-overlay">

                        <div className="modal">

                            {/* HEADER */}
                            <div className="modal-header">
                                <h2>Add New Subject</h2>

                                <button
                                    type="button"
                                    className="close-btn"
                                    onClick={() => setShowModal(false)}
                                >
                                    ×
                                </button>
                            </div>

                            {/* BODY */}
                            <div className="modal-body">

                                <div className="input-group">
                                    <label>Subject Name</label>

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter subject name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="input-group">
                                    <label>Subject Code</label>

                                    <input
                                        type="text"
                                        name="code"
                                        placeholder="Enter subject code"
                                        value={formData.code}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                            {/* FOOTER */}
                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="save-btn"
                                    onClick={handleAddSubject}
                                >
                                    Add Subject
                                </button>

                            </div>

                        </div>

                    </div>
                )
            }
        </div>
    );
};

export default SubjectsPage;