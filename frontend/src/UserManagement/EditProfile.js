import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import "./Styles/login.css";

export default function EditProfile() {
    const history = useHistory();
    const { user } = useContext(AuthContext);

    const [uid, setUid] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [nic, setNic] = useState("");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        setUid(localStorage.getItem("uid") || "");
        setName(localStorage.getItem("name") || "");
        setUsername(localStorage.getItem("username") || "");
        setPhone(localStorage.getItem("phone") || "");
        setEmail(localStorage.getItem("email") || "");
        setNic(localStorage.getItem("nic") || "");
        setGender(localStorage.getItem("gender") || "");
        setRole(localStorage.getItem("role") || "");
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const editprof = {
            uid,
            name,
            username,
            phone,
            email,
            nic,
            gender,
            role
        };

        axios
            .put(`/user/updateUser/${uid}`, editprof)
            .then(() => {
                alert("Account Update successfully");

                localStorage.setItem("name", name);
                localStorage.setItem("username", username);
                localStorage.setItem("phone", phone);
                localStorage.setItem("email", email);
                localStorage.setItem("nic", nic);
                localStorage.setItem("gender", gender);
                localStorage.setItem("role", role);

                history.push("/profiles");
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to update account");
            });
    };

    return (
        <div
            className="col-md-6"
            style={{
                marginLeft: "300px",
                marginTop: "30px",
                background: "#fff",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "2px 2px 2px 2px #000"
            }}
        >
            <h1 className="h3 mb-3 font-weight-normal">
                Edit User
            </h1>

            <form onSubmit={onSubmit}>

                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter name"
                />

                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                    placeholder="Enter username"
                />

                <label>Phone</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    placeholder="Enter phone"
                />

                <label>Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Enter email"
                />

                <label>NIC</label>
                <input
                    type="text"
                    value={nic}
                    onChange={(e) => setNic(e.target.value)}
                    className="form-control"
                    placeholder="Enter NIC"
                />

                <label>Gender</label>
                <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-control"
                    placeholder="Enter Gender"
                />

                <label>Role</label>
                <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="form-control"
                    readOnly={user && user.role === "User"}
                />

                <br />

                <button
                    className="btn btn-success"
                    type="submit"
                >
                    <i className="far fa-check-square"></i>
                    &nbsp;Update
                </button>

            </form>
        </div>
    );
}