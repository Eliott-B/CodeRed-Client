import EnigmaCreation from "../../components/EnigmaCreation/EnigmaCreation";
import GroupCreation from "../../components/GroupCreation/GroupCreation";
import SolutionCreation from "../../components/SolutionCreation/SolutionCreation";
import "./Admin.css";
import axios from "axios";
import Cookies from "js-cookie";

const Admin = () => {
    axios.get("/groups/admin", {
            headers: {
                "Authorization": "Bearer " + Cookies.get("token")
            }
        })
        .then(response => {
            if (!response.data.admin) {
                window.location.href = "/";
            }
        })
        .catch(err => {
            console.log(err.message);
            window.location.href = "/";
        });

    return (
        <>
            <h2>Admin page</h2>
            <GroupCreation/>
            <EnigmaCreation/>
            <SolutionCreation/>
        </>
    );
};

export default Admin;