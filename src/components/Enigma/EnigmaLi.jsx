import { useEffect, useState } from "react";
import "./EnigmaLi.css";

const Enigma = (status) => {
    const [color, setColor] = useState();
    const [icon, setIcon] = useState();
    useEffect(()=>{
        if (status) {
            setColor("different");
            setIcon("other");
        }
    },[]);


    return (
        <li className="enili">
            <h4 className="enili-title" style={{color: color}}>Title</h4>
            <a href="/enigma/1"><img className="eni-icon" src={icon} alt="Icon" style={{ backgroundColor: color }} /></a>
        </li>
    );
};

export default Enigma;