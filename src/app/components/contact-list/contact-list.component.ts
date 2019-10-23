import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Contacts } from 'src/app/models/contacts';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts;
  constructor(private contactService: ContactService
  ) { }

  ngOnInit() {
    // call your service, and assign its response to contacts variable
    this.contactService.getContacts().subscribe(data => this.contacts = data.contactsList);
  }

}
