import PropTypes from "prop-types";
import "./Button.css";


const Button = ({ children, icon, onClick }) => {
    return (
        <button onClick={onClick} className="fluent_button" type="button">
            <div id="children">
                {children}
            </div>
            <div id="icon">
                {icon}
            </div>
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.ReactElement,
    onClick: PropTypes.func,
};

export default Button;
