import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoProvider } from '../../context/todo-context';
import Main from './main';
import '@testing-library/jest-dom';

describe('Main', () => {
    const todos = [
        { id: '1', text: 'Todo 1', completed: false },
        { id: '2', text: 'Todo 2', completed: true },
        { id: '3', text: 'Todo 3', completed: false },
    ];

    it('should render the list of todos based on the current filter = all', () => {
        render(
            <TodoProvider value={{ todos, filter: 'all', toggleTodo: jest.fn(), removeTodo: jest.fn() }}>
                <Main />
            </TodoProvider>
        );

        expect(screen.getByText('Todo 1')).toBeInTheDocument();
        expect(screen.getByText('Todo 2')).toBeInTheDocument();
        expect(screen.getByText('Todo 3')).toBeInTheDocument();

    });

    it('should render the list of todos based on the current filter = active',() => {
        render(
            <TodoProvider value={{ todos, filter: 'active', toggleTodo: jest.fn(), removeTodo: jest.fn() }}>
                <Main />
            </TodoProvider>
        );

        expect(screen.getByText('Todo 1')).toBeInTheDocument();
        expect(screen.queryByText('Todo 2')).not.toBeInTheDocument();
        expect(screen.getByText('Todo 3')).toBeInTheDocument();
    })

    it('should render the list of todos based on the current filter = completed',() => {
        render(
            <TodoProvider value={{ todos, filter: 'completed', toggleTodo: jest.fn(), removeTodo: jest.fn() }}>
                <Main />
            </TodoProvider>
        );

        expect(screen.queryByText('Todo 1')).not.toBeInTheDocument();
        expect(screen.getByText('Todo 2')).toBeInTheDocument();
        expect(screen.queryByText('Todo 3')).not.toBeInTheDocument();
    })

    it('should call toggleTodo when a todo checkbox is clicked', () => {
        const toggleTodoMock = jest.fn();

        render(
            <TodoProvider value={{ todos, filter: 'all', toggleTodo: toggleTodoMock, removeTodo: jest.fn() }}>
                <Main />
            </TodoProvider>
        );

        fireEvent.click(screen.getByLabelText('Todo 1'));
        expect(toggleTodoMock).toHaveBeenCalledWith('1');
    });

    it('should call removeTodo when the destroy button is clicked', () => {
        const removeTodoMock = jest.fn();

        render(
            <TodoProvider value={{ todos, filter: 'all', toggleTodo: jest.fn(), removeTodo: removeTodoMock }}>
                <Main />
            </TodoProvider>
        );

        fireEvent.click(screen.getAllByRole('button')[0]);
        expect(removeTodoMock).toHaveBeenCalledWith('1');
    });
});
