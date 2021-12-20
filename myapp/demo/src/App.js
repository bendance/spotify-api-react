import MyForm from './MyForm'
import Authentication from './authentication'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React, { useState } from 'react';

function App(props)
{
  const [tokenActive, setTokenActive] = useState("false");

  const handleSetTokenActive = () => {
    setTokenActive("true");
  } 

  return(
      <div className="app">
        <div className='content'>
            <h1>Spotify Playlist Generator</h1>
            <br></br>
            {tokenActive === "true" ? (
              <MyForm setTokenActive = {setTokenActive}/>
            ) : tokenActive === "false" ? (
              <Authentication handleSetTokenActive = {handleSetTokenActive}/>
            ) : null}
        </div>
    </div>
  )
}

export default App;
