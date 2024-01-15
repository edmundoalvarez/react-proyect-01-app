
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import {Card, CardBody, CardHeader, Image} from "@nextui-org/react";
import TitlePage from '../components/TitlePage';
import ButtonMedium from '../components/ButtonMedium';
import { Link } from 'react-router-dom';

function GamesList(){

    const [games, setGames] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        fetch('https://react-project-01-api.vercel.app/games', {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        
        })
        .then((response)=> {
            // console.log(response)
            if(response.ok){
                return response.json()
            }
            else if(response.status === 401){
                console.log('No autorizado')
                navigate('/login', {replace: true})
            }
        })
        .then((data)=>{
            setGames(data)
        })

        return ()=>{
            console.log(
                'Se desmontó el componente'
            )
        }
    }, []);

    return(
        <>
        <section className="section">

            <TitlePage>Lista de juegos</TitlePage>
            {localStorage.getItem('rol') == 1 ?
                <div className='flex'>
                    <ButtonMedium>
                        <Link to={`/games/new-game`}>Nuevo Juego</Link>
                    </ButtonMedium> 
                </div> : ''
            }
            <div className="game-list">
                {games.map((game,id)=>
                    <Card key={id} className="p-4 w-[300px] h-[400px]">
                        <CardHeader className="items-stretch h-[150px] p-[0px] overflow-hidden rounded-xl">
                            <Image
                                alt="Imagen del juego"
                                src={game.img}

                            />
                        </CardHeader>
                        <CardBody className="overflow-visible pb-[0px]">
                            <div className="game-card h-full flex flex-col justify-between">
                                <h4 className="font-bold text-lg mb-2">{game.name}</h4>
                                <p className="text-tiny uppercase font-bold">{game.genre}</p>
                                <small className="text-default-500">{game.edition}</small>
                                <p className="text-tiny uppercase font-bold mt-2">Total de votos: <span className="font-normal normal-case">{game.totalVotes ? game.totalVotes : "- No tiene votos -"}</span></p>
                                <div className="mx-auto mt-6 flex flex-col gap-2">
                                    <div className="mx-auto flex flex-row gap-2">
                                        <ButtonMedium>
                                            <Link to={`/games/${game._id}`}>Ver detalle</Link>
                                        </ButtonMedium>
                                        {localStorage.getItem('rol') == 1 ?
                                            <button className='bg-red-600 rounded-full text-white px-4'>
                                                <Link to={`/games/${game._id}/eliminar`}>Eliminar</Link>
                                            </button> : ''
                                        }                      
                                    </div>
                                    {localStorage.getItem('rol') == 1 ?
                                        <button className='py-2 bg-yellow-400 rounded-full text-black px-4'>
                                            <Link to={`/games/${game._id}/editar`}>Editar</Link>
                                        </button> : ''
                                    }   
                                </div>
                            </div>
                            
                        </CardBody>
                    </Card>
                )}
            </div>
        </section>
        </>
    )
}

export default GamesList