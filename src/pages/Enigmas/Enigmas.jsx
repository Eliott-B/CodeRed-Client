import "./Enigmas.css";

import Header from "../../components/Header/Header";
import EnigmaLi from "../../components/Enigma/EnigmaLi";

const Enigmas = () => {
    return (
        <>
            <Header/>
            <div className="enigmas-body">
                <h2>Vos enigmes</h2>
                <ul>
                    <EnigmaLi status={false}/>
                </ul>
            </div>
        </>
    );
};

export default Enigmas;