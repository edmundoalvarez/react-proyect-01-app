import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link} from "@nextui-org/react";

const Header = () => {

  const idJudge = localStorage.getItem('id')

  let sesionOn = false;

  if(idJudge) {
    sesionOn = true;
  }

  const handleLogOut = (e) => {

    e.preventDefault()

    fetch('https://react-project-01-api.vercel.app/api/session', {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
      },

    })
      .then((res)=>res.json())
      .then(()=>{
        
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('rol')
        window.location = `/`;
      
      })
  }

  return(
    <header className="border bg-gray-50">
      <Navbar>
        <NavbarBrand>
          
          <h1 className="font-bold text-inherit text-2xl pb-1 border-b-3 border-purple-700">Games Vote Awards 2023</h1>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" to="/">
              Inicio
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground"  to="/games">
              Juegos
            </Link>
          </NavbarItem>
          <NavbarItem>
            {localStorage.getItem('rol') === '1' && (
              <Link color="foreground" to="/judges">
                Jueces
              </Link>
            )}
          </NavbarItem>
          <NavbarItem>
            {localStorage.getItem('rol') === '2' && (
              <Link color="foreground" to={`/judges/${idJudge}`}>
                Mi Perfil
              </Link>
            )}
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" >
          {!sesionOn ? 
            <div className="flex flex-row gap-[30px]">
              <NavbarItem>
                <Link color="secondary" to="/login">Iniciar Sesión</Link>
              </NavbarItem> 
              {/* <NavbarItem>
                <Link color="secondary" href="/signup">Crear cuenta</Link>
              </NavbarItem>   */}
            </div> : 
            <div className="flex flex-row gap-[30px]">
              
              <NavbarItem>
                <button className="text-purple-700 hover:cursor-pointer" onClick={handleLogOut}>Cerrar Sesión</button>
              </NavbarItem>
            </div>
          }
        </NavbarContent>
      </Navbar>
    </header>
  )
}

export default Header