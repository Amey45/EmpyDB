import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private webReqService: WebRequestService) {}

  updateCompany(
    id: string,
    Company_Name: string,
    location: string,
    password: string
  ) {
    return this.webReqService.patch(`company/update/${id}`, {
      Company_Name,
      location,
      password,
    });
  }

  deleteCompany(id: string) {
    return this.webReqService.delete(`company/delete/${id}`);
  }

  getTasks(compId: string) {
    return this.webReqService.get(`company/${compId}/employee`);
  }

  createEmployee(name: string, email: string, phone: string, compId: string) {
    return this.webReqService.post(`company/${compId}/employee`, {
      name,
      email,
      phone,
    });
  }

  updateEmployee(
    name: string,
    email: string,
    phone: string,
    compId: string,
    empId: string
  ) {
    return this.webReqService.patch(
      `company/${compId}/employee/update/${empId}`,
      {
        name,
        email,
        phone,
      }
    );
  }

  deleteEmployee(compId: string, empId: string) {
    return this.webReqService.delete(
      `company/${compId}/employee/delete/${empId}`
    );
  }
}
