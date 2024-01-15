import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TitlePage from "../components/TitlePage";
import {Accordion, AccordionItem} from "@nextui-org/react";

function GameView (){

    const [game, setGame] = useState({})
    const {idGame} = useParams();

    const [jugabilidad, setJugabilidadVote] = useState()
    const [arte, setArtebiVote] = useState()
    const [sonido, setSonidobiVote] = useState()
    const [afinidadALaTematica, setAfinidadALaTematicaVote] = useState()
    const [errorFormMessage, setErrorFormMessage] = useState("");
    const game_id = idGame;

    const handleJugabilidadVoteChange =(e) => {
        setJugabilidadVote(e.target.value)
    
    }
    const handleArteVoteChange =(e) => {
        setArtebiVote(e.target.value)
    
    }
    const handleSonidoVoteChange =(e) => {
        setSonidobiVote(e.target.value)
    
    }
    const handleAfinidadALaTematica = (e) => {
        setAfinidadALaTematicaVote(e.target.value)
    
    }

    const idJudge = localStorage.getItem('id')

    const handleFormVote = (e) => {
        e.preventDefault()


        fetch(`http://localhost:2023/judges/${idJudge}/votes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({jugabilidad, arte, sonido, afinidadALaTematica,game_id})
            
        })
        .then((res) => {
            if (res.status == 500) {
                throw new Error(`Ya votaste este juego`);
            }

            setErrorFormMessage("");

            return res.json();
        })
        .then(() => {
            window.location = `/judges/${idJudge}`;
        })
        .catch((error) => {
            setErrorFormMessage(error.message);
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
        <section className="section game-page">
            <div className="game-view">
                <div className="mb-4 rounded-xl overflow-hidden border flex items-center">
                    <picture>
                        <img className="object-cover" src={game.img} alt={game.name} />  
                    </picture>
                </div>
                <TitlePage>{game.name}</TitlePage>
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
            </div>
            <div className="game-form">
            <h3 className={`text-xl font-bold py-2 px-8 text-white text-center ${localStorage.getItem('rol') == '2' ? 'bg-purple-800' : 'bg-gray-500'}`}>
                {localStorage.getItem('rol') !== '2' ? "Debes ser juez para votar" : "Vota el juego"}
            </h3>                
            <form onSubmit={handleFormVote} className={localStorage.getItem('rol') !== '2' ? 'disabled-form' : ''}>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="jugabilidad">
                        Jugabilidad
                    </label>
                    <input required onChange={handleJugabilidadVoteChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="jugabilidad" type="number" />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="arte">
                        Arte
                    </label>
                    <input required onChange={handleArteVoteChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="arte" type="number" />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="sonido">
                        Sonido
                    </label>
                    <input required onChange={handleSonidoVoteChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="sonido" type="number" />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="afinidadALaTematica">
                        Afinidad a la temática
                    </label>
                    <input required onChange={handleAfinidadALaTematica} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="afinidadALaTematica" type="number" />
                </div>
                {errorFormMessage && (
                    <span className="text-white text-center m-auto mt-4 rounded bg-red-600 w-[50%]">{errorFormMessage}</span>
                )}
                <div className="px-3 flex justify-center mt-2">
                    <button disabled={localStorage.getItem('rol') !== '2'} className="font-bold py-[8px] px-[25px] rounded-full bg-purple-800 hover:bg-purple-500 transition-all duration-300 text-white" type="submit">
                        Votar
                    </button>
                </div>
            </form>
            </div>

        </section>
        </>
    )
}

export default GameView