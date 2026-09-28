import { useMemo, useState } from "react";
import type { TodoItemType } from "../types/TodoItemTypes";
import SearchBarProps from "./SearchBar";
import TodoItem from "./TodoItem";

// 🔧 IMPROVE [Low]: Empty props interface with no fields — dead code. Delete it (and the `{ }` destructure below) unless this component is meant to accept props.
interface TodoListProps {

}
const TodoList = ({ }: TodoListProps) => {

  const [newTodo, setNewTodo] = useState<string>("")
  // ✅ GOOD: itemsList is now the single canonical source of truth — search no longer overwrites it (see visibleItemsList below). This resolves the earlier High-severity bug where toggling/deleting while a search filter was active silently lost data on Clear.
  const [itemsList, setItemsList] = useState<TodoItemType[]>([
    { id: 1, itemDesc: "item 1", completed: false },
    { id: 2, itemDesc: "item 2", completed: true },
    { id: 3, itemDesc: "item 3", completed: false },
    { id: 4, itemDesc: "item 4", completed: false },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>("")

  // ✅ GOOD: "add a todo" is now implemented, with an empty/whitespace-only guard and the input cleared after adding — both were explicit requirements.
  // 🔧 IMPROVE [High]: `itemsList[itemsList.length - 1].id` throws if itemsList is empty (e.g. delete every todo, then try to add one) — `itemsList[-1]` is undefined, so `.id` crashes the app. Don't derive the new id from the last element; use a monotonically increasing ref/counter, `crypto.randomUUID()`, or `Date.now()` instead.
  const handleAddTodo = (itemDesc: string) => {
    if (!itemDesc || itemDesc.trim() === "") return
    const latestId = itemsList[itemsList.length - 1].id + 1
    setItemsList((prev) => [...prev, {
      id: latestId,
      itemDesc: itemDesc,
      completed: false
    }])
    setNewTodo("")
  }

  // ✅ GOOD: toggling is done immutably — map + object spread produces new item/array references instead of mutating todoItem.completed in place, which is exactly what React needs to detect the change.
  const handleToggleComplete = (id: number) => {
    const toggledItems = itemsList.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed }
      }
      else return { ...item }
    })
    setItemsList(toggledItems)
  };

  // 🔧 IMPROVE [Low]: parameter `searchTerm` shadows the outer `searchTerm` state variable of the same name — works correctly here, but reads as if it might be reassigning state directly. A different parameter name (e.g. `term`) would be clearer.
  const handleOnSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm)

  };
  const handleOnClear = () => {
    setSearchTerm("")
  }

  // ✅ GOOD: delete is implemented and stays immutable (filter returns a new array rather than mutating itemsList).
  const handleOnDelete = (id: number) => {
    const filtered = itemsList.filter((item) => item.id !== id)
    setItemsList(filtered)
  }


  // ✅ GOOD: this is the derived-state fix from the previous review — the visible list is computed during render from the canonical itemsList + searchTerm via useMemo, instead of being stored as its own state. Clear, backspacing mid-search, and toggling/deleting while filtered all now behave correctly.
  const visibleItemsList = useMemo(() => {
    return itemsList.filter((item) => item.itemDesc.includes(searchTerm))
  }, [searchTerm, itemsList])

  return (
    <div style={{ border: "1px solid grey", padding: "1rem" }}>

      {/* 🔧 IMPROVE [Low]: Bare text, not a heading element — screen reader users navigating by headings won't find this. Use <h1>/<h2>Todo List</h2>. */}
      Todo List
      <div>
        <SearchBarProps onSearch={handleOnSearch} onClear={handleOnClear} />
      </div>
      <div>
        {/* 🔧 IMPROVE [High]: No <form onSubmit>/preventDefault wraps the add-todo input — pressing Enter does nothing, only clicking "Add" works. The spec explicitly asks for submit-on-Enter. Wrap input + button in <form onSubmit={(e) => { e.preventDefault(); handleAddTodo(newTodo) }}> and drop the button's own onClick. */}
        {/* 🔧 IMPROVE [Med]: No <label>/aria-label on this input either — same accessibility gap as the search input. */}
        <input type="text" placeholder="New item..." onChange={(e) => {
          setNewTodo(e.target.value)
        }} value={newTodo} />
        <button onClick={() => {
          handleAddTodo(newTodo)
        }}>Add</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 20 }}>
        {visibleItemsList.map((item) => {
          return (
            // ✅ GOOD: stable key={item.id} is now passed — this was flagged as missing/High in the previous review.
            <TodoItem key={item.id} todoItem={item} onToggleComplete={handleToggleComplete} onDelete={handleOnDelete} />
          );
        })}

        {visibleItemsList.length === 0 && "No items found."}
      </div>
    </div>
  );
};

export default TodoList;
