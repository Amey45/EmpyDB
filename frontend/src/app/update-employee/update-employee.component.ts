import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CrudService } from '../crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent {
  constructor(
    private http: HttpClient,
    private crudService: CrudService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  currentEmployeeID = '';
  currentCompanyID = localStorage.getItem('compId');
  currentCompanyName = localStorage.getItem('company-name');
  name: string = '';
  email: string = '';
  phone: string = '';

  UpdateRecords() {
    let bodyData = {
      name: this.name,
      email: this.email,
      phone: this.phone,
    };
    this.currentEmployeeID = this.route.snapshot.paramMap.get('empId')!;
    this.crudService
      .updateEmployee(
        bodyData.name,
        bodyData.email,
        bodyData.phone,
        this.currentCompanyID!,
        this.currentEmployeeID
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Employee updated successfully');
        this.router.navigate(['/home']);
      });
  }
}
