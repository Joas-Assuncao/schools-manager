import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Metadata } from '@lib/constants';
import { DataSource } from './interfaces';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
})
export class TableComponent {
  @Input() dataSource: DataSource[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() title = '';
  @Input() pagination = {
    page: 1,
    perPage: 10,
  };
  @Input() metadata!: Metadata;

  @Output() getAllData = new EventEmitter();

  onNextPage(): void {
    this.pagination.page = this.metadata.next || this.pagination.page;
    this.getAllData.emit();
  }

  onPrevPage(): void {
    this.pagination.page = this.metadata.prev || this.pagination.page;
    this.getAllData.emit();
  }
}
