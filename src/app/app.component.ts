import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputMaskDirective } from './directives/input-mask.directive';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, FormsModule, InputMaskDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Input Mask Demo';
  
  // Reactive Form
  maskForm: FormGroup;
  
  // Template-driven form model
  modelValue: string = 'example@email.com';
  
  constructor(private fb: FormBuilder) {
    this.maskForm = this.fb.group({
      email: ['user@example.com', [Validators.required, Validators.email]],
      phone: ['0987654321', Validators.required],
      creditCard: ['1234567890123456', Validators.required]
    });
  }

  onFormSubmit(): void {
    if (this.maskForm.valid) {
      console.log('Form Values:', this.maskForm.value);
      alert('Form submitted! Check console for values.');
    }
  }

  updateEmailProgrammatically(): void {
    this.maskForm.patchValue({
      email: 'newemail@domain.com'
    });
  }

  updateModelProgrammatically(): void {
    this.modelValue = 'updated@model.com';
  }
}
