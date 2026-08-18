import React, {useState, useEffect}  from 'react';
import axios from "axios";
import { useHistory } from 'react-router';


export default function DeleteRouteRequest()  {

  let history = useHistory();

    
  const [uid, setuid] = useState();
  const [name, setname] = useState();
  const [username, setusername] = useState();
  const [phone, setphone] = useState();
  const [email, setemail] = useState();
  const [nic, setnic] = useState();
  const [gender, setgender] = useState();
  const [role, setrole] = useState();


    useEffect(() => {

      setuid(localStorage.getItem('uid'));
      setname(localStorage.getItem('name'));
      setusername(localStorage.getItem('username'));
      setphone(localStorage.getItem('phone'))
      setemail(localStorage.getItem('email'));
      setnic(localStorage.getItem('nic'));
      setgender(localStorage.getItem('gender'))
      setrole(localStorage.getItem('role'));
       


    },[] );


    function deleteData() {
        

        axios.delete(`/user/deleteUser/${uid}`).then(()=>{

            alert("Account Delete successfully");
            history.push('/profiles');
             
    
         }).catch((err)=>{
    
            alert(err);
         })
    

    }

        return (
            <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150"/>
                    <div class="mt-3">
                      <h4>{name}</h4><br/>
                      <p>User ID</p>
                      <p>{uid}</p>
                    </div><br/>
                    <div class="row">
                    <a className="btn btn-danger" href="#" onClick={deleteData}>
                <i className="fas fa-trash-alt"></i>&nbsp;Delete
            </a><br/>
                </div>
                  </div>
                </div>
              </div>
              </div>
            <div class="col-md-8">
            <div class="card mb-3">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Name</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                  {name}
                  </div>
                </div>
                <hr/>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Username</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {username}
                  </div>
                </div>
                <hr/>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Phone</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {phone}
                  </div>
                </div>
                <hr/>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Email</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {email}
                  </div>
                </div>
                <hr/>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">NIC</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {nic}
                  </div>
                </div>
                <hr/>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Gender</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {gender}
                  </div>
                </div>
                <hr/>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Role</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {role}
                  </div>
                </div>
              </div>
            </div>
            </div>
</div>
        )
    }


