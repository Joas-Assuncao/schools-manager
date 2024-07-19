import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassesService } from '@lib/services/classes/classes.service';
import { SchoolsService } from '@lib/services/schools/schools.service';
import { DataSource } from '../table/interfaces';

@Component({
  selector: 'app-form-class',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [SchoolsService, ClassesService],
  templateUrl: './form-class.component.html',
})
export class FormClassComponent {
  private readonly _schoolsService = inject(SchoolsService);
  private readonly _classesService = inject(ClassesService);
  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);

  schools: DataSource[] = [];

  myForm: FormGroup<{
    name: FormControl<string | null>;
    schoolId: FormControl<string | null>;
  }>;
  isLoading = false;

  constructor() {
    this.myForm = this._fb.group({
      name: '',
      schoolId: '',
    });
    this.getSchools();
  }

  getSchools(): void {
    this._schoolsService.get().subscribe((schools) => {
      this.schools = schools.data;
    });
  }

  handleSubmit(event: SubmitEvent): void {
    event.preventDefault();

    this.isLoading = true;

    event.preventDefault();

    const formData = this.myForm.value;

    if (!formData.name || !formData.schoolId) {
      return;
    }

    this._classesService.create({ name: formData.name, schoolId: formData.schoolId }).subscribe(() => {
      this.myForm.reset();
      this._router.navigate(['/']);
      this.isLoading = false;
    });
  }
}
