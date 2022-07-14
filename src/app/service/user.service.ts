import { Page } from './../interface/page';
import { ApiResponse } from './../interface/api-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly serverUrl: string = 'http://localhost:8085';

  constructor(private httpClient: HttpClient) {}

  /**
   * * Make call to the back end API
   */
  getUsers(
    name: string = '',
    page: number = 0,
    size: number = 10
  ): Observable<ApiResponse<Page>> {
    return this.httpClient.get<any>(
      `${this.serverUrl}/users?name=${name}&page=${page}&size=${size}`
    );
  }
}
