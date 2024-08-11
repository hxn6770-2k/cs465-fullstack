import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something went wrong; couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    console.log('EditTripComponent::ngOnInit');
    console.log('tripCode:', tripCode);

    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.tripDataService.getTrip(tripCode)
      .subscribe({
        next: (value: Trip) => {
          console.log('API Response:', value);

          // Convert API date to a string in 'YYYY-MM-DD' format
          const formattedDate = this.formatDateForInput(new Date(value.start));
          console.log('Formatted Date for Input:', formattedDate);

          // Patch the form with the formatted date string
          this.editForm.patchValue({
            ...value,
            start: formattedDate
          });

          this.message = 'Trip: ' + tripCode + ' retrieved';
          console.log(this.message);
        },
        error: (error: any) => {
          console.error('Error fetching trip:', error);
          this.message = 'Failed to retrieve trip';
        }
      });
  }

  private formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`; // Format for HTML date input
  }

  private parseDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Convert to Date object
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.editForm.valid) {
      // Convert date string from YYYY-MM-DD to ISO format for submission
      const formValue = this.editForm.value;
      const formattedDate = this.parseDate(formValue.start);
      formValue.start = formattedDate.toISOString(); // Convert to ISO format

      this.tripDataService.updateTrip(formValue)
        .subscribe({
          next: (value: any) => {
            console.log('Update successful:', value);
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.error('Error updating trip:', error);
          }
        });
    }
  }

  get f() { return this.editForm.controls; }
}
