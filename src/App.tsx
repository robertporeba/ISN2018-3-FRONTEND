import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';

import './App.css';
import Nav from './components/Nav';

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
</Routes>
</BrowserRouter>

    </div>
  );
}

export default App;
