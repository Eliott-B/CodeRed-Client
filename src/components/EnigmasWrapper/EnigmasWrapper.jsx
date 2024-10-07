import PropTypes from "prop-types";
import "./EnigmasWrapper.css";
import EnigmaTile from "../EnigmaTile/EnigmaTile";


const EnigmasWrapper = ({ enigmas }) => {

    return (
        <ul className="wrapper">
            {enigmas.map((enigma) => (
                <EnigmaTile key={enigma.id} title={enigma.title} isSolved={enigma.isSolved} id={enigma.id} />
            ))}
            <EnigmaTile key={5} title={"Enigme réussie"} isSolved={true} id={5} />
        </ul>
    );
};


EnigmasWrapper.propTypes = {
    enigmas: PropTypes.array.isRequired,
};

export default EnigmasWrapper;
