import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import firebase from './config/fbconfig'

class App extends Component {
  constructor(props) {
    super(props);
    this.dbRef = firebase.firestore().collection('projects');
    this.unsubscribe = null;
    this.state = {
      projects: []
    }
  }
  componentDidMount() {
    console.log(this.dbRef.onSnapshot((querySnapshot) => {
      const projects = [];
      querySnapshot.forEach((doc) => { 
        const { title, content } = doc.data();
        projects.push({
          key:doc.id,
          title,
          content
        });
      });
      this.setState({projects});
    }));
  }
  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              PROJECT LIST
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/create">Add Project</Link></h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Content</th>
                </tr>
              </thead>
              <tbody>
                {this.state.projects.map(project =>
                  <tr>
                    <td><Link to={`/show/${project.key}`}>{project.title}</Link></td>
                    <td>{project.content}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

