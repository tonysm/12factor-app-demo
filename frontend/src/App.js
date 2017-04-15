import React, {Component} from 'react';

import './App.css';

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

        let data = new FormData();
        data.append("task", newTodo);

        fetch('http://localhost:8080/todos', {
            method: "POST",
            body: data,
        })
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
        if (todo.deleted_at !== null) return;

        let {todos} = this.state;

        fetch(`http://localhost:8080/todos/${todo.id}`, {
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

    componentWillMount() {
        fetch('http://localhost:8080/todos')
            .then(resp => resp.json())
            .then(todos => this.setState({
                todos,
                loading: false,
            }));
    }

    renderTodo(todo) {
        let classes = ["list-group-item", "todo-item"];

        if (todo.deleted_at !== null) {
            classes.push("todo-completed");
        }

        return (
            <div className={classes.join(' ')} key={todo.id} onClick={this.deleteTodo.bind(this, todo)}>
                {todo.task}
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                <h1>Awesome todo app</h1>
                <hr/>

                <form onSubmit={this.createNewTodo.bind(this)}>
                    <input type="text"
                           className="form-control"
                           value={this.state.newTodo}
                           disabled={this.state.loading}
                           placeholder="Add a new todo"
                           onInput={this.updateNewTodo.bind(this)}/>
                </form>

                <hr/>

                <h4>Todos <small>({this.state.todos.length})</small></h4>
                <div className="list-group">
                    {this.state.todos.map((todo) => this.renderTodo(todo))}
                    {this.state.todos.length === 0 ? <div className="list-group-item">Nothing todo.</div> : null}
                </div>
            </div>
        );
    }
}

export default App;
