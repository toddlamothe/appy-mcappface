import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    selector: 'logbutton',
    directives: [ROUTER_DIRECTIVES, MdButton],
    providers: [],
    template: require('./logbutton-component.html')
}
)
export class LogButtonComponent {
    @Input() logEntryType: string;
    constructor(private router: Router) {
        console.log('[log-component]');
    }

    LogEvent() {
        console.log(' LogEvent ->', this.logEntryType);
        this.router.navigate(['LogEvent', {eventtype: this.logEntryType}]);
    }
}
