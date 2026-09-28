import type { TodoItemType } from "../types/TodoItemTypes";

interface TodoItemProps {
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  todoItem: TodoItemType;
}


// ✅ GOOD: small, single-responsibility presentational component with clearly typed props (no `any`) — easy to render and assert on in isolation with React Testing Library.
const TodoItem = ({ onToggleComplete, onDelete, todoItem }: TodoItemProps) => {
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
        {/* ✅ GOOD: real checkbox with `checked` bound to state — exactly the checkbox semantics the previous review asked for; a screen reader now announces checked/unchecked for free. */}
        {/* 🔧 IMPROVE [Med]: The checkbox has no accessible name (no <label>/aria-label), so a screen reader announces only "checkbox", not which todo it toggles. Add aria-label={`Mark "${todoItem.itemDesc}" ${todoItem.completed ? "incomplete" : "complete"}`}. */}
        <input type="checkbox" checked={todoItem.completed} onChange={() => {
          onToggleComplete(todoItem.id)
        }} />

        {/* ✅ GOOD: delete is now implemented — this was flagged as a missing core requirement in the previous pass. */}
        <button onClick={() => {
          onDelete(todoItem.id)
        }}>Delete</button>

      </div>
    </div>
  );
};

export default TodoItem;
