import { useState } from "react";
import {Input} from "@nextui-org/react";
import TitlePage from "../components/TitlePage";
import { Link } from "react-router-dom";

function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()

        fetch('https://react-project-01-api.vercel.app/api/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
    
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((error) => Promise.reject(error));
            }
        })
        .then((result) => {
            if (result.account) {
                console.log(result);
                localStorage.setItem('token', result.token);
                localStorage.setItem('id', result.account.id);
                localStorage.setItem('rol', result.account.rol);
                window.location = `/judges/${result.account.id}`;
            }
            console.log('aca 2');
        })
        .catch((error) => {

            setEmailError("");
            setPasswordError("");

                if (error.msg ) {
                    error.msg.forEach((msg) => {
                        if (msg.email) {
                            setEmailError(msg);
                        } else if (msg.password) {
                            setPasswordError(msg);
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
            <TitlePage>Iniciar Sesion</TitlePage>
            <form onSubmit={handleFormSubmit}>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <div className="w-full">
                        <Input type="email" label="Email" placeholder="Ingresar email" required onChange={handleEmailChange} value={email}/>
                        {emailError && <p className="text-red-500">{emailError.email}</p>}                    
                    </div>
                    <div className="w-full">
                        <Input type="password" label="Contraseña" placeholder="Ingresar contraseña" required onChange={handlePasswordChange} value={password}/>
                        {passwordError && <p className="text-red-500">{passwordError.password}</p>}   
               
                    </div>
                </div>
                <button className="font-bold py-2 px-6 rounded-full text-white mt-6 bg-purple-800 " type="submit">Iniciar Sesion</button>
                <div className=" mt-2 px-2">
                    <Link className="text-purple-800 hover:text-purple-600" to={'/recuperar-contrasena'}>Olvidé mi contraseña</Link>
                </div>  
            </form>
        </section>
        </>
    )
}

export default Login