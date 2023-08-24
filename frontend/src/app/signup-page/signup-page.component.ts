import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  Company_Name = '';
  location = '';
  password = '';
  onRegisterButtonClicked() {
    this.authService
      .signup(this.Company_Name, this.location, this.password)
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log('Error', error);
        }
      );
  }
}
