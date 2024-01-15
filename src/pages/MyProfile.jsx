import { Link, useParams } from "react-router-dom";
import TitlePage from "../components/TitlePage"
import { useEffect, useState } from "react";
import {Accordion, AccordionItem} from "@nextui-org/react";

const MyProfile = () => {

    const [judge, setJudge] = useState({})
    const {idJudge} = useParams();

    useEffect(()=>{

        fetch(`https://react-project-01-api.vercel.app/judges/${idJudge}`)
        .then((response)=>response.json())
        .then((data)=>{
            setJudge(data)
        })

    }, [idJudge]);

    return(
        <>
        <section className="section">
            <TitlePage>Mi Perfil</TitlePage>
            <div>
                <div className="flex flex-col w-[500px]">
                    <h3 className="flex gap-6 py-2 px-3 mb-2 font-bold text-xl">Mis datos</h3>
                    <div className="flex flex-row gap-2">
                        <p className="w-full gap-6 py-2 px-6 rounded-xl font-bold text-base bg-purple-800 text-white">Email: <span className="font-normal ">{judge.email}</span></p>
                        <button className='py-2 bg-yellow-400 rounded-full text-black px-4'>
                            <Link to={`/judges/${judge._id}/editar`}>Editar</Link>
                        </button>
                    </div>
                </div>
                <div className="flex w-[500px]">
                    <h3 className="w-full flex gap-6 py-2 px-3 mt-6 mb-2   font-bold text-xl">Votos realizados</h3>
                </div>
                <div className="flex w-[500px] flex-col wrap gap-2">
                    {judge.votes ? judge.votes.map((vote, id)=> 
                        <Accordion key={id} variant="splitted" className="w-full ">
                            <AccordionItem aria-label={vote.game_name} title={vote.game_name} className="text-base w-full ">
                                <div className="flex flex-col gap-2 mb-[16px]">
                                    <p className="mx-6 flex flex-row justify-between">Jugabilidad: <span className="font-bold bg-purple-800 py-1 px-4 text-white rounded">{vote.jugabilidad}</span></p>
                                    <p className="mx-6 flex flex-row justify-between">Sonido: <span className="font-bold bg-purple-800 py-1 px-4 text-white rounded">{vote.sonido}</span></p>
                                    <p className="mx-6 flex flex-row justify-between">Arte: <span className="font-bold bg-purple-800 py-1 px-4 text-white rounded">{vote.arte}</span></p>
                                    <p className="mx-6 flex flex-row justify-between">Afinidad a la temática: <span className="font-bold bg-purple-800 py-1 px-4 text-white rounded">{vote.afinidadALaTematica}</span></p>
                                </div>
                            </AccordionItem>
                        </Accordion>) :
                        <p className="font-bold bg-gray-800 text-white py-2 px-6 rounded-xl">- No tiene votos cargados -</p>
                    }
                </div>
            </div>
        </section>
        </>
    )

}
export default MyProfile