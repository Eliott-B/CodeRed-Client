import "./Enigmas.css";

import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Enigmas = () => {
    const [enigmas, setEnigmas] = useState([]);

    useEffect(() => {
        axios.get("/enigmas", {
            params: {},
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + Cookies.get("token"),
            }
        })
        .then((res) => {
            setEnigmas(res.data);
            if (res.data.length === 0) return;
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <>
            <Header/>
            <div className="enigmas-body">
                <h2>Vos enigmes</h2>
                <ul>
                    {enigmas.map((enigma) => (
                        <li key={enigma.id} className="enili" data-id={enigma.id}>
                            <h4 className="enili-title" style={{color: "red"}}>{enigma.title}</h4>
                            <a href={"/enigma/" + enigma.id}><img className="eni-icon" src={"test"} alt="Icon" style={{ backgroundColor: "red" }} /></a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Enigmas;