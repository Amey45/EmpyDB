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
        this.setSession(res.body._id!, res.headers.get('authorization')!);
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
        console.log(
          'Company Registered Successfully',
          res,
          res.body,
          res.body.companyDoc,
          res.body.message
        );
      })
    );

    // return this.webService
    //   .signup(Company_Name, location, password)
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
  }

  private setSession(compId: string, authToken: string) {
    localStorage.setItem('compId', compId);
    localStorage.setItem('authorization', authToken);
  }

  private removeSession() {
    localStorage.removeItem('compId');
    localStorage.removeItem('authorization');
  }
}
