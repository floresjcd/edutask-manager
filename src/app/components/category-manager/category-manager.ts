import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/task.model';

@Component({
  selector: 'app-category-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-manager.html',
  styleUrls: ['./category-manager.css']
})
export class CategoryManagerComponent {
  @Input() categories: Category[] = [];
  @Output() categorySaved = new EventEmitter<Category>();
  @Output() categoryDeleted = new EventEmitter<string>();

  newCategoryName = '';
  newCategoryColor = '#2196f3';
  editingCategory: Category | null = null;

  onSave() {
    if (!this.newCategoryName.trim()) return;

    const category: Category = {
      id: this.editingCategory ? this.editingCategory.id : '',
      name: this.newCategoryName,
      color: this.newCategoryColor
    };

    this.categorySaved.emit(category);
    this.resetForm();
  }

  onEdit(category: Category) {
    this.editingCategory = { ...category };
    this.newCategoryName = category.name;
    this.newCategoryColor = category.color;
  }

  onDelete(id: string) {
    if (confirm('Deseja excluir esta categoria? Isso não removerá as tarefas vinculadas, mas elas ficarão sem categoria.')) {
      this.categoryDeleted.emit(id);
    }
  }

  resetForm() {
    this.editingCategory = null;
    this.newCategoryName = '';
    this.newCategoryColor = '#2196f3';
  }
}
