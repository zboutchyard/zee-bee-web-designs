import { Component } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';

@Component({
    selector: 'app-contact-page',
    templateUrl: './contact-page.component.html',
    styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent {
    recipient: any;
    subject: any;
    content: any;
    error = '';
    submitted = false;

    constructor(private emailService: EmailService) {}

    sendEmail() {
        this.emailService
            .sendEmail(
                this.recipient,
                this.subject,
                `Customer email: ${this.recipient}\n\n ${this.subject} is trying to reach out to you on ZeeBee Web Designs. Here's what they said:  \n\n${this.content}`
            )

            .then(() => {
                this.error = '';
            })
            .catch((error) => {
                console.log('unable to hit node application');
                this.error = error.message;
            });
        this.submitted = true;
    }
}
