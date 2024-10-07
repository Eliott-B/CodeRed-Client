import "./Scoreboard.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Scoreboard = () => {
    const [groups, setGroups] = useState([]);

    axios.get("/groups/admin", {
            headers: {
                "Authorization": "Bearer " + Cookies.get("token")
            }
        })
        .then(response => {
            if (!response.data.admin) {
                window.location.href = "/";
            }
        })
        .catch(err => {
            console.log(err.message);
    });


    useEffect(() => {
        axios.get("/groups/points", {
            params: {},
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + Cookies.get("token"),
            }
        })
        .then((res) => {
            setGroups(res.data);
            if (res.data.length === 0) return;
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const lines = groups.sort((a, b) => b.points - a.points).map((group) => {
        return (
            <tr>
                <td>{group.name}</td>
                <td>{group.points}</td>
            </tr>
        );
    });
    

    return (
        <>
            <h2>Scoreboard</h2>
            <table>
                <tr>
                    <th>Group</th>
                    <th>Points</th>
                </tr>
                {lines}
            </table>
        </>
    );
};

export default Scoreboard;