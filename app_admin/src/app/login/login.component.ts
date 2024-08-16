import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Variables to hold form data and error messages
  public formError: string = '';
  public submitted = false;
  public credentials = {
    name: '',
    email: '',
    password: ''
  };

  // Injecting Router and AuthenticationService into the component
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  // Initialization logic (if any) goes here
  ngOnInit(): void {
  }

  // Method triggered when the form is submitted
  public onLoginSubmit(): void {
    this.formError = '';

    // Check if all required fields are filled
    if (!this.credentials.email || !this.credentials.password || !this.credentials.name) {
      this.formError = 'All fields are required, please try again';
      this.router.navigateByUrl('#'); // Return to login page (no actual navigation here)
    } else {
      this.doLogin(); // Proceed to login
    }
  }

  // Method to perform the login operation
  private doLogin(): void {
    // Create a new User object with the credentials provided
    const newUser = {
      name: this.credentials.name,
      email: this.credentials.email
    } as User;

    // Call the authentication service to log in the user
    this.authenticationService.login(newUser, this.credentials.password);

    // Check if the user is logged in and navigate accordingly
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['']); // Redirect to home page
    } else {
      setTimeout(() => {
        if (this.authenticationService.isLoggedIn()) {
          this.router.navigate(['']); // Redirect to home page after delay
        }
      }, 3000); // Wait 3 seconds before rechecking login status
    }
  }
}
