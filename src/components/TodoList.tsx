import { useState } from "react";
import type { TodoItemType } from "../types/TodoItemTypes";
import SearchBar from "./SearchBar";
import TodoItem from "./TodoItem";
// 🔧 IMPROVE [Low]: Empty props interface with a commented-out field — dead code. Either delete the interface (and the `{ }` destructure below) or actually accept `itemsList` as a prop.
interface TodoListProps {
  // itemsList: TodoItemType[]
}
const TodoList = ({ }: TodoListProps) => {

  // this list would come from the controller
  // 🔧 IMPROVE [High]: Two separate state arrays holding the same data violate single source of truth, and they silently drift apart. Concretely: handleToggleComplete toggles whatever is in `itemsList` (which may already be search-filtered) and only calls setItemsList — it never updates `originalItemsList`. So toggle a todo while a search filter is active, then hit Clear, and the toggle is lost (Clear restores the stale `originalItemsList`, not the mutated list). Fix: keep one array of todos in state, keep a separate `filter`/`searchTerm` piece of state, and compute the visible list with useMemo/derived-at-render, e.g. `const visible = todos.filter(...)`.
  const [originalItemsList, setOriginalItemsList] = useState<TodoItemType[]>([
    { id: "1", itemDesc: "item 1", completed: false },
    { id: "2", itemDesc: "item 2", completed: true },
    { id: "3", itemDesc: "item 3", completed: false },
    { id: "4", itemDesc: "item 4", completed: false },
  ]);

  // 🔧 IMPROVE [Low]: Identical literal array duplicated from originalItemsList above — if the seed data ever changes it now has to be edited in two places and will eventually disagree.
  const [itemsList, setItemsList] = useState<TodoItemType[]>([
    { id: "1", itemDesc: "item 1", completed: false },
    { id: "2", itemDesc: "item 2", completed: true },
    { id: "3", itemDesc: "item 3", completed: false },
    { id: "4", itemDesc: "item 4", completed: false },
  ]);
  // 🔧 IMPROVE [High]: There is no "add a todo" feature anywhere in this file — no input/form, no state field for new-todo text, and no handler that pushes a new TodoItemType into state. This was one of the four core requirements and it's entirely missing.
  // 🔧 IMPROVE [High]: There is no "delete a todo" feature anywhere in this file — no handler that removes an item by id (e.g. setItemsList(prev => prev.filter(i => i.id !== id))), and TodoItem/TodoList never render a delete control. Also a core requirement, also entirely missing.
  // ✅ GOOD: toggling is done immutably — map + object spread produces new item/array references instead of mutating todoItem.completed in place, which is exactly what React needs to detect the change.
  const handleToggleComplete = (id: string) => {
    const toggledItems = itemsList.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed }
      }
      else return { ...item }
    })
    setItemsList(toggledItems)
  };
  // 🔧 IMPROVE [High]: This filters `itemsList` — which may already be a previously-narrowed search result — instead of `originalItemsList`. Typing "ab" then backspacing to "a" re-filters the already-narrowed list, so items that matched "a" but not "ab" never come back until Clear is pressed. Filter from the untouched source list instead: `originalItemsList.filter(item => item.itemDesc.includes(searchTerm))`.
  const handleOnSearch = (searchTerm: string) => {
    const filtered = itemsList.filter((item) => item.itemDesc.includes(searchTerm))
    setItemsList(filtered)
  };
  const handleOnClear = () => {
    setItemsList(originalItemsList)
  }


  return (
    <div style={{ border: "1px solid grey", padding: "1rem" }}>
      {/* 🔧 IMPROVE [Low]: Bare text, not a heading element — screen reader users navigating by headings won't find this. Use <h1>/<h2>Todo List</h2>. */}
      Todo List
      <div>
        {/* 🔧 IMPROVE [High]: This is the app's only filter-like control, and it's a text search box, not the all/active/done filter the assignment asked for — that requirement has no implementation at all (no filter state, no All/Active/Done buttons). */}
        <SearchBar onSearch={handleOnSearch} onClear={handleOnClear} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 20 }}>
        {itemsList.map((item) => {
          return (
            // 🔧 IMPROVE [High]: No `key` prop passed to TodoItem in this .map() — React will warn and fall back to index-based reconciliation, which can misassociate state/DOM across re-renders when the list is reordered or filtered. Add key={item.id}.
            <TodoItem todoItem={item} onToggleComplete={handleToggleComplete} />
          );
        })}
        {/* ✅ GOOD: explicit empty-state message instead of silently rendering nothing. */}
        {itemsList.length === 0 && "No items found."}
      </div>
    </div>
  );
};

export default TodoList;
