import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { combineLatest, Subject, takeUntil } from 'rxjs';

import { DataSource } from '@lib/components/table/interfaces';
import { TableComponent } from '@lib/components/table/table.component';
import { Metadata, Pagination } from '@lib/constants';
import { ClassesService } from '@lib/services/classes/classes.service';
import { SchoolsService } from '@lib/services/schools/schools.service';
import { AppTheme, ThemeService } from '@lib/services/theme';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, TableComponent, HttpClientModule],
  providers: [SchoolsService, ClassesService, ThemeService],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  currentTheme!: AppTheme | null;

  private readonly _themeService = inject(ThemeService);
  private readonly _schoolsService = inject(SchoolsService);
  private readonly _classesService = inject(ClassesService);

  schools: DataSource[] = [];
  classes: DataSource[] = [];

  schoolsPagination: Pagination = {
    page: 1,
    perPage: 10,
  };
  classesPagination: Pagination = {
    page: 1,
    perPage: 10,
  };

  schoolsMetadata: Metadata = {
    next: null,
    prev: null,
    total: 0,
  };
  classesMetadata: Metadata = {
    next: null,
    prev: null,
    total: 0,
  };

  private readonly _destroy$ = new Subject();

  ngOnInit(): void {
    this._themeService.currentTheme$.pipe(takeUntil(this._destroy$)).subscribe((theme) => (this.currentTheme = theme));

    this.getAllData();
  }

  ngOnDestroy(): void {
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  handleThemeChange(theme: AppTheme): void {
    this._themeService.setTheme(theme);
  }

  getAllData(): void {
    combineLatest([
      this._schoolsService.getSchools(this.schoolsPagination),
      this._classesService.getClasses(this.classesPagination),
    ]).subscribe(([schools, classes]) => {
      this.schools = schools.data;
      this.classes = classes.data;
      this.schoolsMetadata = {
        total: schools.items,
        prev: schools.prev,
        next: schools.next,
      };
      this.classesMetadata = {
        total: classes.items,
        prev: classes.prev,
        next: classes.next,
      };
    });
  }

  getSchools(): void {
    this._schoolsService.getSchools(this.schoolsPagination).subscribe((schools) => {
      this.classes = schools.data;
      this.classesMetadata = {
        total: schools.items,
        prev: schools.prev,
        next: schools.next,
      };
    });
  }

  getClasses(): void {
    this._classesService.getClasses(this.classesPagination).subscribe((classes) => {
      this.classes = classes.data;
      this.classesMetadata = {
        total: classes.items,
        prev: classes.prev,
        next: classes.next,
      };
    });
  }
}
