import React from "react";

const Login=() =>{

    return(
        <div id="login">
        
        <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                        <form id="login-form" className="form" action="" method="post">
                            <h3 className="text-center text-info">Login</h3>
                            <div className="form-group">
                                
                                <input type="text" name="username" id="username" className="form-control" placeholder="Podaj Login"/>
                            </div>
                            <div className="form-group">
                                
                                <input type="text" name="password" id="password" className="form-control" placeholder="Podaj hasło"/>
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