import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {TodoProvider} from '../../context/todo-context';
import '@testing-library/jest-dom'
import Footer from './footer';

describe('Footer', () => {
    it('should not render the footer when there are no todos', () => {
        render(
            <TodoProvider value={{todos: [], filter: 'all', setFilter: jest.fn(), clearCompleted: jest.fn()}}>
                <Footer/>
            </TodoProvider>
        );

        expect(screen.queryByText('items left')).not.toBeInTheDocument();
    });

    it('should render the correct number of active todos', () => {
        const todos = [
            {id: '1', text: 'Todo 1', completed: false},
            {id: '2', text: 'Todo 2', completed: true},
            {id: '3', text: 'Todo 3', completed: false},
        ];

        render(
            <TodoProvider value={{todos, filter: 'all', setFilter: jest.fn(), clearCompleted: jest.fn()}}>
                <Footer/>
            </TodoProvider>
        );

        expect(screen.getByText('2 items left')).toBeInTheDocument();
    });

    it('should call setFilter with the correct filter value when a filter link is clicked', () => {
        const setFilterMock = jest.fn();

        render(
            <TodoProvider value={{
                todos: [{id: '1', text: 'Todo 1', completed: false}],
                filter: 'all',
                setFilter: setFilterMock,
                clearCompleted: jest.fn()
            }}>
                <Footer/>
            </TodoProvider>
        );

        fireEvent.click(screen.getByText('Active'));
        expect(setFilterMock).toHaveBeenCalledWith('active');

        fireEvent.click(screen.getByText('Completed'));
        expect(setFilterMock).toHaveBeenCalledWith('completed');

        fireEvent.click(screen.getByText('All'));
        expect(setFilterMock).toHaveBeenCalledWith('all');
    });

    it('should call clearCompleted when the "Clear completed" button is clicked', () => {
        const clearCompletedMock = jest.fn();

        render(
            <TodoProvider value={{
                todos: [{id: '1', text: 'Todo 1', completed: true}],
                filter: 'all',
                setFilter: jest.fn(),
                clearCompleted: clearCompletedMock
            }}>
                <Footer/>
            </TodoProvider>
        );

        fireEvent.click(screen.getByText('Clear completed'));
        expect(clearCompletedMock).toHaveBeenCalled();
    });
});
