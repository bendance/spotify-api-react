import React from 'react';

class MyForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { name: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    render() 
    {
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type = "text" value = {this.state.name} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default MyForm;