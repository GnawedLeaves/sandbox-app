import { useState } from "react"

interface SearchBarProps {
  onSearch: (searchTerm: string) => void
  onClear: () => void
}

// 🔧 IMPROVE [Med]: The component itself is now also named `SearchBarProps` (looks like the earlier interface rename accidentally renamed the component too, e.g. via find-and-replace). A `*Props` name should be reserved for the prop type — a component called `SearchBarProps` is confusing on import (`import SearchBarProps from "./SearchBar"`) and in JSX (`<SearchBarProps />` reads like a type, not a component). Rename the component back to `SearchBar`.
const SearchBarProps = ({ onSearch, onClear }: SearchBarProps) => {
  // ✅ GOOD: controlled input — value is driven from state and onChange keeps it in sync, so React (not the DOM) stays the source of truth for the field.
  const [searchTerm, setSearchTerm] = useState<string>("")


  return <div>
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      {/* 🔧 IMPROVE [Med]: No <label> or aria-label tied to this input — placeholder text is not an accessible label (it disappears once you start typing and isn't read by all screen readers as a label). Add <label htmlFor="search"> or aria-label="Search todos". */}
      <input type="text" value={searchTerm} placeholder="Type to search..." onChange={(e) => {
        setSearchTerm(e.target.value)
        if (e.target.value === "") {
          onClear()

        }
        else {
          onSearch(e.target.value)

        }
      }}
      />
      <div>
        {/* 🔧 IMPROVE [Low]: Commented-out dead code left in the render — delete it instead of leaving it commented out (source control already keeps the history). */}
        {/* <button onClick={() => {
          onSearch(searchTerm)
        }}>Search</button> */}
        <button onClick={() => {
          onClear()
        }}>Clear</button>
      </div>
    </div>
  </div>
}

export default SearchBarProps