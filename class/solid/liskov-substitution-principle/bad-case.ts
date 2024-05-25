import { Vector3 } from '../utils'

class Vehicle {
  speed: number = 100
  direction: Vector3

  goForward(): void {}
  reverse(): void {}
  turnRight(): void {}
  turnLeft(): void {}
}

class Navigator {
  move(vehicle: Vehicle) {
    vehicle.goForward()
    vehicle.turnLeft()
    vehicle.goForward()
    vehicle.turnRight()
    vehicle.goForward()
  }
}
