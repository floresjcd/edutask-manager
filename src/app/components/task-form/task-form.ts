import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category, Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css']
})
export class TaskFormComponent {
  @Input() categories: Category[] = [];
  @Input() set taskToEdit(task: Task | null) {
    if (task) {
      this.isEditing = true;
      this.editingId = task.id;
      this.title = task.title;
      this.description = task.description;
      this.dueDate = task.dueDate;
      this.categoryId = task.categoryId;
      this.completed = task.completed;
    } else {
      this.resetForm();
    }
  }
  @Output() taskSaved = new EventEmitter<Task>();
  @Output() cancelEdit = new EventEmitter<void>();

  title = '';
  description = '';
  dueDate = '';
  categoryId = '';
  completed = false;
  isEditing = false;
  editingId = '';

  onSubmit() {
    const taskData: Task = {
      id: this.editingId,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      completed: this.completed,
      categoryId: this.categoryId,
      userId: ''
    };
    
    this.taskSaved.emit(taskData);
    this.resetForm();
  }

  onCancel() {
    this.resetForm();
    this.cancelEdit.emit();
  }

  private resetForm() {
    this.title = '';
    this.description = '';
    this.dueDate = '';
    this.categoryId = '';
    this.completed = false;
    this.isEditing = false;
    this.editingId = '';
  }
}
