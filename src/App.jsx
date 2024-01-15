import './index.css'
import { createBrowserRouter, RouterProvider, Outlet, /* Route */ } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import JudgesList from './pages/JudgesList'
import JudgeDelete from './pages/JudgeDelete'
import GamesList from './pages/GamesList'
import GameNew from './pages/GameNew'
import GameDelete from './pages/GameDelete'
import GameEdit from './pages/GameEdit'
import RoutePrivate from './components/RoutePrivate'
import MyProfile from './pages/MyProfile'
import { NextUIProvider } from '@nextui-org/react'
import ErrorPage from './pages/ErrorPage'
import SendPasswordRecovery from './pages/SendPasswordRecovery'
import SendedPasswordRecovery from './pages/SendedPasswordRecovery'
import PasswordRecovery from './pages/PasswordRecovery'
import GameView from './pages/GameView'
import JudgeNew from './pages/JudgeNew'
import JudgeEdit from './pages/JudgeEdit'
import Header from './layout/Header'
import Footer from './layout/Footer'

const route = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'games',
        children: [
            {
              path: '',
              element: <GamesList />,
    
            },
            {
              path: ':idGame',
              element: <GameView />
            },
            {
              path: 'new-game',
              element: <GameNew />
            },
            {
              path: ':idGame/eliminar',
              element: <RoutePrivate><GameDelete /></RoutePrivate>
            },
            {
              path: ':idGame/editar',
              element: <RoutePrivate><GameEdit /></RoutePrivate>
            },
          ]
      },
      {
        path: 'judges',
        children: [
            {
              path: '',
              element: <JudgesList />,
    
            },
            {
              path: ':idJudge',
              element: <RoutePrivate><MyProfile /></RoutePrivate>
    
            },
            {
              path: 'new-judge',
              element: <JudgeNew />
            },
            {
              path: ':idJudge/eliminar',
              element: <RoutePrivate><JudgeDelete /></RoutePrivate>
            },
            {
              path: ':idJudge/editar',
              element: <RoutePrivate><JudgeEdit /></RoutePrivate>
            },
            
          ]
      },
    ]
    
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/recuperar-contrasena',
    element: <SendPasswordRecovery />
  },
  {
    path: '/recuperar-contrasena-enviada',
    element: <SendedPasswordRecovery />
  },
  {
    path: '/restablecer-contrasena',
    element: <PasswordRecovery />
  },
])

function App() {
  
  return ( 
    <NextUIProvider> 
      <Header />
      <RouterProvider router={route} />
      <Outlet />
      <Footer />
    </NextUIProvider>
  )
}

export default App