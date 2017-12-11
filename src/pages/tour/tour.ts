import { Component } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { IntroPage } from '../intro/intro';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'page-tour',
  templateUrl: 'tour.html',
})
export class TourPage {

  @ViewChild(Slides) slides: Slides;
  currentIndex:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  goToSlideAfter() {
    let slideIndex = this.currentIndex + 1;
    this.slides.slideTo(slideIndex, 500);
  }

  goToSlideBefore() {
    let slideIndex = this.currentIndex - 1;
    this.slides.slideTo(slideIndex, 500);
  }

  slideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', this.currentIndex);
  }

  skipTour(){
    this.navCtrl.push(IntroPage);
  }

}
