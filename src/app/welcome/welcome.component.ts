import { Component, OnInit } from '@angular/core';
import { ApiService, Auth } from '../api.service';
import { throwError } from 'rxjs';

interface CanvasRenderingContext2DFilter extends CanvasRenderingContext2D {
  filter?: string
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public blur: number = 1.175;
  public year: number = new Date().getFullYear()
  private cine: any = {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    video: HTMLVideoElement
  }
  private noise: any = {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  }

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.cineInit()
    this.noiseInit()
  }

  setBlur(v: any) {
    this.blur = v.target.value
  }

  private noiseInit = () => {
    this.noise.canvas = <HTMLCanvasElement>document.getElementById('noise')!
    this.noise.ctx = this.noise.canvas!.getContext('2d')
    window.requestAnimationFrame(this.noiseLoop)
  }

  private noiseLoop = () => {
    const s: number = 15;
    for (let x = 0; x < this.noise.canvas.width; x += s) {
      for (let y = 0; y < this.noise.canvas.height; y += s) {
        if (Math.random() < 0.01) {
          let shade: number = Math.floor(Math.random() * 64 + 128)
          // this.noise.ctx.clearRect(x, y, s, s)
          // this.noise.ctx.fill()
          this.noise.ctx.fillStyle = "rgba(" + shade + ", " + shade + ", " + shade + ", " + Math.random() * 0.11 + ")"
          this.noise.ctx.clearRect(x, y, s, s)
          this.noise.ctx.fillRect(x, y, s, s)
        }
      }
    }
    window.requestAnimationFrame(this.noiseLoop)
  }

  private cineInit = () => {
    this.cine.canvas = <HTMLCanvasElement>document.getElementById('cinemagraph')!
    this.cine.ctx = this.cine.canvas.getContext('2d')!
    this.cine.video = <HTMLVideoElement>document.getElementById('coffee');
    window.requestAnimationFrame(this.cineLoop)
    // document.getElementById('cinemagraph')!.style.minHeight = document.getElementById('cinemagraph')!.parentElement.clientHeight + 'px'
  }

  private cineLoop = () => {
    if (!this.cine.video.paused && !this.cine.video.ended) {
      this.cine.ctx.filter = "blur("+Math.floor(this.blur)+"px)"
      this.cine.ctx.drawImage(this.cine.video, 0, 0)
    }
    if(!this.cine.canvas) {
      alert('wew')
    }
    window.requestAnimationFrame(this.cineLoop)
  }

}
