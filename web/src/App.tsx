import React, { useState } from 'react'
import { SinglePlay } from './components/single-play';
import { HomePage } from './components/home-page';
import './App.css';

function App() {
  const [isRegFormOpen, setIsRegFormOpen] = useState(false);

  const handleOpenRegForm = () => {
    setIsRegFormOpen(!isRegFormOpen);
  }

  return (
    <div className="App">
      
      <HomePage />
     
    </div>
  );
}

export default App;
