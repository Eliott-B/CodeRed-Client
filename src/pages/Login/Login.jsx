import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import "./Login.css";


const Login = () => {
    const [groupName, setGroupName] = useState("");
    const [password, setPassword] = useState("");

    const [status, setStatus] = useState(false);
    const [errors, setErrors] = useState({
        "name": "",
        "password": ""
    })

    const login = async (e) => {
        e.preventDefault();
        setStatus(null)
        setErrors({
            "name": "",
            "password": ""
        });
        await axios.post("/groups/login", {
            "name": groupName,
            "password": password
        })
        .then(response => {
            setStatus(response.status);
            Cookies.set("token", response.data.token, { expires: 1 });
            Cookies.set("groupId", response.data.id, { expires: 1 });
            window.location.href = "/";
        })
        .catch(err => {
            if (err.response.status === 500) {
                setStatus(err.reponse.status);
                return;
            }
            setErrors(prevErrors => ({
                ...prevErrors,
                [err.response.data.path]: err.response.data.message
            }));
        });
    }

    return (
        <div className="login-body">
            <form className="login-box" onSubmit={login}>
                <h2>Connexion</h2>
                <div className="name-box">
                    <label htmlFor="name">Nom de l'équipe :</label>
                    <input type="text" name="name" id="name" onChange={(e) => setGroupName(e.target.value)}/>
                    { errors["name"].length !== 0 ? <span className="error">{errors["name"]}</span> : null }
                </div>
                <div className="password-box">
                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                    { errors["password"].length !== 0 ? <span className="error">{errors["password"]}</span> : null }
                </div>
                { status === 500 ? <span>Erreur serveur</span> : null }
                <input type="submit" value="Se Connecter" />
                { status === 200 ? <span>Connexion réussie</span> : null }
            </form>
        </div>
    );
};

export default Login;