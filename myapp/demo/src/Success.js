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
            <br></br>
            <div className="row" style={{width: "320px", margin: "auto"}}>
                <div className="col">
                        <button type = "button" className = "btn btn-primary" onClick={openPlaylist} style = {{margin: "auto"}}>Go To Playlist</button>
                </div>
                <div className="col">
                    <button type = "button" className = "btn btn-primary" onClick={reloadPage}>Create Another</button>
                </div>
            </div>
        </div>
    );
};

export default Success;