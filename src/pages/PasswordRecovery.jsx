import { useState, useEffect } from 'react';
import { Input } from '@nextui-org/react';
import TitlePage from '../components/TitlePage';

function PasswordRecovery() {
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [token, setToken] = useState('');

    const [passwordError, setPasswordError] = useState("");
    const [rePasswordError, setRePasswordError] = useState("");


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRepasswordChange = (e) => {
        setRepassword(e.target.value);
    };

    useEffect(() => {
        // Obtengo token de la URL
        const obtenerTokenDeURL = () => {
            const urlSearchParams = new URLSearchParams(window.location.search);
            return urlSearchParams.get('token') || '';
        };

        // Cargo el token cuando el componente se monta
        setToken(obtenerTokenDeURL());

    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (password.length < 7){

            setPasswordError("La contraseña debe tener al menos 7 caracteres");
            return;

        } else {
            setPasswordError("");
        }
        if (password !== repassword) {

            setRePasswordError("Las contraseñas no coinciden");
            return;
        } else {
            setRePasswordError("");
        }

        fetch('https://react-project-01-api.vercel.app/2023/api/reset-password', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, password }) 
        })

        .then(response => response.json())
        .then(() => {
            
            window.location = `/login`;
        
            console.log('ENVIADO')

        })
        .catch((error) => {

            console.log(error)
        });
    };

    return (
        <>
            <section className="section">
                <TitlePage>Restablecer Contraseña</TitlePage>
                <form className="flex flex-col gap-4 w-[600px]" onSubmit={handleFormSubmit}>
                    <div>
                        <Input type="password" label="Nueva Contraseña" placeholder="Ingresar nueva contraseña" required onChange={handlePasswordChange} value={password} />
                        {passwordError && <p className="text-red-500">{passwordError}</p>}                    
                    </div>
                    <div>
                        <Input type="password" label="Confirmar Contraseña" placeholder="Confirmar nueva contraseña" required onChange={handleRepasswordChange} value={repassword} />
                        {rePasswordError && <p className="text-red-500">{rePasswordError}</p>}                    
                    </div>
                    <div className="flex">
                        <button className="font-bold py-2 mt-2 px-6 rounded-full text-white bg-purple-800 " type="submit">Restablecer Contraseña</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default PasswordRecovery;
