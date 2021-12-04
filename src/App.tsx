import React, { lazy, Suspense } from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from './utils/history';
import { RoleRoute } from './utils/http';

import Loader from './components/util/Loader';

import './App.scss';
import { Admin, User } from './interfaces/auth';

import Kanban from './pages/admin-panel/boardv3/Kanban';





const Home = lazy(() => import('./pages/home/Home'));
const UserPage = lazy(() => import('./pages/admin-panel/AdminPanel'));
const Addproject=lazy(()=>import ('./pages/admin-panel/addproject/addproject'));
const Listproject=lazy(()=>import ('./pages/admin-panel/listprojects/listprojects'));
const Board=lazy(()=>import ('./pages/admin-panel/board/board'));
function App() {
	return (
		<div className="App">
			<Router history={history}>
				<Suspense fallback={<Loader />}>
					<Route exact path="/" component={Home} />
					<RoleRoute path="/admin-panel" role={[User, Admin]}>
						<UserPage />
					</RoleRoute>
					<RoleRoute path="/addproject" role={[Admin]}>
						<Addproject/>
					</RoleRoute>
					<RoleRoute path="/listproject" role={[User, Admin]}>
						<Listproject/>
					</RoleRoute>
					<RoleRoute path="/board" role={[User, Admin]}>
						<Board/>
					</RoleRoute>
					<RoleRoute path="/boardv2" role={[User, Admin]}>
						<Kanban/>
					</RoleRoute>
				</Suspense>
			</Router>
		</div>
	);
}

export default App;
