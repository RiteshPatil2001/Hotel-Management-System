import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftsidebarComponent } from "./components/leftsidebar/leftsidebar.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeftsidebarComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
