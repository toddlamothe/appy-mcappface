import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  injectAsync
} from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { SummaryComponent } from './summary-component';
import { MockBackend,  MockConnection} from '@angular/http/testing';
import {
  Http,
  ConnectionBackend,
  HTTP_PROVIDERS,
  Response,
  Headers,
  RequestOptions,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import {provide} from '@angular/core';

function runTests() {
  beforeEachProviders( () => {
    return [
      Http,
      HTTP_PROVIDERS,
      ConnectionBackend,
      provide(XHRBackend, {useClass: MockBackend}),
      TestComponentBuilder,
      SummaryComponent
    ];
  });

  describe('Component: SummaryComponent', () => {
    it('should create a SummaryComponent instance', inject([XHRBackend, TestComponentBuilder], (mockBackend, tcb: TestComponentBuilder) => {

      // Create a mock http response with a sample payload
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body:
                  {
                    'eventcount': 7,
                    'eventstonextround': 3,
                    'message': 'Test Response Message'
                  }
              }
            )));
        });

      tcb.createAsync(SummaryComponent).then(fixture => {
        let summaryComponent = fixture.componentInstance;
        expect(summaryComponent.logStats.message).toBe('Test Response Message');
      });
    }));
  });
}

runTests();
