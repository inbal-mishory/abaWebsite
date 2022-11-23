import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  picIndex: number;
  constructor() { }

  ngOnInit(): void {
    // this.picIndex = 0;
    // this.carousel();
  }

  carousel() {
    // let i;
    // const imgArr = document.getElementsByClassName("carousel-pic");
    // for (i = 0; i < imgArr.length; i++) {
    //   imgArr[i].classList.add('opacity-n');
    // }
    // this.picIndex++;
    // if (this.picIndex > imgArr.length) {
    //   this.picIndex = 1
    // }
    // imgArr[this.picIndex-1].classList.remove('opacity-n');
    // setTimeout(this.carousel, 3000);
  }

}
