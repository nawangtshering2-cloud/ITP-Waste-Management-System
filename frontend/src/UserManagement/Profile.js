
import React, {useState,useEffect,useContext} from "react";

import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';


export default function DisplayRouteRequest() {
  

  const {user} = useContext(AuthContext);



    const[profile,setprofile] = useState([]);

    useEffect(()=>{
            
        axios.get("http://localhost:8070/user/profiles").then((res)=>{
                setprofile(res.data.existingUsers);
            }).catch((err)=>{
                alert(err.message);
             })
        

    },[])

    
    const setData = (data) => {
        let { _id,name, username,phone,email,nic,gender,role} = data;

        localStorage.setItem('uid', _id);
        localStorage.setItem('name', name);
        localStorage.setItem('username', username);
        localStorage.setItem('phone', phone);
        localStorage.setItem('email', email);
        localStorage.setItem('nic', nic);
        localStorage.setItem('gender', gender);
        localStorage.setItem('role', role);

        

}



    return (
        <div className = "container " style={{width:"100%"}}>

                 <div className="addform1"><h1>All User Accounts </h1></div>


             
                 <a className="btn btn-warning" 
                            type="button"
                            href={`http://localhost:3000/report`}
                            style={{textDecoration:'none'}}>
                            <i></i>&nbsp;Generate Report
                            </a>

      
        <table className="table" >
  
          <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">NIC</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                  </tr>
                 
          </thead>
         <tbody>
             {profile.map((data,index)=>(
                    
                    <tr key={index}>
                       <th scope="row">{index+1}</th>
                       <td>{data.name}</td>
                       <td>{data.username}</td>
                       <td>{data.phone}</td>
                       <td>{data.email}</td>
                       <td>{data.nic}</td>
                       <td>{data.gender}</td>
                       <td>{data.role}</td>
                      

                       <td>
  
                         <a className="btn btn-warning" href={`/editprofile/${data._id}`} onClick={() => setData(data)}>
                            <i className= "fas fa-edit"></i>&nbsp;Edit
                         </a>
                         &nbsp;
                         <a className="btn btn-danger" href={`/deleteprofile/${data._id}`} onClick={() => setData(data)}>
                            <i className= "fas fa-trash-alt"></i>&nbsp;Delete
                         </a>

                         &nbsp;
                         {
                        data.role === "User" ? 
                         <a className="btn btn-success" style={{marginLeft:'24vh',marginTop:'-8.5vh'}} href={`/addpoints/${data._id}`} onClick={() => setData(data)}>
                            <i className= "fas fa-plus"></i>&nbsp;Points
                         </a>:null}

  
                       </td>
  
                    </tr>
                  
  
             ))}
             
           
           </tbody> 
  
        </table>
     </div>
    )
}