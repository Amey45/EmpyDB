import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onRegisterButtonClicked(
    Company_Name: string,
    location: string,
    password: string
  ) {
    // return this.authService
    //   .signup(Company_Name, location, password)
    //   .subscribe((res: HttpResponse<any>) => {
    //     this.router.navigate(['/login']);
    //     console.log(res);
    //   });
    console.log('first sitd'); 
    this.authService.signup(Company_Name, location, password).subscribe(
      (res) => {
        console.log('snidjcnkw', res);
        // this.router.navigate(['http://localhost:8000/login']);
        console.log(res);
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }
}
