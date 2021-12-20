import React from "react";

const Success = (props) =>
{
    const openPlaylist = () => {
        window.open(
            `${props.url}`, 
            '_blank'
        );
    };

    const reloadPage = () => {
        window.location.href = "http://localhost:3000/";
    }

    return(
        <div className="text-center">
            <h2 className="text-center">Your playlist has been successfully created!</h2>
            <div className = "d-flex">
                <button type = "button" className = "btn btn-primary" onClick={openPlaylist}>Go To Playlist</button>
                <button type = "button" className = "btn btn-primary" onClick={reloadPage}>Create Another</button>
            </div>
        </div>
    );
};

export default Success;