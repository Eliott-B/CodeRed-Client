import "./Header.css";

const Header = () => {
    return (
        <header>
            <h1>Code<span className="red">R</span>ed</h1>
            <nav>
                <li><a href="/">Accueil</a></li>
                <li><a href="/enigmas">Enigmes</a></li>
            </nav>
            <div className="group-box">
                <h2>Group Name</h2>
                <span>Score: 25105pts</span>
            </div>
        </header>
    );
}

export default Header;