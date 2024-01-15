import { useState } from "react";
import TitlePage from "../components/TitlePage"

function GameNew (){

    const opcionesGenero = [
        "Acción",
        "Aventura",
        "Estrategia",
        "Rol",
        "Deportes",
        "RPG",
      ];
    
    const years = [];
        for (let year = 1950; year <= 2023; year++) {
        years.push(year);
    }

    const [creador1, setCreador1] = useState("");
    const [creador2, setCreador2] = useState("");
    const [creador3, setCreador3] = useState("");
    const [name , setName] = useState("");
    const [genre, setGenre] = useState("");
    const members = [creador1, creador2, creador3].filter(Boolean);

    const [edition, setEdition] = useState("");
    const [img, setImg] = useState("");

    const [nameError, setNameError] = useState("");
    const [genreError, setGenreError] = useState("");
    const [membersError, setMembersError] = useState("");
    const [editionError, setEditionError] = useState("");
    const [imgError, setImgError] = useState("");


    const handleNameChange =(e) => {

        if(e.target.value === "") {
            setName(null)
        } else {
            setName(e.target.value)
        }
    }
    const handleGenreChange =(e) => {
        if(e.target.value === "") {
            setGenre(null)
        } else {
            setGenre(e.target.value)
        }
    }
    const handleEditionChange =(e) => {
        if (e.target.value === "") {
            setEdition(null)
        } else {
            setEdition(e.target.value)
        }
    }
    const handleImgChange =(e) => {
        if (e.target.value === "") {
            setImg(null)
        } else {
            setImg(e.target.value)
        }
    }
    const handleCreador1Change = (e) => {
        if (e.target.value === "") {
            setCreador1(null)
        } else {
            setCreador1(e.target.value)
        
        }
    }
    const handleCreador2Change = (e) => {
        if (e.target.value === "") {
            setCreador2(null)
        } else {
            setCreador2(e.target.value)
        
        }
    }
    const handleCreador3Change = (e) => {
        if (e.target.value === "") {
            setCreador3(null)
        } else {
            setCreador3(e.target.value)
        }
    }
    
    const handleCreateGame = (e) => {
        e.preventDefault();
        console.log('enviando..')

        fetch("http://localhost:2023/games/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, genre, members, edition, img}),
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((error) => Promise.reject(error));
            }
        })        
        .then((result) => {
            if (result) {
                window.location = `/games/${result._id}`;
            }
        })
        .catch((error) => {
            console.error("Error al crear el juego.", error);

            setNameError("");
            setGenreError("");
            setMembersError("");
            setEditionError("");
            setImgError("");

            if (error.msg) {
                error.msg.forEach((msg) => {
                    if (msg.name) {
                        setNameError(msg);
                    } else if (msg.genre) {
                        setGenreError(msg);
                    } else if (msg.members) {
                        setMembersError(msg);
                    } else if (msg.edition) {
                        setEditionError(msg);
                    } else if (msg.img) {
                        setImgError(msg);
                    }
                });
            }
        });
    }

    return (
        <>
            <section className="section">
            <TitlePage>Crear juego</TitlePage>
            <div className="border rounded-md w-[700px]">
            <form onSubmit={handleCreateGame} className="px-4 py-6 flex flex-col gap-4">
                <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="name"
                    >
                        Nombre
                    </label>
                    <input
                        onChange={handleNameChange}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="name"
                        type="text"
                    />
                    {nameError && <p className="text-red-500">{nameError.name}</p>}                    
                </div>

                <div className="w-full px-3 mb-6 md:mb-0 flex flex-row gap-4">
                <div className="w-[50%]">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="genre"
                    >
                    Género
                    </label>
                    <select
                        className=" block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="genre"
                        defaultValue=""
                        onChange={handleGenreChange}
                    >
                    <option value="" disabled>
                        Selecciona un género
                    </option>

                    {opcionesGenero.map((genero) => (
                        <option key={genero} value={genero}>
                        {genero}
                        </option>
                    ))}
                    </select>
                    {genreError && <p className="text-red-500">{genreError.genre}</p>}                    

                </div>
                <div className="w-[50%]">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="edition"
                    >
                    Año de lanzamiento
                    </label>
                    <select
                        className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="edition"
                        defaultValue=""
                        onChange={handleEditionChange}
                    >
                    <option value="" disabled>
                        Selecciona un año de lanzamiento
                    </option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                        {year}
                        </option>
                    ))}
                    </select>
                    {editionError && <p className="text-red-500">{editionError.edition}</p>}                    
                </div>
                </div>
                <div className="w-full px-3 mb-6 md:mb-0 flex flex-col gap-0">
                    <div className="w-full px-0 md:mb-0 flex flex-row gap-4">
                        <div className="w-[33%]">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="creador1"
                            >
                            Creador 1*
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="creador1"
                                type="text"
                                value={creador1}
                                onChange={handleCreador1Change}
                            />
                        </div>
                        <div className="w-[33%]">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="creador2"
                            >
                            Creador 2
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="creador2"
                                type="text"
                                value={creador2}
                                onChange={handleCreador2Change}
                            />
                        </div>
                        <div className="w-[33%]">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="creador3"
                            >
                            Creador 3
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="creador3"
                                type="text"
                                value={creador3}
                                onChange={handleCreador3Change}
                            />
                        </div>
                    </div>
                    {membersError && <p className="text-red-500">{membersError.members}</p>}                    
                </div>
                <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="img"
                    >
                        Link de img
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="img"
                        type="text"
                        onChange={handleImgChange}
                    />
                    {imgError && <p className="text-red-500">{imgError.img}</p>}                    

                </div>
                <div className="px-3 flex justify-center mt-2">
                <button
                    className="font-bold py-[8px] px-[25px] rounded-full bg-purple-800 hover:bg-purple-500 transition-all duration-300 text-white"
                    type="submit"
                >
                    Crear juego
                </button>
                </div>
            </form>
            </div>
        </section>
        </>
    )
}

export default GameNew