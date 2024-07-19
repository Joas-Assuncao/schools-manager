import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';

import { FormSchoolComponent as FormComponent } from '@lib/components/form-school/form-school.component';
import { TableComponent } from '@lib/components/table/table.component';
import { ClassesService } from '@lib/services/classes/classes.service';
import { SchoolsService } from '@lib/services/schools/schools.service';
import { ThemeService } from '@lib/services/theme';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, TableComponent, HttpClientModule, FormComponent],
  providers: [SchoolsService, ClassesService, ThemeService],
  templateUrl: './form-school.component.html',
})
export class FormSchoolComponent implements OnDestroy {
  private readonly _destroy$ = new Subject();

  ngOnDestroy(): void {
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }
}
