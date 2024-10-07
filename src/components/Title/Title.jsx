import PropTypes from "prop-types";
import { useEffect } from "react";
import "./Title.css";

const colors = {
    rose: "#fc3cb2",
};

const Title = ({ children, color }) => {
    useEffect(() => {
        const title = document.getElementById("title");
        if (title) {
            const resolvedColor = colors[color] || color;
            title.style.setProperty("--color", resolvedColor);
        }
    }, [color]);

    return (
        <h1 id="title">
            {children}
        </h1>
    );
};

Title.propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.string
};

export default Title;
