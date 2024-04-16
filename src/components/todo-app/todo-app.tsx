import React from 'react';

import Main from "../main/main";
import Header from "../header/header";
import Footer from "../footer/footer";
import './style.css';
import {TodoProvider} from "../../context/todo-context";

function TodoApp() {
    return (
        <TodoProvider>
        <section className="todoapp">
            <Header/>
            <Main/>
            <Footer/>
        </section>
        </TodoProvider>
    )
}

export default TodoApp;
