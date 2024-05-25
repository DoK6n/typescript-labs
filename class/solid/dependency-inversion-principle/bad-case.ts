import { MonoBehaviour } from '../utils'

class Switch extends MonoBehaviour {
  public door: Door
  public isActivated: boolean

  constructor(door: Door) {
    super()
    this.door = door
    this.isActivated = false
  }

  public toggle(): void {
    if (this.isActivated) {
      this.isActivated = false
      this.door.close()
    } else {
      this.isActivated = true
      this.door.open()
    }
  }
}

class Door extends MonoBehaviour {
  public open(): void {
    console.log('The door is open.')
  }

  public close(): void {
    console.log('The door is closed.')
  }
}
