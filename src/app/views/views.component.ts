import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../common/header/header.component';

@Component({
  selector: 'app-views',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent],
  templateUrl: './views.component.html',
  styleUrl: './views.component.scss'
})

export class ViewsComponent {

}
