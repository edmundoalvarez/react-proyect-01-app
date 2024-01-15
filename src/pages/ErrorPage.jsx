import TitlePage from "../components/TitlePage"
import ButtonMedium from "./../components/ButtonMedium"
import { Link } from "react-router-dom";

const ErrorPage = () => {

    return(
        <>
        <section className="section">
            <TitlePage>Error 404</TitlePage>
            <div className="w-[600px]">
                <p>Estás intentando ingresar a una página que no existe o cambió de dirección. En el siguiente botón podrás volver a inicio.</p>
                <div className="flex mt-[40px]">
                    <ButtonMedium>
                        <Link to="/">Volver a inicio</Link>
                    </ButtonMedium> 
                </div>
            </div>
        </section>
        </>
    )

}
export default ErrorPage