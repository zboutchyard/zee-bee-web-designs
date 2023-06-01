import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-service-box',
    templateUrl: './service-box.component.html',
    styleUrls: ['./service-box.component.scss'],
})
export class ServiceBoxComponent {
    @Input() icon: string | undefined;
    @Input() description: string | undefined;
    @Input() title: string | undefined;
}
