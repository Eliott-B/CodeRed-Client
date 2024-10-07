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
                {/* <ul className="enigmas-list">
                    <li key={1} className="enili" data-id={1}>
                        <h4 className="enili-title" style={{color: "red"}}>{"Enigme 1"}</h4>
                        <a href={"/enigma/" + 1}><img className="eni-icon" src={arrow_right} alt="Icon" style={{ backgroundColor: "red" }} /></a>
                    </li>
                    <li key={1} className="enili" data-id={1}>
                        <h4 className="enili-title" style={{color: "red"}}>{"Enigme 2"}</h4>
                        <a href={"/enigma/" + 1}><img className="eni-icon" src={arrow_right} alt="Icon" style={{ backgroundColor: "red" }} /></a>
                    </li>
                    <li key={1} className="enili" data-id={1}>
                        <h4 className="enili-title" style={{color: "red"}}>{"Enigme 3"}</h4>
                        <a href={"/enigma/" + 1}><img className="eni-icon" src={arrow_right} alt="Icon" style={{ backgroundColor: "red" }} /></a>
                    </li>
                    <li key={1} className="enili" data-id={1}>
                        <h4 className="enili-title" style={{color: "red"}}>{"Enigme 4"}</h4>
                        <a href={"/enigma/" + 1}><img className="eni-icon" src={arrow_right} alt="Icon" style={{ backgroundColor: "red" }} /></a>
                    </li>

                    {enigmas.map((enigma) => (
                        <li key={enigma.id} className="enili" data-id={enigma.id}>
                            <h4 className="enili-title" style={{color: "red"}}>{enigma.title}</h4>
                            <a href={"/enigma/" + enigma.id}><img className="eni-icon" src={arrow_right} alt="Icon" style={{ backgroundColor: "red" }} /></a>
                        </li>
                    ))}
                </ul> */}
            </div>
        </>
    );
};

export default Enigmas;