import fetch from "node-fetch";
import keys from './spotify-api-keys.js';

const APIController = (function() {

    const clientId = keys.clientID;
    const clientSecret = keys.clientSecret;

    const _requestAuthorization = () => {
        let url = "https://accounts.spotify.com/authorize";
        url += `?client_id=${keys.clientID}`;
        url += "&response_type=code";
        url += "&redirect_uri=" + encodeURI("http://localhost:3000/");
        url += "&show_dialog=true";
        url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-top-read playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public";
        return url;
    }

    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }

    const _createPlaylist = async (token, userID) => {

        const result = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await result.json();
        return data.external_urls.spotify;
    }

    return {
        requestAuthorization()
        {
            return _requestAuthorization();
        },
        getToken()
        {
            return _getToken();
        },
        createPlaylist(token, userID)
        {
            return _createPlaylist();
        }
    }
})();

export default APIController;