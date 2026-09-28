import type { TodoItemType } from "../types/TodoItemTypes";

interface TodoItemProps {
  onToggleComplete: (id: string) => void;
  todoItem: TodoItemType;
}

// ✅ GOOD: small, single-responsibility presentational component with clearly typed props (no `any`) — easy to render and assert on in isolation with React Testing Library.
const TodoItem = ({ onToggleComplete, todoItem }: TodoItemProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid grey",
        padding: 8,
        borderRadius: 4
      }}
    >
      <div style={{ textDecoration: todoItem.completed ? "line-through" : "" }}>{todoItem.itemDesc}</div>
      <div>
        {/* 🔧 IMPROVE [Med]: A "Done/Undo" button is keyboard-usable, but the spec calls for checkbox semantics for toggle, and a real checkbox exposes its checked state to assistive tech for free. Consider <input type="checkbox" checked={todoItem.completed} onChange={() => onToggleComplete(todoItem.id)} aria-label={`Mark "${todoItem.itemDesc}" complete`} />. */}
        <button onClick={() => {
          onToggleComplete(todoItem.id)
        }}>{todoItem.completed ? "Undo" : "Done"}</button>
        {/* 🔧 IMPROVE [High]: No delete control here — "delete a todo" was a core requirement and there is no button/handler for it anywhere in the app (needs an onDelete prop passed down + a Delete <button>). */}
      </div>
    </div>
  );
};

export default TodoItem;
