import { Component } from '@angular/core';

@Component({
  selector: 'app-organizations',
  standalone: true,
  template: `
    <div class="organizations-container">
      <h2>Organizations</h2>
      <p>Organization management will be implemented here.</p>
    </div>
  `,
  styles: [`
    .organizations-container {
      padding: 2rem;
    }
  `]
})
export class OrganizationsComponent {}