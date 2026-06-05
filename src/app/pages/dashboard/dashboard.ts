import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { Task, Category } from '../../models/task.model';
import { TaskFormComponent } from '../../components/task-form/task-form';
import { TaskListComponent } from '../../components/task-list/task-list';
import { CategoryManagerComponent } from '../../components/category-manager/category-manager';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskListComponent, CategoryManagerComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  userName = '';
  tasks: Task[] = [];
  categories: Category[] = [];
  selectedTask: Task | null = null;

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.userName = this.authService.currentUser()?.name || '';
    this.loadData();
  }

  loadData() {
    this.tasks = this.dataService.getTasks();
    this.categories = this.dataService.getCategories();
  }

  onTaskSaved(task: Task) {
    if (task.id) {
      this.dataService.updateTask(task);
    } else {
      this.dataService.addTask(task);
    }
    this.selectedTask = null;
    this.loadData();
  }

  onTaskEdit(task: Task) {
    this.selectedTask = { ...task };
  }

  onCancelEdit() {
    this.selectedTask = null;
  }

  onTaskToggle(task: Task) {
    task.completed = !task.completed;
    this.dataService.updateTask(task);
    this.loadData();
  }

  onTaskDelete(id: string) {
    if (confirm('Deseja realmente excluir esta tarefa?')) {
      this.dataService.deleteTask(id);
      this.loadData();
    }
  }

  onCategorySaved(category: Category) {
    if (category.id) {
      this.dataService.updateCategory(category);
    } else {
      this.dataService.addCategory(category);
    }
    this.loadData();
  }

  onCategoryDeleted(id: string) {
    this.dataService.deleteCategory(id);
    this.loadData();
  }

  logout() {
    this.authService.logout();
  }
}
