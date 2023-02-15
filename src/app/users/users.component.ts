import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IHeaderColumn } from '../models/header-column';
import { User } from '../models/user.model';
// import { SearchFilterPipe } from '../Pipes/search-filter.pipe';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  public isEditing: boolean = false;
  public isAddMode: boolean = false;
  public userHeaders: IHeaderColumn[] = [];
  public isFilter: boolean = false;
  public users: User[] = [];
  public userHeaderUrl: string = '/app/configs/userHeader.json';
  public usersUrl: string = '/assets/data/user.json';
  public enableSave: boolean = false;
  constructor(private userService: UsersService, private modalService: NgbModal,
    //private searchFilterPipe:SearchFilterPipe
    ) {

  }

  ngOnInit() {
    this.LoadHeader();
    this.LoadUsers();
    this.enableSave = false;
  }

  modelChange(user: User) {
    if (user.userId != "" && user.email != "" && user.loginName != "" &&
      user.firstName != "" && user.lastName != "" && user.password != "") {
      this.enableSave = true;
    }
    // Fired when a change in the HTML element will change the model, *not* when the model changes from elsewhere 
  }

  async LoadHeader() {
    this.userHeaders = await this.userService.getUserHeader(this.userHeaderUrl);
  }
  async LoadUsers() {
    this.users = await this.userService.getUsers(this.usersUrl);
    localStorage.removeItem('users');
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  async filterOn(header: IHeaderColumn) {
    this.isFilter = header.filterable;
    //this.searchFilterPipe.transform(this.users,header,"10")
  }
  public editEnable(edit: boolean) {
    this.isEditing = edit;
    if (!edit) {
      let getval = localStorage.getItem('users');
      this.users = JSON.parse(JSON.parse(JSON.stringify(getval)));
      //this.LoadUsers();
    }
    // this.enableSave.emit(false);
  }

  async addUser() {
    this.isAddMode = true;

    this.users.push(new User())
  }
  async removeUser(user: User) {
    if (confirm("Are you sure you want to delete?")) {
      var indexof = this.users.indexOf(user)
    this.users.splice(indexof, 1);
    this.enableSave = true;
    }
  }

  async filterData(searchText: string, filterType: string) {

  }
  async saveForm() {
    //check the duplicate userId.
    if (this.hasDuplicate()) {
      this.modalService.open("content");
    }
    else {
      this.users.forEach(record => {
        if (record.id == 0) {
          record.id = Math.random();
        }
      });
      localStorage.removeItem('users');
      localStorage.setItem('users', JSON.stringify(this.users));
      this.enableSave = this.isAddMode = this.isEditing = false;
    }
  }

  hasDuplicate(): boolean {
    let retunval = false;
    this.users.forEach(record => {
      let records = [];
      records = this.users.filter((val) => val.userId === record.userId);
      if (records.length > 1) {
        retunval = true;
        stop;
      }
    });
    return retunval;
  }
}
