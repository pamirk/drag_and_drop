"use client";
import styles from './page.module.css'
import {useState} from "react";
import Image from "next/image";

interface Todo {
    id: number;
    text: string;
}

export default function Home() {
    const [todos, setTodos] = useState<Todo[]>([
        {id: 1, text: 'Learn React'},
        {id: 2, text: 'Learn Python'},
        {id: 3, text: 'Learn Flask'}
    ]);
    const [inputValue, setInputValue] = useState<string>('');

    const appendTodo = (todo: string) => {
        const newTodo: Todo = {
            id: Date.now(),
            text: todo,
        };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };

    const destroyTodo = (id: number) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputValue.trim() === '') return;
        appendTodo(inputValue);
        setInputValue('');
    };

    const handleDragStart = (event: React.DragEvent<HTMLLIElement>, todoIndex: number) => {
        event.dataTransfer.setData('text/plain', String(todoIndex));
        event.dataTransfer.effectAllowed = 'move';
    };

    const handleDrop = (event: React.DragEvent<HTMLImageElement>) => {
        event.preventDefault();
        event.currentTarget.classList.remove(styles.shake);
        const todoIndex = Number(event.dataTransfer.getData('text/plain'));
        destroyTodo(todoIndex);
    };

    const handleDragEnter = (event: React.DragEvent<HTMLImageElement>) => {
        event.currentTarget.classList.add(styles.shake);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLImageElement>) => {
        event.currentTarget.classList.remove(styles.shake);
    };
    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <p>Drag and drop to move items from todo list to dustbin</p>
            </div>
            <div>
                <div className={styles.center}>
                    <div className="row" style={{width: '100vw', textAlign: 'center'}}>
                        <div className="col-sm-4">
                            <form noValidate onSubmit={handleFormSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="What do you want to do?"
                                        className="form-control"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Add Todo"
                                    className="btn-primary btn-lg btn-block btn btn-default"
                                />
                            </form>
                        </div>
                        <div className="col-sm-4">
                            <ol className="list-group">
                                {todos.map((todo) => (
                                    <li
                                        key={todo.id}
                                        className="list-group-item"
                                        draggable={true}
                                        onDragStart={(event) => handleDragStart(event, todo.id)}
                                    >
                                        {todo.text}
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <div className="col-sm-4">
                            <Image
                                src="/trash.png"
                                onDragOver={(event) => event.preventDefault()}
                                onDrop={handleDrop}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                alt="Trash"
                                width={100}
                                height={100}
                            />
                        </div>
                    </div>


                </div>
            </div>
            <div className={styles.grid}>
                <a
                    href="https://pamirk.github.io/"
                    className={styles.card}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <p>Coded by</p>

                    <h2>PK <span>-&gt;</span></h2>
                </a>
            </div>
        </main>
    )
}
