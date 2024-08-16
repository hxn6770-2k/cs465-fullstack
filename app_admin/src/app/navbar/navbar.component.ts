import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], // Ensure CommonModule is imported here
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Ensure correct property name "styleUrls"
})
export class NavbarComponent {
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() { }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public onLogout(): void {
    this.authenticationService.logout();
  }
}
