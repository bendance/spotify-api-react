import React from "react";

class Authentication extends React.Component
{
    authenticateUser = async () =>
    {
        const data = await fetch("http://localhost:8080/login");

        const url = await data.text();
        
        window.location.href = url;
    }

    componentDidMount = async () => {
        // parse the url code and send it to the backend to be sent API key
        var url = new URL(window.location.href);
        var codeText = url.searchParams.get('code');

        if (codeText)
        {
            const data = await fetch("http://localhost:8080/callback", {
                method: 'POST',
                body: JSON.stringify({code: codeText}),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            
            // evaluate if a token was created
            const token = await data.text();
            if(token === 'true')
                this.props.handleSetTokenActive();
            console.log("Was Spotify Token Created?:", token);
        }
    }

    render() {
        return(
            <div>
                <button onClick={this.authenticateUser}>Authenticate</button>
            </div>
    )}
}

export default Authentication;