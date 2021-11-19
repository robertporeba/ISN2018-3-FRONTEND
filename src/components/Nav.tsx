import React from "react";
import { BrowserRouter, Link,Route } from "react-router-dom";

const Nav=() =>{

    return(

        <nav className="navbar navbar-expand-md navbar-light bg-light mb-4">
        <div className="container-fluid">
        <Link to="/" className="navbar-brand"   >Home</Link>
        </div>
       <ul className="navbar-nav me-auto mb-2 mb-md-0">
         <li className="nav-item-active">
            <Link to="/login" className="nav-link " >Login</Link>
            </li>
            <li className="nav-item-active">
            <Link to="/register" className="nav-link  "  >Rejestracja</Link>
            </li>
            <li className="nav-item-active">
            <Link to="/board" className="nav-link  "  >Tablica</Link>
            </li>
            <li className="nav-item-active">
            <Link to="/createtask" className="nav-link  "  >Task</Link>
            </li>
          </ul>
        
      </nav>

    );


};

export default Nav;