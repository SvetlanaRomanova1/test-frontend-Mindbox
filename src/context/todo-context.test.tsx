import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { TodoProvider, useTodoContext } from './todo-context';
import '@testing-library/jest-dom';

describe('TodoProvider', () => {
    it('should provide the initial state', () => {
        const TestComponent = () => {
            const { todos, filter } = useTodoContext();
            return (
                <>
                    <div data-testid="todos">{JSON.stringify(todos)}</div>
                    <div data-testid="filter">{filter}</div>
                </>
            );
        };

        render(
            <TodoProvider>
                <TestComponent />
            </TodoProvider>
        );

        expect(screen.getByTestId('todos')).toHaveTextContent('[]');
        expect(screen.getByTestId('filter')).toHaveTextContent('all');
    });

    it('should add a todo', () => {
        const TestComponent = () => {
            const { todos, addTodo } = useTodoContext();
            return (
                <>
                    <div data-testid="todos">{JSON.stringify(todos)}</div>
                    <button onClick={() => addTodo({ id: '1', text: 'New Todo', completed: false })}>
                        Add Todo
                    </button>
                </>
            );
        };

        render(
            <TodoProvider>
                <TestComponent />
            </TodoProvider>
        );

        fireEvent.click(screen.getByText('Add Todo'));

        expect(screen.getByTestId('todos')).toHaveTextContent(
            '[{"id":"1","text":"New Todo","completed":false}]'
        );
    });

    it('should remove a todo', () => {
        const TestComponent = () => {
            const { todos, addTodo, removeTodo } = useTodoContext();
            return (
                <>
                    <div data-testid="todos">{JSON.stringify(todos)}</div>
                    <button onClick={() => addTodo({ id: '1', text: 'New Todo', completed: false })}>
                        Add Todo
                    </button>
                    <button onClick={() => removeTodo('1')}>Remove Todo</button>
                </>
            );
        };

        render(
            <TodoProvider>
                <TestComponent />
            </TodoProvider>
        );

        fireEvent.click(screen.getByText('Add Todo'));
        fireEvent.click(screen.getByText('Remove Todo'));

        expect(screen.getByTestId('todos')).toHaveTextContent('[]');
    });

    it('should toggle a todo', () => {
        const TestComponent = () => {
            const { todos, addTodo, toggleTodo } = useTodoContext();
            return (
                <>
                    <div data-testid="todos">{JSON.stringify(todos)}</div>
                    <button onClick={() => addTodo({ id: '1', text: 'New Todo', completed: false })}>
                        Add Todo
                    </button>
                    <button onClick={() => toggleTodo('1')}>Toggle Todo</button>
                </>
            );
        };

        render(
            <TodoProvider>
                <TestComponent />
            </TodoProvider>
        );

        fireEvent.click(screen.getByText('Add Todo'));
        fireEvent.click(screen.getByText('Toggle Todo'));

        expect(screen.getByTestId('todos')).toHaveTextContent(
            '[{"id":"1","text":"New Todo","completed":true}]'
        );
    });

    it('should clear completed todos', () => {
        const TestComponent = () => {
            const { todos, addTodo, toggleTodo, clearCompleted } = useTodoContext();
            return (
                <>
                    <div data-testid="todos">{JSON.stringify(todos)}</div>
                    <button onClick={() => addTodo({ id: '1', text: 'New Todo', completed: false })}>
                        Add Todo
                    </button>
                    <button onClick={() => toggleTodo('1')}>Toggle Todo</button>
                    <button onClick={clearCompleted}>Clear Completed</button>
                </>
            );
        };

        render(
            <TodoProvider>
                <TestComponent />
            </TodoProvider>
        );

        fireEvent.click(screen.getByText('Add Todo'));
        fireEvent.click(screen.getByText('Toggle Todo'));
        fireEvent.click(screen.getByText('Clear Completed'));

        expect(screen.getByTestId('todos')).toHaveTextContent('[]');
    });

    it('should set the filter', () => {
        const TestComponent = () => {
            const { filter, setFilter } = useTodoContext();
            return (
                <>
                    <div data-testid="filter">{filter}</div>
                    <button onClick={() => setFilter('active')}>Set Active Filter</button>
                </>
            );
        };

        render(
            <TodoProvider>
                <TestComponent />
            </TodoProvider>
        );

        fireEvent.click(screen.getByText('Set Active Filter'));

        expect(screen.getByTestId('filter')).toHaveTextContent('active');
    });

    it('should override context values with the provided value prop', () => {
        const TestComponent = () => {
            const { todos } = useTodoContext();
            return <div data-testid="todos">{JSON.stringify(todos)}</div>;
        };

        const customTodos = [{ id: '1', text: 'Custom Todo', completed: false }];

        render(
            <TodoProvider value={{ todos: customTodos }}>
                <TestComponent />
            </TodoProvider>
        );

        expect(screen.getByTestId('todos')).toHaveTextContent(JSON.stringify(customTodos));
    });
});
