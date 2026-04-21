import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();


export default function UserContextProvider({children}){
   
const [userToken , setUserToken] = useState(null)
 useEffect(()=>{
        if (localStorage.getItem('token')) {
            setUserToken(localStorage.getItem('token'))
        }
    },[userToken])
   return  <UserContext.Provider value={{userToken , setUserToken}}>
        {children}
    </UserContext.Provider>
}




