
import { useEffect, useState } from "react";
import "./SolutionCreation.css";
import axios from "axios";
import Cookies from "js-cookie";

const SolutionCreation = () => {
    const [enigmas, setEnigmas] = useState([]);
    const [groups, setGroups] = useState([]);

    const [enigmaId, setEnigmaId] = useState(0);
    const [groupId, setGroupId] = useState(0);
    const [solution, setSolution] = useState("");
    const [inputFile, setInputFile] = useState("");
    const [consoleLog, setConsoleLog] = useState("");

    const [error, setError] = useState("");
    const [validation, setValidation] = useState(false);

    useEffect(() => {
        axios
            .get("/groups", {
                params: {                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + Cookies.get("token"),
                },
            })
            .then((res) => {
                setGroups(res.data);
                if (res.data.length === 0) return;
                setGroupId(res.data[0].id);
            })
            .catch((err) => {
                console.log(err);
            });
        axios.get("/enigmas", {
            params: {},
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + Cookies.get("token"),
            }
        })
        .then((res) => {
            setEnigmas(res.data);
            if (res.data.length === 0) return;
            setEnigmaId(res.data[0].id);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const createSolution = async (e) => {
        e.preventDefault();
        setError("");

        let reader = new FileReader();

        reader.onloadend = async function (evt) {
            if (evt.target.readyState === FileReader.DONE) {
                const arrayBuffer = evt.target.result;
                const uint8Array = new Uint8Array(arrayBuffer);
                const base64String = btoa(String.fromCharCode.apply(null, uint8Array));

                try {
                    await axios.post("/solutions/", {
                        enigmaId,
                        groupId,
                        solution,
                        inputFile: base64String,
                        consoleOutput: consoleLog
                    }, {
                        headers: {
                            Authorization: "Bearer " + Cookies.get("token")
                        }
                    });

                    setError("");
                    setValidation(true);
                } catch (err) {
                    setError(err.message);
                }
            }
        };
        

        

        reader.readAsArrayBuffer(inputFile[0]);

        // const fileReader = new FileReader();

        // fileReader.onload = async function(event) {
        //     const arrayBuffer = event.target.result;
        //     const uint8Array = new Uint8Array(arrayBuffer);
        //     const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
        //     // Utiliser le tableau de bytes comme vous le souhaitez
        //     await axios.post("/solutions/", {
        //         "enigmaId": enigmaId,
        //         "groupId": groupId,
        //         "solution": solution,
        //         "inputFile": base64String,
        //         "consoleOutput": consoleLog
        //     }, {
        //         headers: {
        //             "Authorization": "Bearer " + Cookies.get("token")
        //     }})
        //     .then(() => {
        //         setError("")
        //         setValidation(true);
        //     })
        //     .catch(err => {
        //         setError(err.message);
        //     });
        //   };
        
        // console.log(inputFile[0]);
        // fileReader.readAsArrayBuffer(inputFile[0]);
    }

    return (
        <form onSubmit={createSolution} className="solution-box">
            <h3>Créer une solution :</h3>
            <div className="enigma-box">
                <label htmlFor="name">Nom de l&apos;enigme :</label>
                <select id="enigmas" name="enigmas" onChange={(e) => {
                    const selectedIndex = e.target.options.selectedIndex;
                    setEnigmaId(parseInt(e.target.options[selectedIndex].getAttribute("data-id")));
                }}>
                    {enigmas.map((enigma) => (
                        <option key={enigma.id} data-id={enigma.id} value={enigma.title}>
                            {enigma.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="group-box">
                <label htmlFor="name">Nom du groupe :</label>
                <select id="groups" name="groups" onChange={(e) => {
                    const selectedIndex = e.target.options.selectedIndex;
                    setGroupId(parseInt(e.target.options[selectedIndex].getAttribute("data-id")));
                }}>
                    {groups.map((group) => (
                        <option key={group.id} data-id={group.id} value={group.name}>
                            {group.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="solution-box">
                <label htmlFor="solution">Solution :</label>
                <input type="text" name="solution" id="solution" onChange={(e) => setSolution(e.target.value)}/>
            </div>
            <div className="inputpath-box">
                <label htmlFor="input">Chemin d&apos;accès au fichier :</label>
                <input type="file" accept=".txt" onChange={(e) => setInputFile(e.target.files)}/>
            </div>
            <div className="consolelog-box">
                <label htmlFor="consolelog">Console log :</label>
                <input type="text" name="consolelog" id="consolelog" onChange={(e) => setConsoleLog(e.target.value)}/>
            </div>
            { error.length > 0 ? <span>{error}</span> : null }
            { validation ? <span>Solution créée</span> : null }
            <input type="submit" value="Créer" />
        </form>
    );
};

export default SolutionCreation;