import PropTypes from "prop-types";
import "./EnigmaTile.css";
import { useEffect } from "react";
import EnigmaIcon from "./EnigmaIcon";


const EnigmaTile = ({ id, title, isSolved }) => {
    useEffect(() => {
        const enigma = document.getElementById("button_"+ id);
        if (enigma) {
            enigma.style.setProperty("--enigma-color", isSolved ? "#fc3cb2" : "#f0f0f0");
   }   } , [isSolved, id]);
    return (
        <li className="enili" data-id={id}>
            <button id={"button_" + id} onClick={() => window.location.href = "/enigma/" + id}>
                    <h4 className="enili-title">{title}</h4>
                    <EnigmaIcon isSolved={isSolved} />
            </button>
        </li>

    );
};


EnigmaTile.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    isSolved: PropTypes.bool.isRequired,
}


export default EnigmaTile;
