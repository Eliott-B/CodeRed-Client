import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import "./GroupCreation.css";

const GroupCreation = () => {
    const [groupName, setGroupName] = useState("");
    const [password, setPassword] = useState("");
    const [admin, setAdmin] = useState(false);

    const [error, setError] = useState("")

    const createGroup = async (e) => {
        e.preventDefault();
        setError("");
        await axios.post("/groups/", {
            "name": groupName,
            "password": password,
            "admin": admin
        }, {
            headers: {
                "Authorization": "Bearer " + Cookies.get("token")
        }})
        .then(() => {
            setError("")
        })
        .catch(err => {
            setError(err.message);
        });
    }

    return (
        <form className="gc-box" onSubmit={createGroup}>
            <h3>Créer un groupe :</h3>
            <div className="name-box">
                <label htmlFor="name">Nom du groupe :</label>
                <input type="text" name="name" id="name" onChange={(e) => setGroupName(e.target.value)}/>
            </div>
            <div className="password-box">
                <label htmlFor="password">Mot de passe :</label>
                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="password-box">
                <label htmlFor="admin">Est administrateur</label>
                <input type="checkbox" name="admin" id="admin" checked={admin} onChange={() => setAdmin(!admin)}/>
            </div>
            { error.length > 0 ? <span>{error}</span> : null }
            <input type="submit" value="Créer" />
        </form>
    );
};

export default GroupCreation;