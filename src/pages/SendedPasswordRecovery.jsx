import TitlePage from "../components/TitlePage";
import ButtonMedium from "../components/ButtonMedium";
import { Link } from "react-router-dom";

function PasswordRecovery(){

    return(
        <>
        <section className="section">
            <TitlePage>¡Email enviado!</TitlePage>
            <div className="w-[700px]">
                <p>A la brevedad te llegará un mail con un link para poder recuperar la contraseña. En caso de no llegar el mail, le solicitamos que revise su sección de span.</p>
            </div>
            <div className="flex">
                <ButtonMedium>
                    <Link to={'/'}>Ir a inicio</Link>
                </ButtonMedium>
            </div>
            
        </section>
        </>
    )
}

export default PasswordRecovery