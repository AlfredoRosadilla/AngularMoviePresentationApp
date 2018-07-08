import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() classes = '';
  @Input() type = 'error';
  @Input() textButton = '';
  @Input() hasButton = false;
  @Input() hasLoadingBar = false;
  @Input() text = 'Requiered fields are missing.';
  @Input() solution = 'Please complete the required fields and try again.';

  @Output() closeAlert ? = new EventEmitter();
  @Output() clickButton ? = new EventEmitter();

  public icon = '';

  constructor() { }

  ngOnInit() {
    this.changeType(this.type);
  }

  changeType(type: string) {
    switch (type) {
      case 'error':
        this.icon = 'warning';
        break;
      case 'success':
        this.icon = 'check';
        break;
      case 'information':
        this.icon = 'info';
        break;
    }
  }

  getTranslateBase(text: string) {
    return text.toLowerCase().replace(new RegExp(' ', 'g'), '-');
  }

  fireButton() {
    this.clickButton.emit();
  }

  close() {
    this.closeAlert.emit();
  }
}
