import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Todos from "./Components/Todos";
import Header from "./Components/Layout/Header";
import AddTodo from "./Components/AddTodo";
import About from "./Components/Pages/About";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
class App extends Component {

    state = {
        todos: []
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
            .then(res => this.setState({ todos: res.data }))
    }


    markComplete = (id) => {
        this.setState({ todos: this.state.todos.map(todo => {
                if(todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo;
            })
        });
    }

    delTodo = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(res => this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id
                )]}))
    }

    addTodo = (title) => {
        axios.post('https://jsonplaceholder.typicode.com/todos', {
            title,
            id:uuidv4,
            completed:false
        })
            .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
    }

    editTodo = (keyId, title) => {
        axios.put(`https://jsonplaceholder.typicode.com/todos/${keyId}`)
            .then(res => this.setState({todos: [...this.state.todos.map(todo => {
                        if(todo.id === keyId) {
                            todo.title = title
                        }
                        return todo;
                    })]
                }
            ))
        console.log(title)
        console.log(keyId)
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <div className='container'>
                        <Header />
                        <Route exact path='/' render={props => (
                            <React.Fragment>
                                <AddTodo addTodo={this.addTodo} />
                                <Todos
                                    todos={this.state.todos}
                                    markComplete={this.markComplete}
                                    delTodo={this.delTodo}
                                    editTodo={this.editTodo}
                                />
                            </React.Fragment>
                        )}>
                        </Route>
                        <Route path='/about' component={About} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
