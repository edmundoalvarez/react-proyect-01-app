
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import TitlePage from '../components/TitlePage';
import { Link } from 'react-router-dom';

function JudgesList(){

    const [judges, setJudges] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        fetch('http://localhost:2023/judges', {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        .then((response)=> {
            if(response.ok){
                return response.json()
            }
            else if(response.status === 401){
                console.log('No autorizado')
                navigate('/login', {replace: true})
            }
        })
        .then((data)=>{
            setJudges(data)
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

            <TitlePage>Lista de jueces</TitlePage>
            <div className="w-full">
                <button className="rounded-full bg-purple-800 py-3 px-4 text-white">
                    <Link to={`/judges/new-judge`}>Registrar nuevo Juez</Link>
                </button>
            </div>

            <div className="game-list">
                {judges.map((judge,id)=>
                    judge.rol == 2 ?
                        <div key={id} className="p-4  border-2 w-[600px] rounded-xl border-purple-800 flex flex-row justify-between items-center self-center">
                            <div className="game-card h-full flex flex-col justify-between">
                                <p className="text-lg">Email: <b>{judge.email}</b></p>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <button className='py-2  bg-red-600 rounded-full text-white px-4'>
                                    <Link to={`/judges/${judge._id}/eliminar`}>Eliminar</Link>
                                </button>
                            </div>
                        </div>
                    : ""
                )}
            </div>
        </section>
        </>
    )
}

export default JudgesList