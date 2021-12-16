import React from 'react';

class MyForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { 
            playlistName: '',
            playlistPublic: '',
            playlistDescription: '',
            userFavoriteGenre: ''};

        this.handleChangePlaylistName = this.handleChangePlaylistName.bind(this);
        this.handleChangePlaylistPublic = this.handleChangePlaylistPublic.bind(this);
        this.handleChangePlaylistDescription = this.handleChangePlaylistDescription.bind(this);
        this.handleChangeUserFavoriteGenre = this.handleChangeUserFavoriteGenre.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangePlaylistName = (event) => 
    {
        this.setState({ playlistName: event.target.value });
    }

    handleChangePlaylistPublic = (event) =>
    {
        this.setState({ playlistPublic: event.target.value });
    }

    handleChangePlaylistDescription = (event) =>
    {
        this.setState({ playlistDescription: event.target.value });
    }

    handleChangeUserFavoriteGenre = (event) => 
    {
        this.setState({ userFavoriteGenre: event.target.value });
    }

    handleSubmit = (event) =>
    {
        alert('A form was submitted: ' + this.state.userID);

        fetch('http://localhost:8080/create-playlist', {
            method: 'POST',
            body: JSON.stringify({userID: this.state.userID}),
            headers: {
                "Content-Type": "application/json"
            },
        })

        event.preventDefault();
    }

    render() 
    {
        return(
            <form onSubmit={this.handleSubmit}>
                <label for= {this.state.playlistName}>Playlist Name: </label>
                <br></br>
                <input type = "text" value = {this.state.playlistName} onChange={this.handleChangePlaylistName} />
                <br></br>
                <label for = {this.state.playlistDescription}>Playlist Description: </label>
                <br></br>
                <input type = "text" value = {this.state.playlistDescription} onChange={this.handleChangePlaylistDescription} />
                <br></br>
                <label for = {this.state.userFavoriteGenre}>Favorite Genre: </label>
                <br></br>
                <select name = {this.state.userFavoriteGenre} id = {this.state.userFavoriteGenre} onChange={this.handleChangeUserFavoriteGenre}>
                    <option value = "Pop">Pop</option>
                    <option value = "Hip Hop">Hip Hop</option>
                    <option value = "Rock">Rock</option>
                    <option value = "Electronic">Electronic</option>
                    <option value = "Latin">Latin</option>
                </select>
                <br></br>
                Would you like to make your playlist public? 
                <input type = "checkbox" id = "Playlist Public" onChange={this.handleChangePlaylistPublic} />
                <br></br>
            </form>
        );
    }
}

export default MyForm;