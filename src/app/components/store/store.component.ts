import { Component } from '@angular/core';
import { GraphicsComponent } from './components/graphics/graphics.component';
import { CommonModule } from '@angular/common';
import { CardInfoComponent } from './components/card-info/card-info.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, GraphicsComponent, CardInfoComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {

}
