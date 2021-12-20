import React from 'react';

class MyForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { 
            playlistName: '',
            playlistPublic: 'no',
            playlistDescription: '',
            userFavoriteGenre: 'Pop',
            failedSubmit: ''};

        this.handleChangePlaylistName = this.handleChangePlaylistName.bind(this);
        this.handleChangePlaylistPublic = this.handleChangePlaylistPublic.bind(this);
        this.handleChangePlaylistDescription = this.handleChangePlaylistDescription.bind(this);
        this.handleChangeUserFavoriteGenre = this.handleChangeUserFavoriteGenre.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangePlaylistName = (event) => 
    {
        this.setState({ playlistName: event.target.value });
        console.log(this.state.playlistName);
    }

    handleChangePlaylistPublic = (event) =>
    {
        this.setState({ playlistPublic: event.target.value });
        console.log(this.state.playlistPublic);
    }

    handleChangePlaylistDescription = (event) =>
    {
        this.setState({ playlistDescription: event.target.value });
        console.log(this.state.playlistDescription);
    }

    handleChangeUserFavoriteGenre = (event) => 
    {
        this.setState({ userFavoriteGenre: event.target.value });
        console.log(this.state.userFavoriteGenre);
    }

    handleSubmit = (event) =>
    {
        // if the required fields aren't completed, add text saying to complete fields
        if (this.state.playlistName === '')
        {
            this.setState({ failedSubmit: true });
        }
        else
        {
            console.log("Creating playlist.")
            console.log(this.state.playlistPublic);

            fetch('http://localhost:8080/create-playlist', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    "Content-Type": "application/json"
                },
            })
        }

        event.preventDefault();
    }

    render() 
    {
        return(
            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label for = "playlistName">* Playlist Name:</label>
                    <br></br>
                    <input id = "playlistName" className='form-control' type = "text" value = {this.state.playlistName} onChange={this.handleChangePlaylistName} />
                </div>
                <br></br>
                * Favorite Genre:
                <br></br>
                <select name = {this.state.userFavoriteGenre} id = {this.state.userFavoriteGenre} onChange={this.handleChangeUserFavoriteGenre}>
                    <option value = "Pop">Pop</option>
                    <option value = "Hip Hop">Rap & Hip Hop</option>
                    <option value = "Rock">Rock</option>
                    <option value = "Electronic">Electronic</option>
                    <option value = "Latin">Latin</option>
                    <option value = "Indie Rock">Indie Rock</option>
                    <option value = "Reggaeton">Reggaeton</option>
                    <option value = "K-Pop">K-Pop</option>
                    <option value = "R&B / Soul">R&B / Soul</option>
                    <option value = "Country">Country</option>
                </select>
                <br></br>
                * Would you like to make your playlist public?
                <br></br>
                <input type = "radio" id = "yes" value = "yes" name = "public" onChange={this.handleChangePlaylistPublic} checked = {this.state.playlistPublic === "yes"}/>
                <label forhtml = "yes">Yes</label>
                <input type = "radio" id = "no" value = "no" name= "public" onChange={this.handleChangePlaylistPublic} checked = {this.state.playlistPublic === "no"}/>
                <label forhtml = "no">No </label>
                <br></br>
                Playlist Description:
                <br></br>
                <input type = "text" value = {this.state.playlistDescription} onChange={this.handleChangePlaylistDescription} />
                <br></br>
                <button onChange={this.handleSubmit}>Create Playlist</button>
                <br></br>
                {this.state.failedSubmit ? (
                    <div>Please enter required information.</div>
                ) : null}
            </form>
        );
    }
}

export default MyForm;