
import { useState } from "react";
import "./EnigmaCreation.css";
import axios from "axios";
import Cookies from "js-cookie";

const EnigmaCreation = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState(0);
    const [tip, setTip] = useState("");
    const [tipCost, setTipCost] = useState(0);
    const [final, setFinal] = useState(false);
    const [error, setError] = useState("");
    const [validation, setValidation] = useState(false);

    const createEnigma = async (e) => {
        e.preventDefault();
        setError("");

        let reader = new FileReader();

        reader.onloadend = async function (evt) {
            if (evt.target.readyState === FileReader.DONE) {
                const arrayBuffer = evt.target.result;
                const uint8Array = new Uint8Array(arrayBuffer);
                const base64String = btoa(String.fromCharCode.apply(null, uint8Array));

                console.log(base64String);

                try {
                    await axios.post("/enigmas/", {
                        "title": title,
                        "description": base64String,
                        "points": points,
                        "tip": tip,
                        "tip_cost": tipCost,
                        "final": final
                    }, {
                        headers: {
                            "Authorization": "Bearer " + Cookies.get("token")
                        }
                    });
                    setError("");
                    setValidation(true);
                } catch (err) {
                    setError(err.message);
                }
            }
        };
        reader.readAsArrayBuffer(description[0]);
    }

    return (
        <form onSubmit={createEnigma}>
            <h3>Créer une énigme :</h3>
            <div className="title-box">
                <label htmlFor="name">Titre :</label>
                <input type="text" name="name" id="name" onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="desc-box">
                <label htmlFor="desc">Description :</label>
                <input type="file" accept=".md" onChange={(e) => setDescription(e.target.files)}/>
            </div>
            <div className="points-box">
                <label htmlFor="points">Points :</label>
                <input type="number" name="points" id="points" onChange={(e) => setPoints(e.target.value)}/>
            </div>
            <div className="tip-box">
                <label htmlFor="desc">Indice :</label>
                <input type="text" name="tip" id="tip" rows="5" size="50" maxLength="1000" onChange={(e) => setTip(e.target.value)}/>
            </div>
            <div className="tipp-box">
                <label htmlFor="tipp">Indice points :</label>
                <input type="number" name="tipp" id="tipp" onChange={(e) => setTipCost(e.target.value)}/>
            </div>
            <div className="final-box">
                <label htmlFor="isFinal">Final</label>
                <input type="checkbox" name="isFinal" id="isFinal" checked={final} onChange={() => setFinal(!final)}/>
            </div>
            { error.length > 0 ? <span>{error}</span> : null }
            { validation ? <span>Enigme créée</span> : null }
            <input type="submit" value="Créer" />
        </form>
    );
}

export default EnigmaCreation;