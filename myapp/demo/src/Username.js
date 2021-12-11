import React from 'react';

class Username extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {username: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event)
    {
        this.setState({username: event.target.username});
    }

    render()
    {
        return (
            <form action="../../post" method = "post" className="form">
                <label>
                    Username:
                    <input type = "text" value = {this.state.username} onChange={this.handleChange} />
                </label>
                <input type = "submit" value="Submit" />
            </form>
        );
    }
}

export default Username;