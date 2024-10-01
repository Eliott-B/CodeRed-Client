import { useParams } from "react-router-dom";

import "./Enigma.css";

import Header from "../../components/Header/Header";
import { useState } from "react";

const Enigma = () => {
    const { id } = useParams();
    const [file, setFile] = useState("");

    return (
        <>
            <Header/>
            <div className="eni-body">
                <h2>Enigme n°{id}</h2>
                <div className="eni-content">
                    <div className="eni-desc">
                        <p>
                            Je suis agréable à manger, surtout au gouter, sauf lorsque je me retrouve en ligne... Les gens m’acceptent par flemme ou me refusent froidement. Qui suis-je ?
                        </p>
                    </div>
                    { file ? 
                    <div className="eni-file">
                        <span>Filename.txt</span>
                        <a href=""><img src="" alt="Download" /></a>
                    </div>
                    : null }
                </div>
                <form action="" method="post">
                    <input type="text" name="answer" id="answer" placeholder="Votre réponse..."/>
                    <button type="submit">Soumettre</button>
                    <button>Indice</button>
                </form>
            </div>
        </>
    );
};

export default Enigma;