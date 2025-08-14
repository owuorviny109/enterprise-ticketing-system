import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class PublicLayoutComponent { }

