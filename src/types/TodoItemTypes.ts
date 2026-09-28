export interface TodoItemType {
  id: number;
  itemDesc: string;
  completed: boolean;
  // 🔧 IMPROVE [Low]: dateCreated/dateCompleted are declared but never set or read anywhere in the app — either wire them up when adding/toggling a todo, or drop them until needed.
  dateCreated?: string;
  dateCompleted?: string;
}
