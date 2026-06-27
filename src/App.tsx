import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const addOrUpdateTodo = () => {
    if (todo.trim() === "") return;

    if (editingId !== null) {
      setTodos(
        todos.map((item) =>
          item.id === editingId ? { ...item, text: todo } : item
        )
      );

      setEditingId(null);
    } else {
      const newTodo: Todo = {
        id: Date.now(),
        text: todo,
        completed: false,
      };

      setTodos([...todos, newTodo]);
    }

    setTodo("");
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const editTodo = (item: Todo) => {
    setTodo(item.text);
    setEditingId(item.id);
  };

  const deleteTodo = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );

    if (confirmDelete) {
      setTodos(todos.filter((item) => item.id !== id));
    }
  };

  return (
    <div
      style={{
        width: "500px",
        margin: "40px auto",
        fontFamily: "Arial",
      }}
    >
      <h1>Todo List</h1>

      <input
        type="text"
        placeholder="Enter todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addOrUpdateTodo();
          }
        }}
      />

      <button onClick={addOrUpdateTodo}>
        {editingId ? "Update" : "Add"}
      </button>

      <hr />

      {todos.length === 0 ? (
        <p>No todos yet.</p>
      ) : (
        <table width="100%" cellPadding={10}>
          <thead>
            <tr>
              <th>Done</th>
              <th>Task</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {todos.map((item) => (
              <tr key={item.id}>
                <td align="center">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleComplete(item.id)}
                  />
                </td>

                <td
                  style={{
                    textDecoration: item.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {item.text}
                </td>

                <td>
                  <button onClick={() => editTodo(item)}>
                    Update
                  </button>

                  <button
                    style={{ marginLeft: 10 }}
                    onClick={() => deleteTodo(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;