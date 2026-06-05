export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  categoryId: string;
  userId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}
