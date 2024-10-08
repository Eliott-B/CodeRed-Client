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
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        const fetchSolutions = async () => {
            const updatedEnigmas = await Promise.all(enigmas.map(async (enigma) => {
                try {
                    const res = await axios.get("/solutions/" + enigma.id + "/" + Cookies.get("groupId"), {
                        params: {},
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + Cookies.get("token"),
                        },
                    });
                    return { ...enigma, isSolved: !!res.data.success };
                } catch (err) {
                    console.log(err);
                    return enigma;
                }
            }));
            setEnigmas(updatedEnigmas);
        };

        if (enigmas.length > 0) {
            const timeoutId = setTimeout(fetchSolutions, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [enigmas]);


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