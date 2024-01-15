import { useState } from "react";
import {Input} from "@nextui-org/react";
import TitlePage from "../components/TitlePage";

function PasswordRecovery(){

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        fetch('https://react-project-01-api.vercel.app/api/password-recovery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
        .then((res) => {
            if (res.ok) {
                console.log('Se envio el email')
                window.location = `/recuperar-contrasena-enviada`;
                return res.json();
            
            } else {
                console.log('NO se envio el email')
                return res.json().then((error) => Promise.reject(error));
            }

        })
        .catch((error) => {
            setEmailError("");

            if (error.msg ) {
                error.msg.forEach((msg) => {
                    if (msg.email) {
                        setEmailError(msg);
                    } 
                    
                });
            } else {
                setEmailError("Error desconocido");
            }
        }); 
    }

    return(
        <>
        <section className="section">
            <TitlePage>Recuperar contraseña</TitlePage>
            <form className="flex flex-col gap-4 w-[600px]" onSubmit={handleFormSubmit}>
                {<div>
                    <Input type="email" label="Email" placeholder="Ingresar email" required onChange={handleEmailChange} value={email}/>
                    {emailError && <p className="text-red-500">{emailError.email}</p>}                    
                </div>}
                
                <div className="flex">
                    <button className="font-bold py-2 mt-2 px-6 rounded-full text-white bg-purple-800 " type="submit">Enviar mail</button>
                </div>
            </form>
        </section>
        </>
    )
}

export default PasswordRecovery