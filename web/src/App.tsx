import React from 'react';
import { HomePage } from './components/home-page';
import { RegForm } from './components/reg-form';
import { AuthoForm } from './components/autho-form';
import { Route, Routes } from 'react-router-dom';
import { SinglePlay } from './components/single-play';
import './App.css';

function App() {

  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<HomePage/>}>
          <Route index path="/" element={<AuthoForm/>}/>
          <Route path="reg-form" element={<RegForm/>} />
        </Route>
        <Route path="single-play" element={<SinglePlay/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
