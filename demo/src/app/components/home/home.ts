import { Component } from '@angular/core';
import { ImageSlider } from "../image-slider/image-slider";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ImageSlider, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
