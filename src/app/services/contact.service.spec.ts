import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { ContactService } from './contact.service';
import { Contact, Contacts } from '../models/contacts';

describe('ContactService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let contactService: ContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    contactService = TestBed.get(ContactService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: ContactService = TestBed.get(ContactService);
    expect(service).toBeTruthy();
  });

  describe('#getContacts', () => {
    let expectedContacts: Contacts;

    beforeEach(() => {
      contactService = TestBed.get(ContactService);
      expectedContacts = {
        contactsList: [
          {
            id: 1,
            name: 'Rajesh',
            city: 'Delhi',
          },
          {
            id: 2,
            name: 'Sandy',
            city: 'California',
          }
        ]
      };
    });

    it('should return expected contacts', () => {
      contactService.getContacts()
                    .subscribe(
                      data => expect(data).toEqual(expectedContacts, 'should return expected contacts'),
                      err => console.log('err in fetching contacts', err)
                    );

      const req = httpTestingController.expectOne(contactService.url);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedContacts);
    });

    it('can return empty contacts', () => {
      contactService.getContacts()
                    .subscribe(
                      data => expect(data.contactsList.length).toEqual(0, 'should have empty contacts'),
                      err => console.log('err', err)
                    );

      const req = httpTestingController.expectOne(contactService.url);
      expect(req.request.method).toEqual('GET');

      req.flush({contactsList: []});
    });

    it('should give 404 in user friendly way', () => {
      const errMessage = '404';
      contactService.getContacts()
                    .subscribe(
                      data => fail('expected to give 404 error'),
                      err => expect(err.message).toContain(errMessage)
                    );

      const req = httpTestingController.expectOne(contactService.url);
      expect(req.request.method).toEqual('GET');

      req.flush(errMessage, {status: 404, statusText: 'Not Found'});
    });
  });
});
