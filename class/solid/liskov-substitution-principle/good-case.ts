interface ITurnable {
  turnRight(): void
  turnLeft(): void
}

interface IMovable {
  goForward(): void
  reverse(): void
}

class RoadVehicle implements IMovable, ITurnable {
  speed: number = 100
  turnSpeed: number = 5

  goForward(): void {}
  reverse(): void {}
  turnLeft(): void {}
  turnRight(): void {}
}

class RailVehicle implements IMovable {
  speed: number = 100

  goForward(): void {}
  reverse(): void {}
}
