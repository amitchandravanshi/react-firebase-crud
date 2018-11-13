import React, { Component } from 'react'
import firebase from '../config/fbconfig'
import { Link } from 'react-router-dom'


class Create extends Component {
    constructor() {
        super();
        this.dbRef = firebase.firestore().collection('projects');
        this.state = {
            title: '',
            content: ''
        }
    }
    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { title, content } = this.state;
        this.dbRef.add({
            title,
            content
        }).then((docRef) => {
            this.setState({
                title: '',
                content: ''
            });
            this.props.history.push('/');
        })
            .catch((err) => {
                console.log("Error editing document", err);
            });
    }
    render() {
        const { title, description, author } = this.state;
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            ADD PROJECT
                </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to="/" className="btn btn-primary">Project List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label for="title">Title:</label>
                                <input type="text" className="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
                            </div>
                            <div className="form-group">
                                <label for="content">content:</label>
                                <textArea className="form-control" name="content" onChange={this.onChange} placeholder="content" cols="80" rows="3">{description}</textArea>
                            </div>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Create;