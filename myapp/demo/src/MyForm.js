import React from 'react';

class MyForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { userID: ''};

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
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json"
            },
        })

        event.preventDefault();
    }

    authenticateUser = async () =>
    {
        const result = await fetch("http://localhost:8080/login", {
            mode: 'no-cors'
        });

        const url = await result.text();
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