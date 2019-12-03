import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Todos from './components/Todos';
import Header from './components/layout/header';
import AddTodo from './components/AddTodo';
import about from './components/pages/about';
// import uuid from 'uuid';
import axios from 'axios';

class App extends Component {

  state = {
    todos: []
  }

  // get request to automatically fill in todos state array with fake info from site
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?limit=10')
    .then(res => this.setState({todos: res.data}))
  }
  
  // Toggle Complete
  markComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }

// Delete Todo Item from the list 
  delTodo = (id) => {
axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res =>this.setState({todos:[...this.state.todos.filter(todo => todo.id !==id)]}));
    
  }

  // Add Todo item to List by using setState and change it via spread operator 
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title:title, completed:false
    })
      .then(res => this.setState({
        todos: [...this.state.todos, res.data] }));
  
  }

  render () {
    return (
    <Router>
      <div className="App">
        <div className='container'>
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
              <AddTodo addTodo={this.addTodo}/>
              <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
            </React.Fragment>
            )} />
            <Route path="/about" component={about} />
        </div>
      </div>
    </Router>
    );
  }  
}

export default App;
 