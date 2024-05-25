export abstract class Shape {
  abstract calculateArea(): number
}

export class Rectangle extends Shape {
  width: number
  height: number

  override calculateArea() {
    return this.width * this.height
  }
}

export class Circle extends Shape {
  radius: number

  override calculateArea() {
    return Math.PI * this.radius * this.radius
  }
}

export class AreaCalculator {
  getArea(shape: Shape) {
    return shape.calculateArea()
  }
}
