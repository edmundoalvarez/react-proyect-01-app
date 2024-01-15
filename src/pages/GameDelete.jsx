import { useEffect, useState } from "react"
import { /* useNavigate, */ useParams } from "react-router-dom"
import TitlePage from "../components/TitlePage";
import {Accordion, AccordionItem} from "@nextui-org/react";

function GameDelete (){

    const [game, setGame] = useState({})
    const {idGame} = useParams();

    const handleDeleteGame = (e) => {
        e.preventDefault()

        fetch(`http://localhost:2023/games/${idGame}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idGame}),

        })
        .then((res) => {
            return res.json();
        })
        .then(() => {
            window.location = `/games`;
        })
        .catch((error) => {
            console.log('No se pudo eliminar el juego: ', error);
        });
    }

    useEffect(()=>{

        fetch(`http://localhost:2023/games/${idGame}`)
        .then((response)=>response.json())
        .then((data)=>{
            setGame(data)
        })

    }, [idGame]);

    return (
        <>
        <section className="section game-page ">
            <div className="game-view">
                <TitlePage>Estas por eliminar el juego: {game.name}</TitlePage>
                <div className="mb-4 mt-4 rounded-xl overflow-hidden border flex items-center">
                    <picture>
                        <img className="object-cover" src={game.img} alt={game.name} />  
                    </picture>
                </div>
                <div className="datos-primarios">
                    <p>Genero: <span className="font-bold">{game.genre}</span></p>
                    <p>Edición: <span className="font-bold">{game.edition}</span></p>
                    <p>Total de votos: <span className="font-bold">{game.totalVotes ? game.totalVotes : ' - '}</span></p>
                </div>
                <div className="datos-secundarios">
                    <h3 className="text-base font-bold">Promedios</h3>
                    <div>
                        <p>Jugabilidad: <span className="font-bold">{game.promJugabilidad ? game.promJugabilidad?.toFixed(2) : '-'}</span></p>
                        <p>Sonido: <span className="font-bold">{game.promSonido ? game.promSonido?.toFixed(2) : '-'}</span></p>
                        <p>Arte: <span className="font-bold">{game.promArte ? game.promArte?.toFixed(2) : '-'}</span></p>
                        <p>Afinidad a la temática: <span className="font-bold">{game.promAfinidadALaTematica ? game.promAfinidadALaTematica?.toFixed(2) : '-'}</span></p>
                    </div>
                </div>
                <div className="datos-terciarios">
                    <Accordion variant="splitted">
                        <AccordionItem key="1" aria-label="Creadores" title="Creadores" className="text-base text-white">
                            {game.members?.map((member, id)=>
                                <p key={id}>{member}</p>
                            )}
                        </AccordionItem>
                    </Accordion>
                </div>
                <div>
                    <form action="#" onSubmit={handleDeleteGame} className="text-center mt-4 p-4 border-2 rounded-lg border-purple-800">
                    <button type="submit" className="font-bold py-[8px] px-[25px] rounded-full bg-red-600 hover:bg-red-500 transition-all duration-300 text-white">
                        Confirmar eliminación del juego
                    </button>
                    </form>
                </div>
            </div>
        </section>
        </>
    )
}

export default GameDelete