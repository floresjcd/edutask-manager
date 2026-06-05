import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, Category } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() categories: Category[] = [];
  @Output() toggleTask = new EventEmitter<Task>();
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<string>();

  getCategoryName(id: string): string {
    return this.categories.find(c => c.id === id)?.name || 'Sem categoria';
  }

  getCategoryColor(id: string): string {
    return this.categories.find(c => c.id === id)?.color || '#999';
  }
}
