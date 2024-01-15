import { Navigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
function RoutePrivate({children}){
    console.log(localStorage.getItem('token'))
    if(!localStorage.getItem('token') || localStorage.getItem('token') == "undefined"){
        return <Navigate to={'/login'} remplace={true} />
    } 
    return children

}

export default RoutePrivate