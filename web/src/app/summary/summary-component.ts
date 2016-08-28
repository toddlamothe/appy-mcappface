import {Component, Output, EventEmitter} from '@angular/core';
import {LogStats, LogService} from 'app/services/logservice';
import {MdCard} from '@angular2-material/card';
import {Observable}     from 'rxjs/Observable';

@Component({
    selector: 'summary',
    directives: [MdCard],
    providers: [LogService],
    template: require('./summary-component.html')
}
)
export class SummaryComponent {
  @Output('refresh-summary') refreshSummary = new EventEmitter(false);
  private logStats = {};
  private showSummary: boolean = false;

  constructor(private logService: LogService) {
      console.log('[summary-component]');
      this.logService = logService;
      this.RefreshSummaryStats();
  };

  refresh() {
      console.log(' Refresh event recieved by parent component');
      this.RefreshSummaryStats();
  }

  RefreshSummaryStats() {
      console.log('  [RefreshSummaryStats]');
      console.log('  Emitting event from summary component (true)');
      this.refreshSummary.emit(true);
      // Subscribe to log stats service which returns an observable.
      this.logService.fetchLogStats().subscribe(
          data => {
              this.logStats = data;
              this.showSummary = true;
              console.log('  Emitting event from summary component (false)');
              this.refreshSummary.emit(false);
          },
          err => console.log('Error fetching event stats: ', err)
      );
  }

}
