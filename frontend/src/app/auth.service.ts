import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private webService: WebRequestService,
    private router: Router
  ) {}

  login(Company_Name: string, password: string) {
    return this.webService.login(Company_Name, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(
          res.body.admin._id!,
          res.body.admin.Company_Name,
          res.body.token
        );
        console.log('Logged In!!!');
      })
    );
  }

  logout() {
    this.removeSession();
    this.router.navigate(['/login']);
  }

  signup(Company_Name: string, location: string, password: string) {
    return this.webService.signup(Company_Name, location, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        console.log('Company Registered Successfully', res);
      })
    );
  }

  private setSession(compId: string, Company_Name: string, authToken: string) {
    localStorage.setItem('compId', compId);
    localStorage.setItem('company-name', Company_Name);
    localStorage.setItem('authorization', authToken);
  }

  private removeSession() {
    localStorage.removeItem('compId');
    localStorage.removeItem('company-name');
    localStorage.removeItem('authorization');
  }
}
