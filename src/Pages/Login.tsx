import React, { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router";

const Login=() =>{

    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[redirect, setRedirect]=useState(false);

    const submit=async(e: SyntheticEvent)=>{
    
        e.preventDefault();

        await fetch('https://localhost:44338/api/Login/Login',{

        method:'POST',
        headers: {'Content-Type': 'application/json',
          },
          credentials:'include',
        body:JSON.stringify({
            email,
            password,
            
        }) 
        });

     setRedirect(true);
        
    }
    if(redirect){

        return <Navigate to="/"/>
    }
    
    return(
        <div id="login">
        
        <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                    <form id="login-form" className="form" onSubmit={submit}>
                            <h3 className="text-center text-info">Login</h3>
                            <div className="form-group">
                                
                                <input type="text" name="email" id="email" className="form-control" required onChange={e => setEmail(e.target.value)} placeholder="Podaj Login"/>
                            </div>
                            <div className="form-group">
                                
                                <input type="text" name="password" id="password" className="form-control"  required onChange={e => setPassword(e.target.value)} placeholder="Podaj hasło"/>
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

export default Login;