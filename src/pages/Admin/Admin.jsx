import EnigmaCreation from "../../components/EnigmaCreation/EnigmaCreation";
import GroupCreation from "../../components/GroupCreation/GroupCreation";
import SolutionCreation from "../../components/SolutionCreation/SolutionCreation";
import "./Admin.css";

const Admin = () => {
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