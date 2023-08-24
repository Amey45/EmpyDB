import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { CrudService } from './../crud.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  EmployeeArray: any[] = [];
  currentEmployeeID = '';
  currentCompanyID = localStorage.getItem('compId');
  currentCompanyName = localStorage.getItem('company-name');
  name: string = '';
  email: string = '';
  phone: string = '';

  constructor(
    private crudService: CrudService,
    private router: Router,
    private authService: AuthService
  ) {
    this.getAllEmployee()!;
  }

  addEmployeeButtonClicked() {
    this.router.navigate(['/add-employee']);
  }

  setUpdate(data: any) {
    this.currentEmployeeID = data._id;
    this.editButtonClicked();
  }
  editButtonClicked() {
    this.router.navigate([`/update-employee/${this.currentEmployeeID}`]);
  }

  onLogoutButtonClicked() {
    this.authService.logout();
  }

  getAllEmployee() {
    this.crudService
      .getAllEmployee(this.currentCompanyID!)
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.EmployeeArray = resultData.result;
      });
  }

  setDelete(data: any) {
    this.crudService
      .deleteEmployee(this.currentCompanyID!, data._id)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Employee deleted successfully');
        this.getAllEmployee();
      });
  }

  UpdateRecords() {
    let bodyData = {
      name: this.name,
      email: this.email,
      phone: this.phone,
    };
    this.crudService
      .updateEmployee(
        this.currentCompanyID!,
        this.currentEmployeeID,
        bodyData.name,
        bodyData.email,
        bodyData.phone
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Employee updated successfully');
        this.getAllEmployee();
        this.name = '';
        this.email = '';
        this.phone = '';
      });
  }

  // save() {
  //   if (this.currentEmployeeID == '') {
  //     this.register();
  //   } else {
  //     this.UpdateRecords();
  //   }
  // }
}
