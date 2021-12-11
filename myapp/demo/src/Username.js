import React from 'react';

class Username extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {username: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event)
    {
        this.setState({username: event.target.value})
    }

    handleSubmit(event) 
    {
        alert('A username was submitted: ' + this.state.username);
        event.preventDefault();
    }

    render()
    {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username:
                    <input type = "text" value = {this.state.value} onChange={this.handleChange} />
                </label>
                <input type = "submit" value="Submit" />
            </form>
        );
    }
}

export default Username;