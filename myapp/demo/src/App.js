import MyForm from './MyForm'
import Authentication from './authentication'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {tokenActive: false}
  }
  
  // takes an boolean value indicating whether the token has been created or nots
  tokenHandler = (bool) => {
    this.setState({tokenActive: bool})
  }

  render() {return(
    <div className="App">
      <p>Spotify API Interaction</p>
      {this.state.tokenActive ? (
        <MyForm tokenHandler = {this.tokenHandler} />
      ) : !this.state.tokenActive ? (
        <Authentication tokenHandler = {this.tokenHandler}/>
      ) : null}
    </div>
  )}
}

export default App;
