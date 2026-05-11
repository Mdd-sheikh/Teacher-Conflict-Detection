// RoomPage.jsx

import React, { useContext, useState,useEffect } from "react";
import "./RoomPage.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";
const RoomsPage = () => {

    const { API_URL } = useContext(Context)
    // ==============================
    // MODAL STATE
    const [rooms, setRooms] = useState([])
    console.log(rooms);
    
    // ==============================
    const [showModal, setShowModal] = useState(false);

    // ==============================
    // ROOM DATA
    // ==============================
    

    // ==============================
    // FORM DATA
    // ==============================
    const [formData, setFormData] = useState({
        roomNumber: "",
        type: "classroom",
        capacity: "",
    });
    console.log(formData);

    // ==============================
    // HANDLE CHANGE
    // ==============================
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // ==============================
    // ADD ROOM
    // ==============================
    const handleAddRoom = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                `${API_URL}/room/createroom`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(response?.data?.message);
            GetRoom()

            // RESET FORM
            setFormData({
                roomNumber: "",
                type: "classroom",
                capacity: "",
            });

            // CLOSE MODAL
            setShowModal(false);

        } catch (error) {
            alert(error?.response?.data?.message || "Something went wrong");
        }
    };

 const GetRoom = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(
                `${API_URL}/room/getrooms`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setRooms(response?.data?.data);

        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to fetch subjects"
            );
        }
    };

    useEffect(() => {
        GetRoom();
    }, []);


    return (
        <div className="room-page">

            {/* =========================
                STATS
            ========================== */}
            <div className="room-stats-grid">

                <div className="room-stats-card">
                    <p>TOTAL ROOMS</p>
                    <h1>42</h1>
                </div>

                <div className="room-stats-card">
                    <p>CLASSROOMS</p>
                    <h1>28</h1>
                </div>

                <div className="room-stats-card">
                    <p>LABS</p>
                    <h1>12</h1>
                </div>

                <div className="room-stats-card">
                    <p>CAPACITY UTILIZATION</p>
                    <h1 className="orange">84%</h1>
                </div>

            </div>

            {/* =========================
                TABLE CARD
            ========================== */}
            <div className="room-card">

                {/* TOPBAR */}
                <div className="room-topbar">

                    <div className="room-search-box">
                        <input
                            type="text"
                            placeholder="Search rooms by number or type..."
                        />
                    </div>

                    <button
                        type="button"
                        className="room-add-btn"
                        onClick={() => setShowModal(true)}
                    >
                        + Add Room
                    </button>

                </div>

                {/* TABLE */}
                <div className="room-table-wrapper">

                    <table className="room-table">

                        <thead>
                            <tr>
                                <th>ROOM NUMBER</th>
                                <th>TYPE</th>
                                <th>CAPACITY</th>
                                <th>STATUS</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>

                        <tbody>

                            {rooms.map((room) => (

                                <tr key={room.id}>

                                    <td className="room-number">
                                        {room.roomNumber}
                                    </td>

                                    <td>{room.type}</td>

                                    <td>
                                        {room.capacity}

                                        {room.type === "Lab"
                                            ? " Workstations"
                                            : room.type === "Hall"
                                                ? " Seats"
                                                : " Students"}
                                    </td>

                                    <td>

                                        <span
                                            className={`room-status 
                                            ${room.status === "Available"
                                                    ? "available"
                                                    : room.status === "Conflict"
                                                        ? "conflict"
                                                        : "maintenance"
                                                }`}
                                        >
                                            {room.status}
                                        </span>

                                    </td>

                                    <td>

                                        <div className="room-actions">

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
                <div className="room-footer">

                    <p>Showing 1-5 of 42 rooms</p>

                    <div className="room-pagination">

                        <button>{"<"}</button>

                        <button className="active">
                            1
                        </button>

                        <button>2</button>

                        <button>3</button>

                        <button>{">"}</button>

                    </div>

                </div>

            </div>

            {/* =========================
                MODAL
            ========================== */}
            {
                showModal && (

                    <div className="room-modal-overlay">

                        <div className="room-modal">

                            {/* HEADER */}
                            <div className="room-modal-header">

                                <h2>Add New Room</h2>

                                <button
                                    className="room-close-btn"
                                    onClick={() => setShowModal(false)}
                                >
                                    ×
                                </button>

                            </div>

                            {/* BODY */}
                            <div className="room-modal-body">

                                {/* ROOM NUMBER */}
                                <div className="room-input-group">

                                    <label>Room Number</label>

                                    <input
                                        type="text"
                                        name="roomNumber"
                                        placeholder="Enter room number"
                                        value={formData.roomNumber}
                                        onChange={handleChange}
                                    />

                                </div>

                                {/* TYPE */}
                                <div className="room-input-group">

                                    <label>Room Type</label>

                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                    >
                                        <option value="classroom">
                                            Classroom
                                        </option>

                                        <option value="lab">
                                            Lab
                                        </option>

                                        <option value="hall">
                                            Hall
                                        </option>

                                    </select>

                                </div>

                                {/* CAPACITY */}
                                <div className="room-input-group">

                                    <label>Capacity</label>

                                    <input
                                        type="number"
                                        name="capacity"
                                        placeholder="Enter capacity"
                                        value={formData.capacity}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                            {/* FOOTER */}
                            <div className="room-modal-footer">

                                <button
                                    className="room-cancel-btn"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="room-save-btn"
                                    onClick={handleAddRoom}
                                >
                                    Add Room
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </div>
    );
};

export default RoomsPage;