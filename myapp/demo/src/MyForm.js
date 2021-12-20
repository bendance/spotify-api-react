import React from 'react';
import Loader from 'react-loader-spinner';

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
            failedSubmit: '',
            playlistLoading: false};

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

    handleSubmit = async (event) =>
    {
        // if the required fields aren't completed, add text saying to complete fields
        if (this.state.playlistName === '')
        {
            this.setState({ failedSubmit: true });
            event.preventDefault();
        }
        else
        {
            // replace create playlist button with loading icon
            console.log("Creating playlist.")
            this.setState({ playlistLoading: true });

            event.preventDefault();

            const response = await fetch('http://localhost:8080/create-playlist', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    "Content-Type": "application/json"
                },
            })

            if (typeof response !== "undefined")
                console.log("Sending success screen.")
                this.props.handleSetCreatingPlaylist(false);
        }
    }

    callCreate = (event) => {
        this.handleSubmit(event);
        return false;
    }

    render() 
    {
        return(
            <div>
                <form onSubmit={this.callCreate}>
                    <div className='form-group'>
                        {this.state.failedSubmit ? (
                            <label className='text-danger' htmlFor = "playlistName">* Playlist Name:</label>
                        ) : <label htmlFor = "playlistName">* Playlist Name:</label>}
                        <br></br>
                        <input id = "playlistName" className='form-control' type = "text" value = {this.state.playlistName} onChange={this.handleChangePlaylistName} />
                    </div>
                    {this.state.failedSubmit ? ( 
                        <div className='text-danger'>Please fill out the required field.</div>
                    ) : null}
                    <br></br>
                    <div className='form-group'>
                        <label htmlFor = "favoriteGenre">* Favorite Genre:</label>
                        <br></br>
                        <select id = "favoriteGenre" className = "form-control" onChange={this.handleChangeUserFavoriteGenre}>
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
                    </div>
                    <br></br>
                    <div className='form-group'>
                        * Would you like to make your playlist public?
                        <br></br>
                        <div className='form-check'>
                            <input className='form-check-input' type = "radio" id = "yes" value = "yes" name = "public" onChange={this.handleChangePlaylistPublic} checked = {this.state.playlistPublic === "yes"}/>
                            <label className='form-check-label' htmlFor = "yes">Yes</label>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' type = "radio" id = "no" value = "no" name= "public" onChange={this.handleChangePlaylistPublic} checked = {this.state.playlistPublic === "no"}/>
                            <label className='form-check-label' htmlFor = "no">No </label>
                        </div>
                    </div>
                    <br></br>
                    <div className='form-group'>
                        <label htmlFor = "playlistDescription">Playlist Description:</label>
                        <br></br>
                        <textarea className='form-control' rows = "3" id = "playlistDescription" value = {this.state.playlistDescription} onChange={this.handleChangePlaylistDescription} />
                    </div>
                    <br></br>
                    <div className='text-center'>
                        { !(this.state.playlistLoading) ? (
                            <button className='btn btn-primary'>Create Playlist</button>
                        ) : this.state.playlistLoading ? (
                            <Loader type="ThreeDots" color="#0d6efd"/>
                        ) : null}
                    </div>
                    <br></br>
                </form>
            </div>
        );
    }
}

export default MyForm;