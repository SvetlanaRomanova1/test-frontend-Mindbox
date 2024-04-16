import React from 'react';
import {useTodoContext} from "../../context/todo-context";
import './style.css';

function Main() {
    const context = useTodoContext();

    const onToggle = (id: string) => {
        context.toggleTodo(id);
    }

    const onDestroy = (id: string) => {
        context.removeTodo(id)
    }

    const filteredTodos = context.todos.filter((todo) => {
        if (context.filter === 'all') {
            return true;
        } else if (context.filter === 'active') {
            return !todo.completed;
        } else if (context.filter === 'completed') {
            return todo.completed;
        }
    });

    return (
        <section className="main">
            <ul className="todo-list">
                {filteredTodos.map((todo) => {

                    return (
                        <li
                            key={todo.id}
                            className="[if(done, 'completed')]"
                        >
                            <div className="view">
                                <input
                                    id={todo.id}
                                    property="done"
                                    className="toggle"
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => onToggle(todo.id)}
                                />
                                <label htmlFor={todo.id} className={todo.completed ? 'completed' : ''}>
                                    {todo.text}
                                </label>
                                <button
                                    onClick={() => onDestroy(todo.id)}
                                    className="destroy">

                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

export default Main;
