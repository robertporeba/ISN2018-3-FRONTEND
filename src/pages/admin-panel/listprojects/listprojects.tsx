import React, { useEffect, useState } from 'react';
import './listprojects.scss';
import { Button, Table } from 'semantic-ui-react'
import useUserIdentity from '../../../hooks/use-user-identity';
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/auth';
import { history } from '../../../utils/history';


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
     

        
        <div className="project-container">
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nazwa Projektu</Table.HeaderCell>
                       
                        <Table.HeaderCell>Akcja</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        
                        <Table.Cell>Moja nazwa projektu</Table.Cell>
                        <Table.Cell>

    <Button >Wyświetl</Button>
   <Button >Delete</Button>
</Table.Cell>

                    </Table.Row>
                    <Table.Row>
                        
                        <Table.Cell>Kolejny</Table.Cell>
                        <Table.Cell>

    <Button >Wyświetl</Button>
   <Button >Delete</Button>
</Table.Cell>

                    </Table.Row>
                    
                </Table.Body>
                
            </Table>
        </div>
	);
}

export default Listproject;