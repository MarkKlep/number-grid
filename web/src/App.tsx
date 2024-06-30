import React, { useState } from 'react';
import { HomePage } from './components/home-page';
import { RegForm } from './components/reg-form';
import { AuthoForm } from './components/autho-form';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<HomePage/>}>
          <Route index path="/" element={<AuthoForm/>}></Route>
          <Route path="reg-form" element={<RegForm/>} />
        </Route>
      </Routes>
     
    </div>
  );
}

export default App;
