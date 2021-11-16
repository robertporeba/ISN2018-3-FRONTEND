import React, { SyntheticEvent, useState } from "react";

const Register=() =>{

    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[type,setType]=useState('');

    const submit=async(e: SyntheticEvent)=>{

        e.preventDefault();

        const response=await fetch('https://localhost:44338/api/Register/Register',{

        method:'POST',
        
        headers: {'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
        body:JSON.stringify({
            email,
            password,
            type
        }) 
        });

        const content=await response.json();
        console.log(content);
    }

    return(
    
        <div id="login">
        
        <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                        <form id="login-form" className="form" onSubmit={submit}>
                            <h3 className="text-center text-info">Rejestracja</h3>
                            <div className="form-group">
                                
                                <input type="email" name="email" id="emial" className="form-control" placeholder="Podaj Email" required onChange={e => setEmail(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                
                                <input type="text" name="password" id="password" className="form-control" placeholder="Podaj hasło" required onChange={e => setPassword(e.target.value)}/>
                            </div>
                            
                            <div className="form-group">
    <select className="form-control" id="exampleFormControlSelect1" required onChange={e => setType(e.target.value)}>
      <option>User</option>
      <option>Admin</option>
  
    </select>
  </div>
                            <div className="form-group">
                                
                                <input type="submit" name="submit" className="btn btn-info btn-md" value="Wyślij"/>
                            </div>
                            <div id="register-link" className="text-right">
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
        );
    };
    export default Register;