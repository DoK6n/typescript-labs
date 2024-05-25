import { MonoBehaviour } from '../utils'

interface ISwitchalbe {
  isActive: boolean
  active(): void
  deactive(): void
}

class Switch extends MonoBehaviour {
  constructor(private client: ISwitchalbe) {
    super()
  }

  public toggle(): void {
    if (this.client.isActive) {
      this.client.deactive()
    } else {
      this.client.active()
    }
  }
}

class Door extends MonoBehaviour implements ISwitchalbe {
  private _isActive: boolean
  get isActive(): boolean {
    return this._isActive
  }

  active(): void {
    this._isActive = true
    console.log('The door is open.')
  }

  deactive(): void {
    this._isActive = false
    console.log('The door is closed.')
  }
}
