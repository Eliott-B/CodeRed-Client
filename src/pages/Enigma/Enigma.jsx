import { useParams } from "react-router-dom";

import "./Enigma.css";

import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Title from "../../components/Title/Title";

import Markdown from 'react-markdown'
import Button from "../../components/Button/Button";
import TipIcon from "./TipIcon";
import AnswerIcon from "./AnswerIcon";
import DownloadIcon from "./DownloadIcon";

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
    }, [id]);

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
            })
            .catch((err) => {
                console.log(err);
            });
    }, [enigma]);

    const validSolution = (e) => {
        e.preventDefault();
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
        if (serverSolution && serverSolution.input_file && serverSolution.input_file.data) {

            console.log(serverSolution.input_file.data);

            const fileData = serverSolution.input_file.data;

            console.log(fileData);

            const bytes = new Uint8Array(fileData);
            const decoder = new TextDecoder('utf-8');
            const fileContent = decoder.decode(bytes);
            const fileDecodedFromBase64 = atob(fileContent);

            const textBlob = new Blob([fileDecodedFromBase64], { type: 'text/plain' });

            const url = window.URL.createObjectURL(textBlob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'input.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    const handleDescription = () => {
        if (enigma.description) {
            const fileData = enigma.description.data;
            const bytes = new Uint8Array(fileData);
            const decoder = new TextDecoder('utf-8');
            const fileContent = decoder.decode(bytes);
            const fileDecodedFromBase64 = atob(fileContent);
            console.log(fileDecodedFromBase64);
            return decodeURIComponent(escape(fileDecodedFromBase64));
        }
    };
    

    return (
        <>
            <Header/>
            <div className="eni-body">
                <Title color="rose">Enigme n°{id} - {enigma.title}</Title>
                <div className="eni-content">
                    <div className="eni-desc">
                        <Markdown>
                            {handleDescription()}
                        </Markdown>
                    </div>
                </div>
                { serverSolution && serverSolution.input_file ?
                    <div className="eni-file">
                        <Button icon={<DownloadIcon/>} onClick={handleDownload}>Télécharger le fichier</Button>
                    </div>
                    : null }
                
                { serverSolution && ! serverSolution.success ?
                <>
                <form className="eni-form"onSubmit={validSolution} method="post">
                        <input type="text" name="answer" id="answer" placeholder="Votre réponse..." onChange={(e) => setUserSolution(e.target.value)}/>
                        
                        <input type="submit" value="Soumettre" />
                        { error.length > 0 ? <span>{error}</span> : null }
                        { validation ? <span>Solution validée</span> : null }
                    </form>
                    <Button icon={<TipIcon/>}>Indice</Button>

                </>
                    
                : serverSolution ?
                    <input type="text" name="answer" id="answer" placeholder={serverSolution.solution} disabled/>
                : null }
                
            </div>
        </>
    );
};

export default Enigma;