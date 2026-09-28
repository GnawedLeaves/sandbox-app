// 🔧 IMPROVE [High]: No filter type exists anywhere in the app (the all/active/done filter itself is missing — see TodoList.tsx). Add: export type FilterStatus = "all" | "active" | "done";
export interface TodoItemType {
  id: string;
  itemDesc: string;
  completed: boolean;
  // 🔧 IMPROVE [Low]: dateCreated/dateCompleted are declared but never set or read anywhere in the app — either wire them up when adding/toggling a todo, or drop them until needed.
  dateCreated?: string;
  dateCompleted?: string;
}
