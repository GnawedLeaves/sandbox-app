import './App.css'
import TodoList from './components/TodoList'

// ✅ GOOD: App stays a thin composition root with no state/logic of its own — easy to reason about and to swap TodoList's data source later.
function App() {

  //ideally we would handle the fetching logic in a controller

  return (
    <div style={{ marginTop: "5rem", padding: "0 1rem" }}>
      <TodoList />
    </div>
  )
}

export default App
