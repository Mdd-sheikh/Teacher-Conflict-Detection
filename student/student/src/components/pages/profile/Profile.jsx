import React from "react";
import "./Profile.css";
import Sidebar from "../../Sidebar";

const Profile = () => {
    return (
        <div className="layout">
            <Sidebar />

            <div className="profile-page">
                <div className="profile-card">
                    <div className="avatar">AJ</div>

                    <div>
                        <h1>Alex Johnson</h1>
                        <p>#2024-089</p>
                    </div>
                </div>

                <div className="info-card">
                    <h2>Personal Information</h2>

                    <div className="info">
                        <p>Email</p>
                        <h4>alex@university.edu</h4>
                    </div>

                    <div className="info">
                        <p>Phone</p>
                        <h4>+123456789</h4>
                    </div>

                    <div className="info">
                        <p>Address</p>
                        <h4>123 Academic Way</h4>
                    </div>
                </div>

                <button className="edit-btn">Edit Profile</button>
            </div>
        </div>
    );
};

export default Profile;