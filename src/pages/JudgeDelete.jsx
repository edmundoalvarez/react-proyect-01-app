import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TitlePage from "../components/TitlePage";

function JudgeDelete (){

    const [judge, setJudge] = useState({})
    const {idJudge} = useParams();

    const handleDeleteJudge = (e) => {
        e.preventDefault()


        fetch(`https://react-project-01-api.vercel.app/api/judges/${idJudge}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idJudge}),

        })
        .then((res) => {
            return res.json();
        })
        .then(() => {
            window.location = `/judges`;
            console.log('se eliminó')
        })
        .catch((error) => {
            console.log('No se pudo eliminar el juez: ', error);
        });
    }

    useEffect(()=>{

        fetch(`https://react-project-01-api.vercel.app/judges/${idJudge}`)
        .then((response)=>response.json())
        .then((data)=>{
            setJudge(data)
        })

    }, [idJudge]);

    return (
        <>
        <section className="section">
            <div className="flex flex-col gap-4">
                <TitlePage>Estas por eliminar el juez: {judge.email}</TitlePage>
                <div className="w-[600px]">
                    <form action="#" onSubmit={handleDeleteJudge} className="text-center mt-4 p-4 border-2 rounded-lg border-purple-800 flex flex-col gap-4">
                        <p className="text-lg font-bold">¿Deseas confirmar la eliminación?</p>
                        <div className="flex justify-center">
                            <button type="submit" className="py-[8px] px-[25px] rounded-full bg-red-600 hover:bg-red-500 transition-all duration-300 text-white">
                                Confirmar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        </>
    )
}

export default JudgeDelete