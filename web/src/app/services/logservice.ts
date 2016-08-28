import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Rx';

@Injectable()
export class LogService {
  // baseUrl: String = 'http://beerme-services.us-east-1.elasticbeanstalk.com';
  baseUrl: String = "http://localhost:8080";
  constructor(public http: Http) {
  }

  createLogEntry(newEntry: LogEntry) {
      // "Content-Type:application/json
      // Payload:
      // {
      //   "eventType" : "FFD",
      //   "comments"  : "Sample Comments"
      // }
      let headers;
      let requestOptions;
      headers = new Headers({ 'Content-Type': 'application/json' });
      requestOptions = new RequestOptions({ headers: headers });
      // Stringify the object so the document type is accepted by the service
      return this.http.post(this.baseUrl + '/logevent', JSON.stringify(newEntry), requestOptions);
  }

  fetchLogStats() {
      console.log('[fetchLogStats]');
      return this.http.get(this.baseUrl + '/eventstats').map(res => res.json());
  }

  private extractData(res: Response) {
      console.log('[extractData]');
      if (res.status < 200 || res.status >= 300) {
          console.log('extractData Error: ', res.status);
          throw new Error('Bad response status: ' + res.status);
      }
      let body = res.json();
      console.log('extracted data: ', body.data || {});
      return body.data || {};
  }

  private handleError(error: any) {
      // In a real world app, we might send the error to remote logging infrastructure
      let errMsg = error.message || 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
  }
}

export class LogEntry {
    constructor(
        public eventType: string,
        public comments: string
    ) {
    }
}

export class LogStats {
    totalPoints: number;
    pointsToNextRound: number;
    message: String;
}
