import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { Trip } from '../models/trip'; // Importing the Trip model
import { TripDataService } from '../services/trip-data.service'; // Importing the TripDataService
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service'; // Import AuthenticationService

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService] // Registering the TripDataService as a provider
})

export class TripListingComponent implements OnInit {

  trips!: Trip[]; // Use the Trip model for typing
  message: string = ''; // A message to show the status of the data retrieval

  // Injecting the TripDataService and AuthenticationService into the constructor
  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService // Add AuthenticationService
  ) {
    console.log('trip-listing constructor');
  }

  // Method to check if the user is logged in
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  // Method to fetch trip data from the service
  private getStuff(): void {
    this.tripDataService.getTrips().subscribe({
      next: (value: any) => { // Handling the data received from the service
        this.trips = value;
        if (value.length > 0) {
          this.message = 'There are ' + value.length + ' trips available.';
        } else {
          this.message = 'There were no trips retrieved from the database.';
        }
        console.log(this.message);
      },
      error: (error: any) => { // Handling any errors during the data retrieval
        console.log('Error: ' + error);
      }
    })
  }

  // ngOnInit lifecycle hook to initialize data fetching
  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff(); // Fetch trips when the component is initialized
  }
}
