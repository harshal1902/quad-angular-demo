import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() isEnableSave: boolean = false;
  @Output() isEdit = new EventEmitter<boolean>();
  @Output() isSave = new EventEmitter<void>();
  public showCancel: boolean = false;
  public editEnable(isedit: boolean): void {
    this.showCancel = isedit;
    if (!isedit) {
      this.isEnableSave = false;
    }
    this.isEdit.emit(isedit);
  }
  public save() {
    if (this.isEnableSave) {
      this.showCancel = false;
      this.isSave.emit()
    }
  }
}
