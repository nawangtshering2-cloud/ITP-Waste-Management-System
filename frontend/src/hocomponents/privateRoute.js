import React, {useContext} from 'react';
import {Route,Redirect} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const PrivateRoute = ({component : Component, roles, ...rest})=>{
    const { isAuthenticated, user} = useContext(AuthContext);
    const currentRole = String(user && user.role ? user.role : '').toLowerCase();
    const allowedRoles = (roles || []).map(role => String(role).toLowerCase());
    return(
        <Route {...rest} render={props =>{
            if(!isAuthenticated)
                return <Redirect to={{ pathname: '/login', 
                            state : {from : props.location}}}/>

            if(!allowedRoles.includes(currentRole))
                return <Redirect to={{ pathname: '/', 
                            state : {from : props.location}}}/>
                return <Component {...props}/>
        }}/>
    )
}

export default PrivateRoute;