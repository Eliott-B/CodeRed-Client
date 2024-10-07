import { useEffect, useState } from "react";

import "./Header.css";
import axios from "axios";
import Cookies from "js-cookie";

const Header = () => {
    const [isConnected, setConnected] = useState(false);
    const [group, setGroup] = useState({
        "name": "Undefined",
        "points": 0
    });

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

            axios.get("/groups/points/" + Cookies.get("groupId"), {
                headers: {
                    "Authorization": "Bearer " + Cookies.get("token")
                }
            })
            .then(response => {
                console.log(response.data.points);
                group["points"] = response.data.points;
                console.log(group["points"]);
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
                <li><a href="/">Accueil</a></li>
                <li><a href="/enigmas">Enigmes</a></li>
            </nav>
            {isConnected ? 
            <div className="group-box">
                <h2>{group.name}</h2>
                <span>Score: {group.points || 0}pts</span>
            </div>
            :
            <a href="/login">Connexion</a>
            }
        </header>
    );
}

export default Header;