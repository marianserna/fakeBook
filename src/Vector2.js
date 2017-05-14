Math.easeInOutQuad = function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t }

export default class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // un vector es el mouse, otro el punto, el tercero es el desplazamiento
  displace(mouse) {
    // how big the circle is around the cursor
    const maxDiff = 100;
    // where the circle will be drawn (temporary position for circles being affected by mouse movement)
    let x = this.x;
    let y = this.y;
    // difference mouse position vs circles (determine whether a circle's position will be affected by mouse movement)
    const diffX = this.x - mouse.x;
    const diffY = this.y - mouse.y;
    // Teorema de Pitagoras: Distancia entre 2 puntos (x a y or y a x) --> Produces distancia entre puntos en pixeles
    // const a = x1- x2 (x1: mouse, x2: circle)
    // const b = y1 - y2 (y1: mouse, y2: circle)
    // const c = Math.sqrt( a*a + b*b );
    const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));

    // Si el punto es mas cercano que maxDiff
    if (distance < maxDiff) {
      // que tan lejos esta el mouse del centro del circulo entre 0 y 1 (eg: 100(distance)/100 = 1 significa q esta muy lejos para ser afectado)
      const closeness = 1 - (distance / maxDiff);
      const force = Math.easeInOutQuad(closeness);

      x += force * diffX * -1;
      y += force * diffY * -1;
    }

    return new Vector2(x, y);
  }
}
