import { Injectable } from '@angular/core';
import { Task, Category } from '../models/task.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly TASKS_KEY = 'edutask_tasks';
  private readonly CATEGORIES_KEY = 'edutask_categories';

  constructor(private authService: AuthService) {
    this.initDefaultCategories();
  }

  private initDefaultCategories() {
    if (this.getCategories().length === 0) {
      const defaults: Category[] = [
        { id: '1', name: 'Trabalho', color: '#f44336' },
        { id: '2', name: 'Estudo', color: '#2196f3' },
        { id: '3', name: 'Pessoal', color: '#4caf50' }
      ];
      localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(defaults));
    }
  }

  // Categories CRUD
  getCategories(): Category[] {
    const data = localStorage.getItem(this.CATEGORIES_KEY);
    return data ? JSON.parse(data) : [];
  }

  addCategory(category: Category) {
    const data = this.getCategories();
    category.id = Date.now().toString();
    data.push(category);
    localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(data));
  }

  updateCategory(updatedCategory: Category) {
    const data = this.getCategories();
    const index = data.findIndex(c => c.id === updatedCategory.id);
    if (index !== -1) {
      data[index] = updatedCategory;
      localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(data));
    }
  }

  deleteCategory(id: string) {
    const data = this.getCategories();
    const filtered = data.filter(c => c.id !== id);
    localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(filtered));
  }

  // Tasks CRUD
  getTasks(): Task[] {
    const userId = this.authService.currentUser()?.id;
    if (!userId) return [];
    const data = localStorage.getItem(this.TASKS_KEY);
    const allTasks: Task[] = data ? JSON.parse(data) : [];
    return allTasks.filter(t => t.userId === userId);
  }

  addTask(task: Task) {
    const userId = this.authService.currentUser()?.id;
    if (!userId) return;
    
    const data = localStorage.getItem(this.TASKS_KEY);
    const allTasks: Task[] = data ? JSON.parse(data) : [];
    
    task.id = Date.now().toString();
    task.userId = userId;
    allTasks.push(task);
    localStorage.setItem(this.TASKS_KEY, JSON.stringify(allTasks));
  }

  updateTask(updatedTask: Task) {
    const userId = this.authService.currentUser()?.id;
    if (!userId) return;

    const data = localStorage.getItem(this.TASKS_KEY);
    let allTasks: Task[] = data ? JSON.parse(data) : [];
    
    // Garantir que o userId seja preservado na atualização
    updatedTask.userId = userId;
    
    allTasks = allTasks.map(t => t.id === updatedTask.id ? updatedTask : t);
    localStorage.setItem(this.TASKS_KEY, JSON.stringify(allTasks));
  }

  deleteTask(id: string) {
    const data = localStorage.getItem(this.TASKS_KEY);
    let allTasks: Task[] = data ? JSON.parse(data) : [];
    allTasks = allTasks.filter(t => t.id !== id);
    localStorage.setItem(this.TASKS_KEY, JSON.stringify(allTasks));
  }
}
