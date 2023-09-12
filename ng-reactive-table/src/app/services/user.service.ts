import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userUrl, apiBaseUrl } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RequestBodyUser, User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(apiBaseUrl + userUrl);
  }

  postUser(user: RequestBodyUser): Observable<User> {
    return this.http.post<User>(apiBaseUrl + userUrl, user);
  }

  deleteUser(userId: number): Observable<{}> {
    return this.http.delete(apiBaseUrl + userUrl + '/' + userId);
  }

  patchUser(user: Partial<User>): Observable<User> {
    return this.http.patch<User>(apiBaseUrl + userUrl + '/' + user.id, user);
  }

  putUser(user: Partial<User>): Observable<Partial<User>> {
    return this.http.put<Partial<User>>(
      apiBaseUrl + userUrl + '/' + user.id,
      user
    );
  }
}
