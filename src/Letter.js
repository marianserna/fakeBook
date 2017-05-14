import Vector2 from './Vector2';

export default class Letter {
  constructor(x, y, size, color, value) {
    this.position = new Vector2(x, y);
    this.size = size;
    this.color = color;
    this.value = value;
  }

  draw(ctx, mouse) {
    const newPosition = this.position.displace(mouse);


    ctx.fillStyle = this.color.toRgbString();
    ctx.font = `${this.size}px Arial`;
    ctx.fillText(this.value, newPosition.x, newPosition.y);
  }
}
