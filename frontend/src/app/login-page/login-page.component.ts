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

  onLoginButtonClicked(Company_Name: string, password: string) {
    this.authService
      .login(Company_Name, password)
      .subscribe((res: HttpResponse<any>) => {
        this.router.navigate(['/lists']);
        console.log(res);
      });
  }
}
