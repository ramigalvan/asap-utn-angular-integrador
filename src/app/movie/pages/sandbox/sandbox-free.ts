import { Component } from '@angular/core';
import { Search, SearchResult } from '../../components/search/search';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sandbox-free',
  standalone: true,
  imports: [CommonModule, Search],
  templateUrl: './sandbox-free.html',
  styleUrls: ['./sandbox-free.css']
})
export class SandboxFree {
onItemSelected(item: SearchResult) {
    console.log('Selected item:', item);
    // Handle the selected item here
  }
}
