import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review.interface';
import { GoogleReviewService } from 'src/app/services/google-review/google-review.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    reviews: Review[] = [];
    constructor(private reviewService: GoogleReviewService) {}
    componentName = 'HomeComponent';

    ngOnInit() {
        this.reviewService.getReviews().subscribe({
            next: (res) => {
                console.log('review response', res);
                this.reviews.push(...res);
            },
            error: (err) => {
                console.error('error while calling review service', err);
            },
        });
    }
}
