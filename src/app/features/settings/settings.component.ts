import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  template: `
    <div class="settings-container">
      <h2>Settings</h2>
      <p>Application settings will be implemented here.</p>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 2rem;
    }
  `]
})
export class SettingsComponent {}