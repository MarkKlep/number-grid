import React, { useState } from 'react'
import { Form } from './components/form/form';
import { RegForm } from './components/reg-form/reg-form';
import './App.css';

function App() {
  const [isRegFormOpen, setIsRegFormOpen] = useState(false);

  const handleOpenRegForm = () => {
    setIsRegFormOpen(!isRegFormOpen);
  }

  return (
    <div className="App">
      
      <Form />
      
      <span onClick={handleOpenRegForm}>Don`t have an account?</span>

      {isRegFormOpen && (
          <RegForm />
      )}
    </div>
  );
}

export default App;
