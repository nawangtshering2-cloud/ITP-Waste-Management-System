import React, {createContext,useState,useEffect} from 'react';
import AuthService from '../Services/AuthService';

export const AuthContext = createContext();

export default ({ children })=>{
    const defaultUser = { _id: '', username: '', name: '', phone: '', email: '', nic: '', gender: '', role: '', status: '' };
    const [user,setUser] = useState(defaultUser);
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [isLoaded,setIsLoaded] = useState(false);

    useEffect(()=>{
        AuthService.isAuthenticated().then(data =>{
            setUser(data.user || defaultUser);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        });
    },[]);

    return (
        <div>
            {!isLoaded ? <h1>Loading</h1> : 
            <AuthContext.Provider value={{user,setUser,isAuthenticated,setIsAuthenticated}}>
                { children }
            </AuthContext.Provider>}
        </div>
    )
}