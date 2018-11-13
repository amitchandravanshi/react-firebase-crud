import React, { Component } from 'react'
import firebase from '../config/fbconfig'
import { Link } from 'react-router-dom'

class Edit extends Component {
    constructor(props) {
        super(props);
        this.dbRef = firebase.firestore().collection('projects').doc(this.props.match.params.id);
        this.state = {
            key: '',
            title: '',
            content: ''
        }

    }
    componentDidMount() {
        this.dbRef.get().then((doc) => {
            const project = doc.data();
            if (doc.exists) {
                this.setState({
                    key: doc.id,
                    title: project.title,
                    content: project.content
                });
            } else {
                console.log('No Such Document');
            }
        });
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { title,content } = this.state;
        this.dbRef.set({
            title,
            content
        }).then((docRef) => {
            this.setState({
                key:'',
                title:'',
                content:'',
            });
            this.props.history.push('/show/' + this.props.match.params.id);
        }).catch((err) => {
            console.log('Error editing document',err);
        });
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            EDIT PROJECT
                </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={`/show/${this.state.key}`} className="btn btn-primary">Project List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">content:</label>
                                <input type="text" className="form-control" name="content" value={this.state.content} onChange={this.onChange} placeholder="Description" />
                            </div>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;