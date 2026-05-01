import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export const UserContext = createContext();


export default function UserContextProvider({children}){
   
const [userToken , setUserToken] = useState(null)
const [userData , setUserData] = useState(null)
 useEffect(()=>{
    const token = localStorage.getItem("token");
        if (token) {
            setUserToken(localStorage.getItem('token'))
            const decoded = jwtDecode(token);
            setUserData(decoded);
        }
    },[userToken])
   return  <UserContext.Provider value={{userToken , setUserToken, userData, setUserData}}>
        {children}
    </UserContext.Provider>
}




