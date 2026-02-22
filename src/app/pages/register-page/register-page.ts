import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrls: ['./register-page.css']
})
export class RegisterPage {
  provincesAndTerritories = [
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
    'Newfoundland and Labrador', 'Nova Scotia', 'Ontario',
    'Prince Edward Island', 'Quebec', 'Saskatchewan',
    'Northwest Territories', 'Nunavut', 'Yukon'
  ];

  countries = ['Canada', 'United States'];

  private nameRegex = /^[A-Za-z ]+$/;
  private phoneRegex = /^\d{10}$/;
  private streetRegex = /^[A-Za-z0-9 ]+$/;

  form: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.pattern(this.nameRegex)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(this.phoneRegex)]],
      dob: ['', [Validators.required]],
      street: ['', [Validators.required, Validators.pattern(this.streetRegex)]],
      province: ['', [Validators.required]],
      country: ['United States', [Validators.required, this.mustBeCanadaValidator]],
      terms: [false, [Validators.requiredTrue]],
    });
  }

  mustBeCanadaValidator(control: AbstractControl): ValidationErrors | null {
    const value = (control.value ?? '').toString().trim().toLowerCase();
    return value === 'canada' ? null : { mustBeCanada: true };
  }

  isInvalid(controlName: string): boolean {
    const c = this.form.get(controlName);
    return !!(c && c.touched && c.invalid);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.router.navigate(['/products']);
  }
}
