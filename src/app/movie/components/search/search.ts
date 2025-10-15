import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  query = '';

  @Output() search = new EventEmitter<string>();

  onSearch($event: SubmitEvent) {
    $event?.preventDefault()
    this.search.emit(this.query)
  }

}
