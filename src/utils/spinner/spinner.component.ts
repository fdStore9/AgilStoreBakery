import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

}
