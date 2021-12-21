import MyForm from './MyForm'
import Authentication from './authentication'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React, { useState } from 'react';
import Success from './Success';

function App(props)
{
  const [tokenActive, setTokenActive] = useState("false");
  const [creatingPlaylist, setCreatingPlaylist] = useState(true);
  const [playlistUrl, setPlaylistUrl] = useState('');

  const handleSetTokenActive = () => {
    setTokenActive("true");
  } 

  const handleSetCreatingPlaylist = (truthValue) => {
    setCreatingPlaylist(truthValue);
  }

  const handleSetPlaylistUrl = (url) => {
    setPlaylistUrl(url);
  }

  return(
      <div className="app">
        <div className='content'>
            {creatingPlaylist === true ? [
              <h1>Spotify Playlist Generator</h1>,
              <br></br>
            ] : null}
            {(tokenActive === "true" && creatingPlaylist === true)? (
              <MyForm handleSetCreatingPlaylist = {handleSetCreatingPlaylist} handleSetPlaylistUrl = {handleSetPlaylistUrl}/>
            ) : (tokenActive === "false" && creatingPlaylist === true) ? (
              <Authentication handleSetTokenActive = {handleSetTokenActive}/>
            ) : (creatingPlaylist === false) ? (
              console.log(playlistUrl),
              <Success url = {playlistUrl} handleSetCreatingPlaylist = {handleSetCreatingPlaylist}/>
            ) : null}
        </div>
    </div>
  )
}

export default App;
