import React, { Component } from 'react';

class AddUserForm extends Component {
    state = {
        name: "",
        bio: "",
        hideForm: true
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    showForm = e => {
        e.preventDefault();
        this.setState({ hideForm: false });
    }
    hideForm = e => {
        e.preventDefault();
        this.setState({ hideForm: true });
    }
    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            bio: this.state.bio
        }
        this.props.addUser(newUser);
        this.setState({
            name: "",
            bio: "",
            hideForm: true
        })
    }
    render() {
        return (
            <div className="add-user-wrapper">
                {
                    this.state.hideForm && (
                        <div className="plus" onClick={this.showForm}><p>+</p></div>
                    )
                }
                {
                    !this.state.hideForm && (
                        <div className="form-wrapper">
                            <h1>To add new user, please, provide the following information and hit "Add":</h1>
                            <form onSubmit={this.onSubmit}>
                                <input 
                                    type="text"
                                    placeholder="Name"
                                    name='name'
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    required
                                />
                                <input 
                                    type="text"
                                    placeholder="Bio"
                                    name='bio'
                                    value={this.state.bio}
                                    onChange={this.handleChange}
                                    required
                                />
                                <button className="btn">Add</button>
                            </form>
                            <div className="hide-form" onClick={this.hideForm}>⬆︎</div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default AddUserForm;