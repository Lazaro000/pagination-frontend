import { UserService } from './service/user.service';
import { Page } from './interface/page';
import { ApiResponse } from './interface/api-response';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  startWith,
} from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  usersState:
    | Observable<{
        appState: string;
        appData?: ApiResponse<Page>;
        error?: HttpErrorResponse;
      }>
    | undefined = undefined;

  responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);

  title = 'pagination-frontend';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.usersState = this.userService.getUsers().pipe(
      map((response: ApiResponse<Page>) => {
        this.responseSubject.next(response);

        console.log(response);

        return {
          appState: 'APP_LOADED',
          appData: response,
        };
      }),
      startWith({ appState: 'APP_LOADING' }),
      catchError((error: HttpErrorResponse) =>
        of({ appState: 'APP_ERROR', error })
      )
    );
  }

  goToPage(name?: string, pageNumber?: number): void {
    this.usersState = this.userService.getUsers(name, pageNumber).pipe(
      map((response: ApiResponse<Page>) => {
        this.responseSubject.next(response);

        console.log(response);

        return {
          appState: 'APP_LOADED',
          appData: response,
        };
      }),
      startWith({
        appState: 'APP_LOADING',
        appData: this.responseSubject.value,
      }),
      catchError((error: HttpErrorResponse) =>
        of({ appState: 'APP_ERROR', error })
      )
    );
  }
}
