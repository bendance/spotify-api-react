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
            </div>
        );
    }
}

export default MyForm;