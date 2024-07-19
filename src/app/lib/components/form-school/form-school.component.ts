import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolsService } from '@lib/services/schools/schools.service';

@Component({
  selector: 'app-form-school',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [SchoolsService],
  templateUrl: './form-school.component.html',
})
export class FormSchoolComponent {
  private readonly _schoolsService = inject(SchoolsService);
  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);

  myForm: FormGroup<{ name: FormControl<string | null> }>;
  isLoading = false;

  constructor() {
    this.myForm = this._fb.group({
      name: '',
    });
  }

  handleSubmit(event: SubmitEvent): void {
    this.isLoading = true;

    event.preventDefault();

    const formData = this.myForm.value;

    if (!formData.name) {
      return;
    }

    this._schoolsService.create({ name: formData.name }).subscribe(() => {
      this.myForm.reset();
      this._router.navigate(['/']);
      this.isLoading = false;
    });
  }
}
