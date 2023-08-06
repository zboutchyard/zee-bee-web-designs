import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
    title = 'zee-bee-web-designs-website';
    activePage: string = 'home';
    pageTitle: string = '';
    @ViewChild(SplashScreenComponent)
    showSplashScreen: boolean = false;

    ngAfterViewInit(): void {
        const baseUrl = window.location.origin + '/';
        const currentUrl = window.location.href;
        if (currentUrl == baseUrl) {
            this.showSplashScreen = true;
            setTimeout(() => {
                document.getElementById('htmlSplashWrap')!.style.display =
                    'none';
                this.showSplashScreen = false;
            }, 2000);
        } else {
            document.getElementById('htmlSplashWrap')!.style.display = 'none';
            this.showSplashScreen = false;
        }
    }
    hideSpashScreen() {
        this.showSplashScreen = false;
    }

    constructor(private router: Router) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const url = event.urlAfterRedirects;
                this.setActivePage(url);
            }
        });
    }

    setActivePage(url: string) {
        if (url == '/home') {
            this.pageTitle =
                'Custom Solutions Designed For Your Business Needs';
        } else if (url === '/about') {
            this.pageTitle = 'About Us';
        } else if (url === '/services') {
            this.pageTitle = 'Our Services';
        } else if (url === '/contact') {
            this.pageTitle = 'Contact Us';
        }
    }
}
