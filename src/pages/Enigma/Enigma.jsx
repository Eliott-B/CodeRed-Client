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
    const [downloadLink, setDownloadLink] = useState(null);
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
    }, []);

    useEffect(() => {
        axios
            .get("/solutions/" + enigma.id + "/" + Cookies.get("groupId"), {
                params: {},
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + Cookies.get("token"),
                },
            })
            .then((res) => {
                setServerSolution(res.data);
                if (res.data && res.data.input_file && res.data.input_file.data) {
                    const fileData = res.data.input_file.data;
                    console.log("Received file data:", fileData);
                    const bytes = new Uint8Array(fileData);

                    // Utilisez TextDecoder pour convertir les octets en chaîne de caractères
                    const decoder = new TextDecoder('utf-8');
                    const fileContent = decoder.decode(bytes);

                    console.log("Decoded file content:", fileContent);

                    // Créez un Blob à partir de la chaîne de caractères
                    const textBlob = new Blob([fileContent], { type: 'text/plain' });

                    // Générez une URL de téléchargement à partir du Blob
                    const url = window.URL.createObjectURL(textBlob);
                    setDownloadLink(url);
                }
        
            })
            .catch((err) => {
                console.log(err);
            });
    }, [enigma]);

    const validSolution = (e) => {
        e.preventDefault();
        // if (serverSolution.solution !== userSolution) {
        //     setError("Réponse invalide");
        //     return;
        // }
        setError("");
        axios.put("/solutions/"+id, {
            "answer": userSolution
            }, {  
                params: {},
                headers: {
                    "Authorization": "Bearer " + Cookies.get("token")
            }})
            .then(() => {
                setError("")
                setValidation(true);
            })
            .catch(err => {
                if (err.status === 400) {
                    setError("Réponse invalide");
                }
                else {
                    setError(err.message);
                }
        });
    }

    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = downloadLink;
        a.download = 'input.txt';
        a.click();
        URL.revokeObjectURL(downloadLink);
    };

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
                { serverSolution && serverSolution.input_file ?
                    <div className="eni-file">
                        <button onClick={handleDownload}>Télécharger le fichier</button>
                    </div>
                    : null }

                
                { serverSolution && ! serverSolution.success ?
                    <form onSubmit={validSolution} method="post">
                    <input type="text" name="answer" id="answer" placeholder="Votre réponse..." onChange={(e) => setUserSolution(e.target.value)}/>
                    <input type="submit" value="Soumettre" />
                    { error.length > 0 ? <span>{error}</span> : null }
                    { validation ? <span>Solution validée</span> : null }
                    <button>Indice</button>
                    </form>
                : serverSolution ?
                    <input type="text" name="answer" id="answer" placeholder={serverSolution.solution} disabled/>
                : null }
                
            </div>
        </>
    );
};

export default Enigma;