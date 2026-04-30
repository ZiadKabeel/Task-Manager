import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';


@Component({
  selector: 'app-image-slider',
  imports: [],
  templateUrl: './image-slider.html',
  styleUrl: './image-slider.css',
})
export class ImageSlider implements OnInit {
  
  
  constructor(private cd: ChangeDetectorRef) {
    // setInterval(() => {
    //   this.nextImage();
    // }, 3000);
  }
  ngOnInit(): void {
      setInterval(() => {
        this.nextImage();
        this.cd.detectChanges();
      }, 3000);
   
  }
  
  images: string[] = [
    "img1.png",
    "img2.png",
    "img3.png"
  ];
  currentIndex: number = 0;

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
  // startSlider(){
  //   setInterval(() => {
  //     this.nextImage();
  //   }, 3000);
  // }
}
