import { useEffect, useState } from "react";
import "./EnigmaLi.css";

const Enigma = (enigmaId, title, status) => {
    const [color, setColor] = useState();
    const [icon, setIcon] = useState();
    useEffect(()=>{
        if (status) {
            setColor("different");
            setIcon("other");
        }
    },[]);


    return (
        <li key={enigmaId} className="enili" data-id={enigmaId}>
            <h4 className="enili-title" style={{color: color}}>{title}</h4>
            <a href={"/enigma/" + enigmaId}><img className="eni-icon" src={icon} alt="Icon" style={{ backgroundColor: color }} /></a>
        </li>
    );
};

export default Enigma;