import React from "react";

function Success(props)
{
    const openPlaylist = () => {
        window.open(
            "https://www.apple.com/", 
            '_blank'
        );
    }

    return(
        <div className="text-center">
            <h2 className="text-center">Your playlist has been successfully created!</h2>
            <div className = "d-flex">
                <button type = "button" className = "btn btn-primary" onClick={openPlaylist}>Go To Playlist</button>
                <button type = "button" className = "btn btn-primary">Create Another</button>
            </div>
        </div>
    )
}

export default Success;