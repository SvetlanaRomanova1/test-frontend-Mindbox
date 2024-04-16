import React, {createContext, useContext, useState} from 'react';

type Todo = {
    id: string;
    text: string;
    completed: boolean;
};

interface TodoContextType {
    todos: Todo[];
    addTodo: (todo: Todo) => void;
    removeTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
    clearCompleted: () => void;
    filter: Filter;
    setFilter: (filter: Filter) => void;
}

// Определение типа фильтра
type Filter = 'all' | 'active' | 'completed';

export const TodoContext = createContext<TodoContextType>({
    todos: [],
    addTodo: () => {
    },
    removeTodo: () => {
    },
    toggleTodo: () => {
    },
    clearCompleted: () => {
    },
    filter: 'all',
    setFilter: () => {
    }
});

export const TodoProvider: React.FC<{ children: React.ReactNode; value?: Partial<TodoContextType> }> = ({children, value}) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, updateFilter] = useState<Filter>('all');

    const addTodo = (todo: Todo) => {
        setTodos((prevTodos: Todo[]) => [...prevTodos, todo]);
    };

    const removeTodo = (id:string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleTodo = (id:string) => {
        setTodos(todos.map(todo =>
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        ));
    };
    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    };

    const setFilter = (newFilter: Filter) => {
        updateFilter(newFilter);
    };

    return (
        <TodoContext.Provider value={{
            todos: todos,
            addTodo: addTodo,
            removeTodo: removeTodo,
            toggleTodo: toggleTodo,
            clearCompleted: clearCompleted,
            filter: filter,
            setFilter: setFilter,
            ...value
        }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodoContext = () => useContext(TodoContext);
