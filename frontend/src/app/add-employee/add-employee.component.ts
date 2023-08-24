import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private crudService: CrudService
  ) {}

  currentCompanyID = localStorage.getItem('compId')!;
  name: string = '';
  email: string = '';
  phone: string = '';

  register() {
    this.crudService
      .createEmployee(this.name, this.email, this.phone, this.currentCompanyID)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Employee registered successfully');
        this.router.navigate(['/home']);
      });
  }
}
