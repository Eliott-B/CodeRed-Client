import { useParams } from "react-router-dom";

import "./Enigma.css";

import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Enigma = () => {
    const { id } = useParams();
    const [enigma, setEnigma] = useState({});
    const [serverSolution, setServerSolution] = useState({});
    const [userSolution, setUserSolution] = useState("");
    const [error, setError] = useState("");
    const [validation, setValidation] = useState(false);

    useEffect(() => {
        axios
            .get("/enigmas/" + id, {
                params: {                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + Cookies.get("token"),
                },
            })
            .then((res) => {
                setEnigma(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .get("/solutions/" + Cookies.get("groupId"), {
                params: {},
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + Cookies.get("token"),
                },
            })
            .then((res) => {
                setServerSolution(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const validSolution = async (e) => {
        e.preventDefault();
        if (serverSolution.solution !== userSolution) {
            setError("Réponse invalide");
            return;
        }
        setError("");
        await axios.put("/solutions/"+{id}+"/"+Cookies.get("groupId"), {
            "success": true
        }, {
            headers: {
                "Authorization": "Bearer " + Cookies.get("token")
        }})
        .then(() => {
            setError("")
            setValidation(true);
        })
        .catch(err => {
            setError(err.message);
        });
    }

    return (
        <>
            <Header/>
            <div className="eni-body">
                <h2>Enigme n°{id} - {enigma.title}</h2>
                <div className="eni-content">
                    <div className="eni-desc">
                        <p>
                            {enigma.description}
                        </p>
                    </div>
                    
                </div>
                { serverSolution.length > 0 ? 
                    <div className="eni-file">
                        <span>Filename.txt</span>
                        <a href=""><img src={serverSolution} alt="Download" /></a>
                    </div>
                    : null }
                <form onSubmit={validSolution} method="post">
                    <input type="text" name="answer" id="answer" placeholder="Votre réponse..." onChange={(e) => setUserSolution(e.target.value)}/>
                    <input type="submit" value="Soumettre" />
                    { error.length > 0 ? <span>{error}</span> : null }
                    { validation ? <span>Solution validée</span> : null }
                    <button>Indice</button>
                </form>
            </div>
        </>
    );
};

export default Enigma;