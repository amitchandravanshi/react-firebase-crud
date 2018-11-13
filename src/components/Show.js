import React, { Component } from 'react'
import firebase from '../config/fbconfig'
import { Link } from 'react-router-dom'

class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: [],
            key: ''
        }
    }
    componentDidMount() {
        const dbRef = firebase.firestore().collection('projects').doc(this.props.match.params.id);
        dbRef.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    project: doc.data(),
                    key: doc.id,
                    isLoading: false
                });
            } else {
                console.log('No Such Document!');
            }
        });
    }
    delete(id) {
        firebase.firestore().collection('projects').doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
            this.props.history.push("/")
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4><Link to="/">Project List</Link></h4>
                        <h3 className="panel-title">
                            {this.state.project.title}
                        </h3>
                    </div>
                    <div className="panel-body">
                        <dl>
                            <dt>Content:</dt>
                            <dd>{this.state.project.content}</dd>
                        </dl>
                        <Link to={`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>&nbsp;
                        <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Show;