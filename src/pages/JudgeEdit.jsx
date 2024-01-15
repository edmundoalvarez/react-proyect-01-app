import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TitlePage from "../components/TitlePage";

function GameEdit (){

    const [judge, setJudge] = useState({})
    const {idJudge} = useParams();

    const [email , setEmail] = useState("");
    const [emailError, setEmailError] = useState("");


    useEffect(()=>{

        fetch(`https://react-project-01-api.vercel.app/judges/${idJudge}`)
        .then((response)=>response.json())
        .then((data)=>{
            setJudge(data)
            setEmail(data.email)
        })

    }, [idJudge]);

    const handleEmailChange =(e) => {
        setEmail(e.target.value)
    }

    const handleEditData = (e) => {
        e.preventDefault();
        console.log('enviando..')

        fetch(`https://react-project-01-api.vercel.app/api/judges/${idJudge}/change-email`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email}),
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((error) => Promise.reject(error));
            }
        })
        .then((result) => {

            if (result.error) {
                console.log(result.error);
            } else {
                window.location = `/judges/${idJudge}`;
            }
        })
        .catch((error) => {
            console.error("Error al EDITAR los datos.", error);

            setEmailError("");

            // Agregar nuevos mensajes de error al estado correspondiente
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


    console.log(judge.email)

    return (
        <>
        <section className="section ">
            <TitlePage>Editar mis datos</TitlePage>
            <div className="border rounded-md w-[700px]">
            <form onSubmit={handleEditData} className="px-4 py-6 flex flex-col gap-4">
                <div className="w-full px-3 mb-6 md:mb-0">
                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="name"
                >
                    Email
                </label>
                <input
                    required
                    value={email}
                    onChange={handleEmailChange}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="name"
                    type="text"
                />
                {emailError && <p className="text-red-500">{emailError.email}</p>}                    
                </div>


                <div className="px-3 flex justify-center mt-2">
                <button
                    className="py-[8px] px-[25px] rounded-full bg-yellow-400 hover:bg-yelow-300 transition-all duration-300 text-black"
                    type="submit"
                >
                    Confirmar Edición 
                </button>
                </div>
            </form>
            </div>
        </section>
        </>
    )
}

export default GameEdit