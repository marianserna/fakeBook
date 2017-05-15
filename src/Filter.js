import Circle from './Circle';
import Letter from './Letter';
import Vector2 from './Vector2';

import tinycolor from 'tinycolor2';

export default class Filter {
  constructor(canvas, options) {
    this.canvas = canvas;

    this.rendered = false;
    this.img = null;
    this.imageWidth = this.canvas.offsetWidth;
    this.imageHeight = null;
    this.shapes = [];
    this.options = options;
    this.mouse = new Vector2(-5000, -5000);

    this.ctx = canvas.getContext('2d');

    this.render = this.render.bind(this);
    this.captureMouseMovement();
  }

  captureMouseMovement() {
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
    });
  }

  // Place img on canvas + gets image data + places filter on img + render
  filter(img) {
    // Setting variable for redrawing purposes
    this.img = img;

    this.img.addEventListener('load', () => {
      const aspectRatio = this.img.height / this.img.width;
      this.imageHeight = this.imageWidth * aspectRatio;
      this.canvas.width = this.imageWidth;
      this.canvas.height = this.imageHeight;

      this.drawImage();
      this.captureImgData();
      this.createShapes();
      if (!this.rendered) {
        this.render();
      }
    });
  }

  drawImage() {
    this.ctx.drawImage(this.img, 0, 0, this.imageWidth, this.imageHeight);
  }

  captureImgData() {
    // color info from img
    this.imgData = this.ctx.getImageData(0, 0, this.imageWidth, this.imageHeight).data;
  }

  colorAt(x, y) {
    const fullRow = y - 1;
    const pixel = (fullRow * this.imageWidth) + (x - 1);
    // index = where does info for a particular pixel begin (4 -> rgba)
    const index = pixel * 4;

    const r = this.imgData[index];
    const g = this.imgData[index + 1];
    const b = this.imgData[index + 2];
    const a = this.imgData[index + 3] / 255;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  createShapes() {
    this.shapes = [];

    if (this.options.filter === 'circle') {
      const radius = 5;

      for(let x = radius; x < this.imageWidth; x += radius * 1.5) {
        for (let y = radius; y < this.imageHeight; y += radius * 1.5) {
          // tinycolor lets you do cool stuff to your color (spin, set alpha... --> https://github.com/bgrins/TinyColor) 🙏
          const color = tinycolor(this.colorAt(x, y)).
            setAlpha(0.2).
            spin(260);
          const circle = new Circle(x, y, radius, color);
          this.shapes.push(circle);
        }
      }
    } else if (this.options.filter === 'text') {
      const size = 18;

      for(let x = size; x < this.imageWidth; x += size * 2.5) {
        for (let y = size; y < this.imageHeight; y += size * 2.5) {
          // tinycolor lets you do cool stuff to your color (spin, set alpha... --> https://github.com/bgrins/TinyColor) 🙏
          const color = tinycolor(this.colorAt(x, y)).
            setAlpha(0.6).
            spin(260);
          const letter = new Letter(x, y, size, color, this.options.text);
          this.shapes.push(letter);
        }
      }
    }
  }

  render() {
    this.rendered = true;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawImage();

    for (let i = 0; i < this.shapes.length; i++) {
      this.shapes[i].draw(this.ctx, this.mouse);
    }

    window.requestAnimationFrame(this.render);
  }
}
