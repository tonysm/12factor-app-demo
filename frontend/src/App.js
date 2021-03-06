import React, {Component} from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

import './App.css';

const SERVER_HOST='http://localhost:8081';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newTodo: '',
            todos: [],
            loading: true,
        };
    }

    updateNewTodo(e) {
        this.setState({
            newTodo: e.target.value,
        });
    }

    createNewTodo(e) {
        e.preventDefault();

        if (this.state.loading) return;

        this.setState({
            loading: true,
        });

        let {todos, newTodo} = this.state;

        let body = new FormData();
        body.append("task", newTodo);

        fetch(`${SERVER_HOST}/todos`, {method: "POST", body})
            .then(resp => resp.json())
            .then(todo => {
                this.setState({
                    todos: [
                        ...todos,
                        todo
                    ],
                    loading: false,
                    newTodo: ''
                });
            });
    }

    deleteTodo(todo) {
        let {todos} = this.state;

        if (todo.deleted_at !== null) {
            const isNotId = (item) => item.id !== todo.id;

            this.setState({
                todos: todos.filter(isNotId),
                loading: false,
            });

            return;
        }

        fetch(`${SERVER_HOST}/todos/${todo.id}`, {
                method: "DELETE",
            })
            .then(resp => resp.json())
            .then(updatedTodo => {
                let indexOf = todos.indexOf(todo);

                this.setState({
                    todos: [
                        ...(todos.slice(0, indexOf)),
                        updatedTodo,
                        ...(todos.slice(indexOf + 1))
                    ],
                    loading: false,
                });
            });
    }

    componentDidMount() {
        fetch(`${SERVER_HOST}/todos`)
            .then(resp => resp.json())
            .then(todos => this.setState({
                todos,
                loading: false,
            }));
    }

    render() {
        return (
            <div className="container">
                <h1>Awesome todo app</h1>

                <hr/>

                <TodoForm
                    onSubmit={this.createNewTodo.bind(this)}
                    onInput={this.updateNewTodo.bind(this)}
                    value={this.state.newTodo}
                    disabled={this.state.loading}
                    placeholder="Add a new todo"
                />

                <hr/>

                <h4>Todos <small>({this.state.todos.length})</small></h4>

                <TodoList
                    items={this.state.todos}
                    whenEmpty="Nothing todo"
                    onDismiss={this.deleteTodo.bind(this)}
                />
            </div>
        );
    }
}

export default App;
