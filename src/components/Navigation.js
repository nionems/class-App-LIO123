import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"

export function Navigation ( props ){
    const [navItems, setNavItems] = useState([])


    useEffect( () =>{
        if (navItems.length == 0){
            setNavItems(props.items)
        }

    }, [ props.items ] )

    if (navItems.length > 0 ) {
        // NavigationLinks colletction return html each time in the array 
        const NavigationLinks = navItems.map( ( item ) => {
         return (
             <NavLink to = {item.path} className = "nav-link"> {item.name} </NavLink>
         )
        })
        
        return (

        <nav className = "navbar-nav me-auto mb-2 mb-lg-0">
           
             { NavigationLinks }
        </nav>
    )
}
else {
    return null 
}

}