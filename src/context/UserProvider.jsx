import { useEffect, useState } from "react"
import userContext from "./userContext"

const UserProvider = ({ children }) => {

    const [user, setUser] = useState({
        name: 'Nityanand'
    })

    useEffect(() => {//can load any data from apis
        setUser({
            name: 'Ankit Kumar'
        })
    }, [])

    return (
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider;