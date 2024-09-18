import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent implements OnInit {
  formLogin: FormGroup;
  @Input() ListForms: Array<any>;
  @Output() formsValue = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.formLogin = this.fb.group({});
    this.ListForms.forEach(input => {
      this.formLogin.addControl(input.name, this.fb.control('', input.validation));
    });
  }
  onSubmit() {
    if (this.formLogin.valid) {
      this.formsValue.emit(this.formLogin.controls);
    }
  }
}
