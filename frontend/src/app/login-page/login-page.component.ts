import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebRequestService } from '../web-request.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  constructor(
    private router: Router,
    private webService: WebRequestService,
    private authService: AuthService
  ) {}

  Company_Name = '';
  password = '';

  onLoginButtonClicked() {
    this.authService.login(this.Company_Name, this.password).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }
}
