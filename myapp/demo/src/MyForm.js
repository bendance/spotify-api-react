import React from 'react';

class MyForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { 
            userID: '',
            accessToken: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.authenticateUser = this.authenticateUser.bind(this);
    }

    handleChange = (event) => 
    {
        this.setState({ userID: event.target.value });
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

            const token = await data.text();
            this.setState({accessToken: token});
            console.log("Spotify API Token:", token);
        }
    }

    authenticateUser = async () =>
    {
        const data = await fetch("http://localhost:8080/login");

        const url = await data.text();
        
        window.location.href = url;
    }

    render() 
    {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username: 
                        <input type = "text" value = {this.state.userID} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                    <br></br>
                </form>

                <button onClick={this.authenticateUser}>Authenticate</button>
            </div>
        );
    }
}

export default MyForm;