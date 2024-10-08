import Header from "../../components/Header/Header";
import "./Home.css";

const Home = () => {
    return (
        <>
            <Header />
            <div className="h-body">
                <h2>Note de <span className="glow">mission</span></h2>
                <div className="h-infos">
                    <p className="h-intro">
                        Bienvenue agent, ceci est un rappel de votre mission et de son objectif. Votre mission si toutefois vous l&apos;acceptez est de protéger New Eden de l’attaque qu’elle subit. Pour cela vous devez résoudre différentes énigmes en équipe. Chaque énigme rapporte un nombre de points qui sera cumulé aux autres à la fin de votre mission. Les 3 meilleures équipes seront récompensées.
                    </p>
                    <div className="h-team">
                        <h3>Votre équipe :</h3>
                        <p>
                            La fondation Vaporis a composé 17 équipes de 5 à 6 personnes composées de 4 à 5 agents et d’un agent de liaison.
                        </p>
                    </div>
                    <div className="h-goal">
                        <h3>Votre objectif :</h3>
                        <p>
                            Sauver New Eden des attaques extérieures en résolvant des énigmes dans le temps imparti.
                            N’oubliez pas ceci : vous êtes une équipe.
                        </p>
                    </div>
                    <div className="h-way">
                        <h3>Le déroulement :</h3>
                        <p>
                            Lors du commencement de votre mission votre agent de liaison détiendra un mot de passe pour vous connecter.
                            Connectez-vous et choisissez votre nom d’équipe.
                            Résolvez les énigmes !

                            Les énigmes se présente sous la forme suivante :
                            <ul>
                                <li>Une énigme</li>
                                <li>Un potentiel fichier à télécharger</li>
                                <li>Un input de validation de la solution</li>
                            </ul>
                        </p>
                    </div>
                    <div className="h-rules">
                        <h3>Les règles :</h3>
                        <p>
                            Voici les règles qui devront impérativement être respectées durant votre mission :

                            <ol>
                                <li>Respecter les agents et agents de liaison</li>
                                <li>Ne pas brut-force les énigmes</li>
                                <li>Ne pas pirater les serveurs de la fondation</li>
                                <li>L’utilisation d’IA est proscrite</li>
                            </ol>
                        </p>

                        <p className="slogan"> Tout finira là où tout commence, le monde n&apos;est rien de plus qu&apos;une boucle.</p>
                    </div>
                    <div className="h-i-footer">
                        <span className="glow">BONNE MISSION AGENT !</span>
                        <span className="glow">TEMRINÉ</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;