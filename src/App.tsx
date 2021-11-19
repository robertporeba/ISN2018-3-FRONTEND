import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';

import './App.css';
import Nav from './components/Nav';
import Board from './Pages/Board';
import CreateTask from './Pages/CreateTask';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  return (
    <div className="App">
  


<BrowserRouter>
<Nav />
<Routes>
<Route
  path='/'
  element={<Home />}
/>
<Route
  path='/Login'
  element={<Login />}
/>
<Route
  path='/Register'
  element={<Register />}
/>
<Route
  path='/Board'
  element={<Board />}
/>

<Route
  path='/CreateTask'
  element={<CreateTask />}
/>
</Routes>
</BrowserRouter>

    </div>
  );
}

export default App;
