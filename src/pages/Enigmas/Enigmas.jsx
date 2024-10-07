import "./Enigmas.css";

import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Title from "../../components/Title/Title";
import EnigmasWrapper from "../../components/EnigmasWrapper/EnigmasWrapper";

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
                <Title color="rose">Vos énigmes</Title>
                <EnigmasWrapper enigmas={enigmas} />
            </div>
        </>
    );
};

export default Enigmas;