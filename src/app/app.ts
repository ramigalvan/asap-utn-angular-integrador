import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TopNav } from './movie/components/top-nav/top-nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, TopNav ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('asap-utn-angular-integrador');

}
