import React from 'react';

const TodoForm = (props) => (
    <form onSubmit={props.onSubmit}>
        <input type="text"
               className="form-control"
               value={props.value}
               disabled={props.disabled}
               placeholder={props.placeholder}
               onInput={props.onInput} />
    </form>
);

export default TodoForm;