import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  template: `
    <div class="customer-list-container">
      <h2>Customer Management</h2>
      <p>Customer list and management will be implemented here.</p>
    </div>
  `,
  styles: [`
    .customer-list-container {
      padding: 2rem;
    }
  `]
})
export class CustomerListComponent { }