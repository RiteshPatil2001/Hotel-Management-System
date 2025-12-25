import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink, Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-leftsidebar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, CommonModule],
  templateUrl: './leftsidebar.component.html',
  styleUrl: './leftsidebar.component.scss'
})
export class LeftsidebarComponent {
  isCollapsed = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isCollapsed = true;
      }
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
