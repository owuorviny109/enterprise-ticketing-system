import { Component } from '@angular/core';

@Component({
  selector: 'app-notes',
  standalone: true,
  template: `
    <div class="notes-container">
      <h2>Notes</h2>
      <p>Notes management will be implemented here.</p>
    </div>
  `,
  styles: [`
    .notes-container {
      padding: 2rem;
    }
  `]
})
export class NotesComponent {}