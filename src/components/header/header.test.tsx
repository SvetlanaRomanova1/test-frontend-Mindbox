import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'

import {TodoProvider, useTodoContext} from '../../context/todo-context';
import Header from './header';

describe('Header', () => {
    it('should render the header with the correct title', () => {
        render(
            <TodoProvider>
                <Header />
            </TodoProvider>
        );

        expect(screen.getByText('todos')).toHaveTextContent('todos');
    });

    it('should add a new todo when Enter is pressed with a non-empty value', () => {
        const addTodoMock = jest.fn();
        render(
            <TodoProvider value={{addTodo: addTodoMock}}>
                <Header />
            </TodoProvider>
        );

        const input = screen.getByPlaceholderText('What needs to be done?');
        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(addTodoMock).toHaveBeenCalledWith({
            id: '0',
            text: 'New Todo',
            completed: false,
        });
        expect(input).toHaveValue('');
    });

    it('should not add a new todo when Enter is pressed with an empty value', () => {
        const addTodoMock = jest.fn();
        render(
            <TodoProvider value={{addTodo: addTodoMock}}>
                <Header />
            </TodoProvider>
        );

        const input = screen.getByPlaceholderText('What needs to be done?');
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(addTodoMock).not.toHaveBeenCalled();
    });

    it('should update the input value when typing', () => {
        render(
            <TodoProvider>
                <Header />
            </TodoProvider>
        );

        const input = screen.getByPlaceholderText('What needs to be done?');
        fireEvent.change(input, { target: { value: 'New Todo' } });

        expect(input).toHaveAttribute('value', 'New Todo');
    });
});
