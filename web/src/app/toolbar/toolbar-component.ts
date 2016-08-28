import {Component, Input, ViewChild, AfterViewInit} from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';

@Component({
    selector: 'toolbar',
    directives: [MdToolbar],
    providers: [],
    template: require('./toolbar-component.html')
})
export class ToolbarComponent {
    constructor() { };
}
