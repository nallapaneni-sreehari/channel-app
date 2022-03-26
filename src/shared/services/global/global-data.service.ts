import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  constructor() { }

  public storedItem:any = localStorage.getItem('user');

  public user = JSON.parse(this.storedItem);

  public loginVerified = this.user?.loginVerified || false;

  public userToken = this.user?.userToken || '';

  public currentUser = this.user?.currentUser || '';

  public name = this.user?.name || '';


}
