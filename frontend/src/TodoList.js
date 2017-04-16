import React from 'react';

const renderTodo = (todo, onDismiss) => {
    let classes = ["list-group-item", "todo-item"];

    if (todo.deleted_at !== null) {
        classes.push("todo-completed");
    }

    return (
        <div
            className={classes.join(' ')}
            key={todo.id}
            onClick={() => onDismiss(todo)}
        >
            {todo.task}
        </div>
    );
};

const TodoList = (props) => (
    <div className="list-group">
        {props.items.map((todo) => renderTodo(todo, props.onDismiss))}
        {props.items.length === 0 ? <div className="list-group-item">{props.whenEmpty}</div> : null}
    </div>
);

export default TodoList;