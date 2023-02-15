import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IHeaderColumn } from '../models/header-column';
import { User } from '../models/user.model';
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
  public filter: any = new User();
  public users: User[] = [];
  public userHeaderUrl: string = '/app/configs/userHeader.json';
  public usersUrl: string = '/assets/data/user.json';
  public enableSave: boolean = false;
  @ViewChild("content") modalContent: TemplateRef<any> | undefined;

  constructor(private userService: UsersService, private modalService: NgbModal
  ) {

  }

  ngOnInit() {
    this.LoadHeader();
    this.LoadUsers();
    this.enableSave = false;
  }

  getusers() {
    let tempUsers = [...this.users];
    if (this.filter.userId) {
      tempUsers = tempUsers.filter(u => u.userId.includes(this.filter.userId));
    }
    if (this.filter.firstName) {
      tempUsers = tempUsers.filter(u => u.firstName.includes(this.filter.firstName));
    }
    if (this.filter.lastName) {
      tempUsers = tempUsers.filter(u => u.lastName.includes(this.filter.lastName));
    }
    if (this.filter.loginName) {
      tempUsers = tempUsers.filter(u => u.loginName.includes(this.filter.loginName));
    }
    if (this.filter.email) {
      tempUsers = tempUsers.filter(u => u.email.includes(this.filter.email));
    }
    return tempUsers;
  }

  onChangeHeaderFilter(e: any, header: IHeaderColumn) {
    this.filter[header.columHeader] = e.target.value;
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
      this.modalService.open(this.modalContent).result.then((result) => {
      });
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
