import './App.css'
import DebouncedSearchBar from './components/DebouncedSearchBar'
import TodoList from './components/TodoList'

// ✅ GOOD: App stays a thin composition root with no state/logic of its own — easy to reason about and to swap TodoList's data source later.
function App() {

  //ideally we would handle the fetching logic in a controller

  return (
    <div style={{ marginTop: "5rem", padding: "0 1rem", display: "flex", flexDirection: "column", gap: "4rem" }}>
      <DebouncedSearchBar />
      <TodoList />
    </div>
  )
}

export default App
