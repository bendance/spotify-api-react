import React from "react";

const Success = (props) =>
{
    const openPlaylist = () => {
        window.open(
            `${props.url}`, 
            '_blank'
        );
    };

    const goBackToForm = () => {
        props.handleSetCreatingPlaylist(true);
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
                    <button type = "button" className = "btn btn-primary" onClick={goBackToForm}>Create Another</button>
                </div>
            </div>
        </div>
    );
};

export default Success;