import { useEffect, useState } from "react";

import "./Header.css";
import axios from "axios";
import Cookies from "js-cookie";

const Header = () => {
    const [isConnected, setConnected] = useState(false);
    const [group, setGroup] = useState({"name": "Undefined"});
    const [points, setPoints] = useState({"points": 0});

    useEffect(() => {
        axios.post("/groups/auth", { token: Cookies.get("token") })
            .then(response => {
                setConnected(response.data.valid);
            })
            .catch(err => {
                console.log(err.message);
            });

        if (isConnected) {
            axios.get("/groups/" + Cookies.get("groupId"), {
                headers: {
                    "Authorization": "Bearer " + Cookies.get("token")
                }
            })
                .then(response => {
                    setGroup(response.data);
                })
                .catch(err => {
                    console.log(err.message);
                });

            axios.get("/groups/selfPoints/", {
                headers: {
                    "Authorization": "Bearer " + Cookies.get("token")
                }
            })
                .then(response => {
                    setPoints(response.data);
                })
                .catch(err => {
                    console.log(err.message);
                });
        }
    }, [isConnected]);

    return (
        <header>
            <h1>Code<span className="red">R</span>ed</h1>
            <nav>
                <ul>
                    <li><a href="/"
                        className={window.location.pathname === "/" ? "active" : ""}
                    >Accueil</a></li>
                    <li><a href="/enigmas"
                        className={window.location.pathname === "/enigmas" ? "active" : ""}>Enigmes</a></li>
                </ul>
            </nav>
            {isConnected ?
                <div className="group-box">
                    <h2>{group.name}</h2>
                    <span>Score: {points.points || 0}pts</span>
                </div>
                :
                <a href="/login" className="login">Connexion</a>
            }
        </header>
    );
}

export default Header;