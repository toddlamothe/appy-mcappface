import {Component, Input, Output} from '@angular/core';
import {LogService} from 'app/services/logservice';
import {MdButton} from '@angular2-material/button';
import {MdCard, MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {RouteParams} from '@angular/router-deprecated';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    selector: 'logevent',
    directives: [MdButton, MdCard, MD_CARD_DIRECTIVES, MdInput],
    providers: [LogService],
    template: require('./logevent-component.html')
})
export class LogEventComponent {
  @Input() logEntryType: string;
  private comments: string;
  constructor(private logService: LogService, params: RouteParams, private router: Router) {
      console.log('[submit-component]');
      this.logService = logService;
      this.logEntryType = params.get('eventtype');
  }

  LogEvent() {
      let newLogEntry = {
          'eventType': this.logEntryType,
          'comments': this.comments
      };
      this.logService.createLogEntry(newLogEntry).subscribe(
          data => {
              this.router.navigate(['Home']);
          },
          err => console.log('Error fetching event stats: ', err)
      );
      console.log(' LogEvent ->', this.logEntryType);
  }

  Cancel() {
    this.router.navigate(['Home']);
  }
}
