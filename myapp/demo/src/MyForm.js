import React from 'react';

class MyForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { name: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.authenticateUser = this.authenticateUser.bind(this);
    }

    handleChange = (event) => 
    {
        this.setState({ name: event.target.value });
    }

    handleSubmit = (event) =>
    {
        alert('A form was submitted: ' + this.state.name);
        
        console.log(JSON.stringify(this.state))

        fetch('http://localhost:8080/store-data', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function(response)
        {
            console.log(response);
            return response.json();
        });

        event.preventDefault();
    }

    authenticateUser = async () =>
    {
        const result = await fetch("http://localhost:8080/authenticate-user");
        
        const url = await result.text();

        // create a new window for users to authenticate themselves
        window.open(url);
    }

    render() 
    {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username: 
                        <input type = "text" value = {this.state.name} onChange={this.handleChange} />
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