import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  injectAsync
} from '@angular/core/testing';
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
import {LogService} from './logservice';

function runTests() {
  describe('Service: LogService', () => {
    beforeEachProviders( () => {
      return [
        Http,
        HTTP_PROVIDERS,
        ConnectionBackend,
        provide(XHRBackend, {useClass: MockBackend}),
        LogService
      ];
    });

    describe('fetchLogStats', () => {
      it('should fetch log stats', inject([XHRBackend, LogService], (mockBackend, logService) => {

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

          // Test the service call with mock data
          logService.fetchLogStats().subscribe(
              data => {
                expect(data.eventcount).toBe(7);
              },
              err => console.log('Error fetching event stats: ', err)
          );

      }));
    });

    describe('createLogEntry', () => {
      it('should create a log entry',
          injectAsync([XHRBackend, LogService], (mockBackend, logService) => {
          return new Promise((resolve, reject) => {
            mockBackend.connections.subscribe(connection => {
              connection.mockRespond(new ResponseOptions({status: 200}));
            });
            let data = {
              'eventType' : 'FFD',
              'comments'  : 'Sample Comments'
            };
            logService.createLogEntry(data).subscribe(
              (successResult) => {
                expect(successResult).toBeDefined();
                expect(successResult.status).toBe(200);
                resolve();
              });
          });
        }), 300);
    });

  });
}

runTests();
