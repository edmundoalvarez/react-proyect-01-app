import { useState } from "react";
import {Input} from "@nextui-org/react";
import TitlePage from "../components/TitlePage";

function JudgeNew(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [rePasswordError, setRePasswordError] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleRepasswordChange = (e) => {
        setRepassword(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        
        if (password !== repassword) {
            setRePasswordError("Las contraseñas no coinciden");
            
            return;
        }

        fetch('http://localhost:2023/api/account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
    
        })
        .then((res) => {
            if (res.ok) {
                window.location = `/judges`;
                return res.json();
            } else {
                return res.json().then((error) => Promise.reject(error));
            }
        })
        .catch((error) => {

            setEmailError("");
            setPasswordError("");
            setRePasswordError("");

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
            <TitlePage>Crear juez</TitlePage>
            <form className="flex flex-col gap-4 w-[600px]" onSubmit={handleFormSubmit}>
                <div>
                    <Input type="email" label="Email" placeholder="Ingresar email" required onChange={handleEmailChange} value={email}/>
                    {emailError && <p className="text-red-500">{emailError.email}</p>}                    
                </div>
                <div>
                    <Input type="password" label="Contraseña" placeholder="Ingresar contraseña" required onChange={handlePasswordChange} value={password}/>
                    {passwordError && <p className="text-red-500">{passwordError.password}</p>}                    
                </div>
                <div>
                    <Input type="password" label="Confirmacion-contraseña" placeholder="Confirmar contraseña" required onChange={handleRepasswordChange} value={repassword}/>
                    {rePasswordError && <p className="text-red-500">{rePasswordError}</p>}                    

                </div>
                <div className="flex">
                    <button className="font-bold py-2 mt-2 px-6 rounded-full text-white bg-purple-800 " type="submit">Crear cuenta</button>
                </div>
            </form>
        </section>
        </>
    )
}

export default JudgeNew