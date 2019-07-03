import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './components/chat/chat.jsx'
import Form from './components/form/form.jsx'

function App() {
  return (
    <div className="App">
      <Chat/>
      <Form/>
    </div>
  );
}

export default App;
