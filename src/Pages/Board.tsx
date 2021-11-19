import dragula from "dragula";
import React, { useEffect, useState } from "react";
import Dragula from 'react-dragula';
import { Link } from "react-router-dom";
import 'C:/repo/ISN2018-3-FRONTEND/ISN2018-3-FRONTEND/src/Board.css';
import 'C:/repo/ISN2018-3-FRONTEND/ISN2018-3-FRONTEND/src/board.js';
const Board=() =>{
  


    return(
    
        <div className="container py-5">
        <div className="row">
      
         
          <div className="col-12 col-lg-4">
            <div className="card mb-3">
              <div className="card-header bg-light">
                <h3 className="card-title h5 mb-1">
                  TODO
                </h3>
                <small className="mb-0 text-muted">
                  Zadania do wykonania
                </small>
              </div>
              <div className="card-body">
                <div className="tasks" id="backlog">
                  
                <div className="card mb-0">
                                                <div className="card-body p-3">
                                                    <small className="float-end text-muted">18 Jul 2018</small>
                                                    <span className="badge bg-danger">High</span>

                                                    <h5 className="mt-2 mb-2">
                                                        <a href="#" data-bs-toggle="modal" data-bs-target="#task-detail-modal" >iOS App home page</a>
                                                    </h5>

                                                    <p className="mb-0">
                                                        <span className="pe-2 text-nowrap mb-2 d-inline-block">
                                                            <i className="mdi mdi-briefcase-outline text-muted"></i>
                                                            iOS
                                                        </span>
                                                        <span className="text-nowrap mb-2 d-inline-block">
                                                            <i className="mdi mdi-comment-multiple-outline text-muted"></i>
                                                            <b>74</b> Comments
                                                        </span>
                                                    </p>

                                                    <div className="dropdown float-end">
                                                        <a href="#" className="dropdown-toggle text-muted arrow-none" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i className="mdi mdi-dots-vertical font-18"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                           
                                                            <a href="javascript:void(0);" className="dropdown-item"><i className="mdi mdi-pencil me-1"></i>Edit</a>
                                                            
                                                            <a href="javascript:void(0);" className="dropdown-item"><i className="mdi mdi-delete me-1"></i>Delete</a>
                                                            
                                                            <a href="javascript:void(0);" className="dropdown-item"><i className="mdi mdi-plus-circle-outline me-1"></i>Add People</a>
                                                          
                                                            <a href="javascript:void(0);" className="dropdown-item"><i className="mdi mdi-exit-to-app me-1"></i>Leave</a>
                                                        </div>
                                                    </div>
                                                    </div>
                                                   </div>
                  
                  
               
                </div>
                <Link to="/createtask" className="nav-link  " > <div className="btn btn-primary btn-block">Add task</div></Link>
              </div>
            </div>
          </div>
          
      
          
          <div className="col-12 col-lg-4">
            <div className="card mb-3">
              <div className="card-header bg-light">
                <h3 className="card-title h5 mb-1">
                  In Progress
                </h3>
                <small className="mb-0 text-muted">
                  Zadanie w trakcie prac
                </small>
              </div>
              <div className="card-body">
                <div className="tasks" id="progress">
                  
               
                 
             
               
                </div>
                
              </div>
            </div>
          </div>
         
          <div className="col-12 col-lg-4">
            <div className="card mb-3">
              <div className="card-header bg-light">
                <h3 className="card-title h5 mb-1">
                  Done
                </h3>
                <small className="mb-0 text-muted">
                  Zadanie wykonane
                </small>
              </div>
              <div className="card-body">
                <div className="tasks" id="completed">
               
                  
                  
                  
                  
                </div>
                
              </div>
            </div>
          </div>
          
      
        </div>
      </div>
    );
};
    export default Board;