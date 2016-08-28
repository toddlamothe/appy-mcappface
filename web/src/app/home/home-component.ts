import {Component} from '@angular/core';
import {LogButtonComponent} from 'app/logbutton/logbutton-component';
import {SummaryComponent} from 'app/summary/summary-component';
import {MdProgressCircle} from '@angular2-material/progress-circle';

@Component({
  selector: 'home',
  providers: [],
  pipes: [],
  directives: [LogButtonComponent, SummaryComponent, MdProgressCircle],
  template: require('./home-component.html')
})
export class HomeComponent {
  private showSpinner: boolean;

  constructor() {
    // Disable the spinner after a couple seconds.
    // This is a workaround until eventing is put in place
    this.spinner(true);
    setTimeout(() => {
      this.spinner(false);
    }, 1500);
    console.log('[HomeComponent]');
  }

  spinner(event) {
    this.showSpinner = event;
  }
}
