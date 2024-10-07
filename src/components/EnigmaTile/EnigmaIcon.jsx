import PropTypes from "prop-types";


const EnigmaIcon = ({ isSolved }) => {
    return (
        isSolved ? (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="m8.5 16.586-3.793-3.793a1 1 0 0 0-1.414 1.414l4.5 4.5a1 1 0 0 0 1.414 0l11-11a1 1 0 0 0-1.414-1.414L8.5 16.586Z"
                    fill="#fc3cb2" />
            </svg>
        ) : (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                d="M13.704 4.284a1 1 0 1 0-1.403 1.424L17.67 11H4a1 1 0 1 0 0 2h13.665L12.3 18.285a1 1 0 0 0 1.403 1.424l6.925-6.822a1.25 1.25 0 0 0 0-1.78l-6.925-6.823Z"
                fill="#ffffff" />
            </svg>
        )
    );
};


EnigmaIcon.propTypes = {
    isSolved: PropTypes.bool.isRequired,
}


export default EnigmaIcon;
