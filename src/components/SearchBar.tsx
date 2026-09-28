import { useState } from "react"

// 🔧 IMPROVE [Low]: Interface shares its name with the component (`SearchBar`) — TS allows it (types and values live in separate namespaces) but it's confusing to read/import and easy to typo. Rename to `SearchBarProps`.
interface SearchBar {
  onSearch: (searchTerm: string) => void
  onClear: () => void
}

// 🔧 IMPROVE [High]: The assignment asked for an all/active/done filter, not free-text search. There's no filter state or UI anywhere in this app — this component solves a different problem than the one that was assigned, so that requirement is effectively unmet.
const SearchBar = ({ onSearch, onClear }: SearchBar) => {
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
        {/* 🔧 IMPROVE [Low]: onSearch already fires on every keystroke in onChange above, so clicking this re-runs an identical search with no new input — a dead click. Either make searching button/Enter-triggered only (drop the live onChange call), or remove this button. */}
        <button onClick={() => {
          onSearch(searchTerm)
        }}>Search</button>
        <button onClick={() => {
          onClear()
        }}>Clear</button>
      </div>
    </div>
  </div>
}

export default SearchBar