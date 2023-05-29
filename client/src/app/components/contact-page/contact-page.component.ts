import { Component } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {
recipient: any;
subject: any;
content: any;
error = '';

constructor(private emailService: EmailService){}

sendEmail() {
  this.emailService.sendEmail(this.recipient, this.subject, this.content)
  .then(() => {
    this.error = ''
    console.log('hitting node application');
    console.log('here is rec', this.recipient);
    console.log('here is subject', this.subject);
    console.log('here is content', this.content);
  })
  .catch(error => {
    console.log('unable to hit node application')
    this.error = error.message;
  })
}

}
