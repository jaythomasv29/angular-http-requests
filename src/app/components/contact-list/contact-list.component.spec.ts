import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Contacts } from '../../models/contacts';
import { asyncData } from 'src/testing';

import { ContactListComponent } from './contact-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContactService } from 'src/app/services/contact.service';
import { of } from 'rxjs';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let getContactsSpy: jasmine.Spy;
  let testContacts: Contacts;
  let contactService;

  beforeEach(async(() => {
    contactService = jasmine.createSpyObj('ContactService', ['getContacts']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ ContactListComponent ],
      providers: [{ provide: ContactService, useValue: contactService }]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    testContacts = {
      contactsList: [
        {id: 1, name: 'some name', city: 'delhi'},
        {id: 1, name: 'some name2', city: 'mumbai'},
      ]
    };

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    getContactsSpy = contactService.getContacts.and.returnValue( asyncData(testContacts) );
    // fixture.detectChanges();
  });

  it('should get data from server', fakeAsync(() => {
    fixture.detectChanges(); // calls ngOnItit()

    tick(100);  // wait for observables to flush the data
    fixture.detectChanges();  // update changes

    expect(component.contacts).toEqual(testContacts.contactsList);
  }));

  it('should call getContacts() method atleast once', fakeAsync(() => {
    fixture.detectChanges();  // calls ngOnInit()
    expect(getContactsSpy.calls.any()).toBe(true, 'getContacts() should be called');
    expect(getContactsSpy.calls.count()).toBeGreaterThanOrEqual(1, 'getContacts() should be called atleast once');
  }));

});
