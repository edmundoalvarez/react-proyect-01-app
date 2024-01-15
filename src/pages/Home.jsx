import ImageHome from "./../components/ImageHome"
import ButtonMedium from "./../components/ButtonMedium"
import { Link } from "react-router-dom";
import TitlePage from "../components/TitlePage";

const Home = () => {
    return (
        <>
            <section className="section">
                <ImageHome />
                <div className="txt-home">
                    <TitlePage>Bienvenidos a los Game Votes Awards 2024</TitlePage>
                    <p>Como jurado seleccionado podrás realizar las votaciones correspondientes a los juegos nominados. Que no te quede ninguno sin calificar!.</p>
                    <ButtonMedium>
                        <Link to="/games">Ver Juegos</Link>
                    </ButtonMedium>
                </div>
            </section>
        </>
    )
    
}

export default Home