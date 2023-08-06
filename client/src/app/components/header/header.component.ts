import { Component, HostListener, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    isHeaderScrolled: boolean = false;
    @Input()
    activePage!: string;
    @Input()
    isClicked: boolean = false;
    @Input()
    toggled: boolean = false;

    constructor(private app: AppComponent) {}

    @Input() pageTitle!: string;

    @HostListener('window:scroll')
    onWindowScroll() {
        this.isHeaderScrolled = window.pageYOffset > 200;
        let header = document.getElementsByClassName('.fixed-top');
        for (let i = 0; i > header.length; i++) {
            header[i].classList.add('new-background');
        }
    }
    togglePageContent() {
        let nav = document.getElementById('navigation');
        let logo = document.getElementById('logo');
        if (this.toggled == false) {
            this.pageTitle = '';
            nav!.style.height = '18rem';
            nav!.style.transition = 'max-height 0.25s ease-in !important';
            logo!.style.display = 'none';
            this.toggled = true;
        } else {
            this.toggled = false;
            nav!.style.height = '5rem';
            logo!.style.display = 'block';
            nav!.style.transition = 'max-height 0.15s ease-out !important';
        }
    }
}
