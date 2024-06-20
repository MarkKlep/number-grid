import React, { useState } from 'react'
import { Form } from './components/form';
import { RegForm } from './components/reg-form';
import { SinglePlay } from './components/single-play';
import './App.css';

function App() {
  const [isRegFormOpen, setIsRegFormOpen] = useState(false);

  const handleOpenRegForm = () => {
    setIsRegFormOpen(!isRegFormOpen);
  }

  return (
    <div className="App">
      
      <SinglePlay />
     
    </div>
  );
}

export default App;
