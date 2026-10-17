"use client";

import styles from "./page.module.css";
import { useTodoStore } from "@/store/todoStore";

export default function Home() {
  const { todos, input, setInput, addTodo, toggleTodo, removeTodo, clearCompleted } =
    useTodoStore();

  const remaining = todos.filter((todo) => !todo.completed).length;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo();
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.headerRow}>
          <div>
            <p className={styles.eyebrow}>To-do app</p>
            <h1>Zustand bilan vazifalar</h1>
          </div>
          <span className={styles.badge}>{remaining} qoldi</span>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Yangi vazifa kiriting..."
            aria-label="todo input"
          />
          <button type="submit">Qo&apos;shish</button>
        </form>

        <ul className={styles.list}>
          {todos.length === 0 ? (
            <li className={styles.empty}>Hozircha vazifa yo&apos;q.</li>
          ) : (
            todos.map((todo) => (
              <li key={todo.id} className={styles.item}>
                <label className={styles.taskLabel}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className={todo.completed ? styles.completed : ""}>{todo.text}</span>
                </label>
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => removeTodo(todo.id)}
                  aria-label={`Delete ${todo.text}`}
                >
                  O&apos;chirish
                </button>
              </li>
            ))
          )}
        </ul>

        <div className={styles.footerRow}>
          <span>{todos.length} ta umumiy</span>
          <button type="button" onClick={clearCompleted} className={styles.clearButton}>
            Bajarilganlarni tozalash
          </button>
        </div>
      </section>
    </main>
  );
}
