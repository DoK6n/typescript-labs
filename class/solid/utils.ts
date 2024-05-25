export class MonoBehaviour {}

export class AudioSource {
  Play() {
    console.log('Playing sound')
  }
}

export function GetComponent<T>(): T {
  return new AudioSource() as unknown as T
}

export class Mathf {
  static Clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value))
  }
}

export class Vector3 {
  x: number
  y: number
  z: number

  constructor(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }
}

export class Input {
  static GetAxis(axisName: string): number {
    // Simulate input axis value
    return Math.random() * 2 - 1
  }
}

export class Collider {}

// Mock method to simulate Unity's behavior
export class Time {
  static deltaTime(): number {
    // Simulate delta time
    return 0.016
  }
}
