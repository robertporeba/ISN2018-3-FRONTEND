import React, { useEffect, useState } from 'react';
import './listprojects.scss';

import useUserIdentity from '../../../hooks/use-user-identity';
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/auth';
import { history } from '../../../utils/history';
import HeaderPanel from '../../../components/headerpanel/HeaderPanel';
import {ListGroup,ListGroupItem,Button} from 'reactstrap';
import { Link } from 'react-router-dom';

function Listproject() {
	const isAuth = useUserIdentity();
	const dispatch = useDispatch();

	function logOut() {
		dispatch(logout());
	}

	if (isAuth.userRoles === null) {
		history.push('/');
	}
	const [panelForm, setPanelForm] = useState<boolean>(true);
	return (
     

        <div className="admin-panel-container">
        <HeaderPanel setPanelForm={setPanelForm} />
        <h1>Twoje projekty</h1>
        <div className="admin-panel-container__forms">


        
       <ListGroup>
           <ListGroupItem className="mt-2"><h2>Projekt 1</h2>
           <div className="ml-auto">
               <Button><Link className="btn btn-warming mr-1" to="/board">Pokaż</Link></Button>
               <Button color="danger">Usuń</Button>
           </div>
           </ListGroupItem>
           <ListGroupItem className="mt-2"><h2>Projekt 1</h2>
           <div className="ml-auto">
               <Button><Link className="btn btn-warming mr-1" to="/board">Pokaż</Link></Button>
               <Button color="danger">Usuń</Button>
           </div>
           </ListGroupItem>
       </ListGroup>

        </div>
        
        <p>Uprawnienia: {isAuth.userRoles}</p>
        </div>
      
	);
}

export default Listproject;