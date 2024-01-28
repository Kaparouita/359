import { Component } from '@angular/core';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-owner-review',
  templateUrl: './owner-review.component.html',
  styleUrl: './owner-review.component.css'
})
export class OwnerReviewComponent {
  text: string = '<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';
}
