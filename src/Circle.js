import Vector2 from './Vector2';

export default class Circle {
  constructor(x, y, radius, color) {
    this.position = new Vector2(x, y);
    this.radius = radius;
    this.color = color;
  }

  draw(ctx, mouse) {
    const newPosition = this.position.displace(mouse);

    ctx.beginPath();
    ctx.arc(newPosition.x, newPosition.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color.toRgbString();
    ctx.fill();
  }
}
