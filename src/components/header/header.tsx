import React, {useState} from "react";
import "./style.css";
import {useTodoContext} from "../../context/todo-context";

function Header() {
    const context = useTodoContext();
    const [value, setValue] = useState('');

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value;

        if(e.key === 'Enter') {
            e.preventDefault();
            if(inputValue.trim() !== '') {
                const id = String(context.todos.length)
                context.addTodo({id, text: inputValue, completed: false});
                setValue('');
            }
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
    };

    return (
        <header className="header">
            <h1>todos</h1>
            <form>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    autoFocus
                    type="text"
                    onKeyDown={onKeyDown}
                    onChange={onChange}
                    value={value}
                />
            </form>
        </header>
    )
}

export default Header;
