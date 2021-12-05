import React, { useEffect, useState } from 'react';
import './listprojects.scss';

import useUserIdentity from '../../../hooks/use-user-identity';
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/auth';
import { history } from '../../../utils/history';
import HeaderPanel from '../../../components/headerpanel/HeaderPanel';
import {ListGroup,ListGroupItem,Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import projectService from '../../../services/project.service';
import { IGetProject } from '../../../interfaces/project';

function Listproject() {
	const isAuth = useUserIdentity();
	const dispatch = useDispatch();

    const[projects, setProjects]=useState<any>();

	useEffect(()=>{
projectService.getallprojects().then((response)=>{

    setProjects(response)
}).catch((err)=>{

    console.log(err)
})

    }, [])

    

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
           {projects !== undefined && projects.map((project:any)=>(

<ListGroupItem className="mt-2"><h2>{project.name}</h2>
<div className="ml-auto">
    <Button><Link className="btn btn-warming mr-1" to={"/board/" +project.id}>Pokaż</Link></Button>
    <Button onClick={()=>projectService.deleteproject(project.id)} color="danger"><Link className="btn btn-warming mr-1" to="/listproject">Usuń</Link></Button>
</div>
</ListGroupItem>
           ))}
          
       </ListGroup>

        </div>
        
        <p>Uprawnienia: {isAuth.userRoles}</p>
        </div>
      
	);
}

export default Listproject;