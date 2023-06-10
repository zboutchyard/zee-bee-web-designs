import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'zee-bee-web-designs-website';
    activePage: string = 'home';
    pageTitle: string = '';

    setActivePage(page: string) {
        this.activePage = page;
        if (this.activePage == 'HomePageComponent') {
            this.pageTitle =
                'Custom Solutions Tailored For Your Business Needs';
        } else if (this.activePage == 'AboutPageComponent') {
            this.pageTitle = 'About Us';
        } else if (this.activePage == 'ServicesPageComponent') {
            this.pageTitle = 'Our Services';
        } else if (this.activePage == 'ContactPageComponent') {
            this.pageTitle = 'Contact Us';
        }
    }
}
