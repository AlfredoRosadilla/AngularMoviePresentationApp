import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  private lastView: string = null;
  private currentView = '';

  constructor(
    public media: ObservableMedia,

    private router: Router,
    private location: Location
) { }

  ngOnInit() {
    this.currentView = this.router.url;

    this.router.events.subscribe(($event: any) => {
      if ($event instanceof NavigationEnd) {
        this.lastView = this.currentView;
        this.currentView = $event.url;
      }
    });
  }

  isCurrentView(view: string): boolean {
    return this.currentView.startsWith(`/${view}`);
  }

  executeAction(description: string) {
    if (description === 'left-button') {
      if (this.isCurrentView('home')) {
        // this.router.navigate(['favorite']);
      } else if (this.lastView) {
        this.location.back();
      } else {
        this.router.navigate(['home']);
      }
    } else if (description === 'right-button') {

    }
  }
}
