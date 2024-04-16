import React from 'react';
import {useTodoContext} from "../../context/todo-context";
import './style.css';

function Footer() {
    const context = useTodoContext();
    const todoCount = context.todos.reduce((acc, item) => {
        if (!item.completed) {
            acc = acc + 1
        }
        return acc;
    }, 0);

    if (!context.todos.length) {
        return null;
    }

    return (
        <footer className="footer">
            <span className="todo-count">{todoCount} items left</span>
            <ul className="filters">
                <li>
                    <a
                        href="#"
                        onClick={() => context.setFilter('all')}
                        className="[if(active_filter = 'all', 'selected')]"
                    >
                        All
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="[if(active_filter = 'active', 'selected')]"
                        onClick={() => context.setFilter('active')}
                    >Active</a>
                </li>
                <li>
                    <a
                        href="#"
                        onClick={() => context.setFilter('completed')}
                        className="[if(active_filter = 'completed', 'selected')]"
                    >
                        Completed
                    </a>
                </li>
            </ul>
            <button
                onClick={context.clearCompleted}
                className="clear-completed"
            >
                Clear completed
            </button>
        </footer>
    );
}

export default Footer;
