export class Rectangle {
  width: number
  height: number
}

export class Circle {
  radius: number
}

export class AreaCalculator {
  getRectangleArea(rectangle: Rectangle) {
    return rectangle.width * rectangle.height
  }

  getCircleArea(circle: Circle) {
    return Math.PI * circle.radius * circle.radius
  }
}
