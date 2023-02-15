import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  async getUserHeader(url: string): Promise<any> {
    
    return await this.http.get(url).toPromise()
      .then(
        res => { // Success
          return res ;
        }
      );
  }
  async getUsers(url: string): Promise<any> {
    
    return await this.http.get(url).toPromise()
      .then(
        res => { // Success
          return res ;
        }
      );
  }
}
